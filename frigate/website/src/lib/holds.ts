import { promises as fs } from "node:fs";
import path from "node:path";
import type { Booked, Slot } from "@/lib/availability";

/**
 * Holds: a booking request blocks its time on the website as soon as it
 * arrives, before the captain confirms, so nobody can double book. The
 * captain can deny a request from the email, which reopens the time.
 *
 * A hold keeps its time blocked until the captain denies it or the trip date
 * passes. Confirming marks it confirmed (it stays blocked); the calendar
 * event the captain saves then blocks the same time too.
 *
 * Storage: Upstash Redis (Vercel → Storage → Upstash Redis adds
 * KV_REST_API_URL and KV_REST_API_TOKEN). In development without it, holds
 * are kept in .data/holds.json. In production without it, holds are off and
 * requests work as before.
 */

export type HoldStatus = "held" | "confirmed";

export type Hold = {
  id: string;
  token: string;
  ref: string;
  date: string;
  slots: Slot[];
  status: HoldStatus;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  tripLength: string;
  slot: Slot | "";
  guests: number;
  message: string;
};

const HOLDS = "frigate:holds"; // id -> hold JSON
const SLOTS = "frigate:holdslots"; // "YYYY-MM-DD:am" -> hold id

const redisUrl = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const redisToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const holdsEnabled = () =>
  !!(redisUrl() && redisToken()) || process.env.NODE_ENV !== "production";

/** The slots a booking takes: one half day, or the whole day for longer trips. */
export function slotsFor(tripLength: string, slot: Slot | ""): Slot[] {
  return tripLength === "4" ? [slot || "am"] : ["am", "pm"];
}

// ---- storage -------------------------------------------------------------

type Store = {
  hsetnx(key: string, field: string, value: string): Promise<boolean>;
  hset(key: string, field: string, value: string): Promise<void>;
  hget(key: string, field: string): Promise<string | null>;
  hgetall(key: string): Promise<Record<string, string>>;
  hdel(key: string, ...fields: string[]): Promise<void>;
};

function redisStore(url: string, token: string): Store {
  const run = async (cmd: (string | number)[]) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmd),
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    const body = (await res.json()) as { result?: unknown; error?: string };
    if (!res.ok || body.error) throw new Error(`Hold store: ${body.error ?? res.status}`);
    return body.result;
  };
  return {
    hsetnx: async (k, f, v) => (await run(["HSETNX", k, f, v])) === 1,
    hset: async (k, f, v) => void (await run(["HSET", k, f, v])),
    hget: async (k, f) => ((await run(["HGET", k, f])) as string | null) ?? null,
    hgetall: async (k) => {
      const flat = ((await run(["HGETALL", k])) as string[] | null) ?? [];
      const out: Record<string, string> = {};
      for (let i = 0; i < flat.length; i += 2) out[flat[i]] = flat[i + 1];
      return out;
    },
    hdel: async (k, ...f) => void (f.length && (await run(["HDEL", k, ...f]))),
  };
}

/** Development only: a JSON file next to the project. */
function fileStore(): Store {
  const file = path.join(process.cwd(), ".data", "holds.json");
  let queue = Promise.resolve();
  const read = async (): Promise<Record<string, Record<string, string>>> => {
    try {
      return JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      return {};
    }
  };
  const write = async (data: Record<string, Record<string, string>>) => {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(data, null, 2));
  };
  // Serialise changes so two requests can't both claim a slot.
  const change = <T,>(fn: (d: Record<string, Record<string, string>>) => T) => {
    const next = queue.then(async () => {
      const d = await read();
      const result = fn(d);
      await write(d);
      return result;
    });
    queue = next.then(() => undefined, () => undefined);
    return next;
  };
  return {
    hsetnx: (k, f, v) =>
      change((d) => {
        d[k] ??= {};
        if (f in d[k]) return false;
        d[k][f] = v;
        return true;
      }),
    hset: (k, f, v) => change((d) => void ((d[k] ??= {})[f] = v)),
    hget: async (k, f) => (await read())[k]?.[f] ?? null,
    hgetall: async (k) => (await read())[k] ?? {},
    hdel: (k, ...f) => change((d) => f.forEach((x) => delete d[k]?.[x])),
  };
}

function store(): Store | null {
  const url = redisUrl(), token = redisToken();
  if (url && token) return redisStore(url, token);
  if (process.env.NODE_ENV !== "production") return fileStore();
  return null;
}

// ---- holds ---------------------------------------------------------------

const randomId = (bytes: number) =>
  Array.from(crypto.getRandomValues(new Uint8Array(bytes)), (b) => b.toString(16).padStart(2, "0")).join("");

const today = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());

/** Held half days, in the same shape as the calendar's booked days. */
export async function getHeld(): Promise<Booked> {
  const s = store();
  if (!s) return {};
  try {
    const slots = await s.hgetall(SLOTS);
    const out: Booked = {};
    const now = today();
    for (const key of Object.keys(slots)) {
      const [date, slot] = key.split(":") as [string, Slot];
      if (date < now) continue;
      (out[date] ??= []).push(slot);
    }
    return out;
  } catch (err) {
    console.error("[holds] could not read holds:", err instanceof Error ? err.message : err);
    return {};
  }
}

/**
 * Holds the request's time. Returns the hold, `null` if the time was taken a
 * moment ago, or `undefined` when holds are switched off.
 */
export async function placeHold(input: Omit<Hold, "id" | "token" | "status" | "createdAt" | "slots">) {
  const s = store();
  if (!s) return undefined;
  const hold: Hold = {
    ...input,
    id: randomId(8),
    token: randomId(24),
    status: "held",
    createdAt: new Date().toISOString(),
    slots: slotsFor(input.tripLength, input.slot),
  };
  const claimed: string[] = [];
  for (const slot of hold.slots) {
    const key = `${hold.date}:${slot}`;
    if (await s.hsetnx(SLOTS, key, hold.id)) claimed.push(key);
    else {
      await s.hdel(SLOTS, ...claimed);
      return null;
    }
  }
  await s.hset(HOLDS, hold.id, JSON.stringify(hold));
  return hold;
}

/** Looks a hold up by id and checks its secret token. */
export async function findHold(id: string, token: string): Promise<Hold | null> {
  const s = store();
  if (!s || !/^[0-9a-f]{16}$/.test(id)) return null;
  const raw = await s.hget(HOLDS, id);
  if (!raw) return null;
  const hold = JSON.parse(raw) as Hold;
  return safeEqual(hold.token, token) ? hold : null;
}

export async function confirmHold(hold: Hold) {
  const s = store();
  if (!s) return;
  await s.hset(HOLDS, hold.id, JSON.stringify({ ...hold, status: "confirmed" }));
}

/** Denies a request (or reopens a cancelled trip): frees its time. */
export async function releaseHold(hold: Hold) {
  const s = store();
  if (!s) return;
  const slots = await s.hgetall(SLOTS);
  const mine = hold.slots.map((x) => `${hold.date}:${x}`).filter((k) => slots[k] === hold.id);
  await s.hdel(SLOTS, ...mine);
  await s.hdel(HOLDS, hold.id);
}

function safeEqual(a: string, b: string) {
  if (typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
