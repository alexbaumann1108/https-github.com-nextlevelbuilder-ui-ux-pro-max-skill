import { connection } from "next/server";
import { getTaken } from "@/lib/taken";

/** Taken half days (calendar trips and held requests). Read fresh on each request. */
export async function GET() {
  await connection();
  const { configured, ok, booked } = await getTaken();
  return Response.json({ configured, ok, booked }, { headers: { "Cache-Control": "no-store" } });
}
