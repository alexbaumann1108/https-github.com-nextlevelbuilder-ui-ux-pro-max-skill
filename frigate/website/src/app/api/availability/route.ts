import { connection } from "next/server";
import { getBooked } from "@/lib/booked-dates";

/** Booked half days for the booking calendar. Read fresh on each request. */
export async function GET() {
  await connection();
  const { configured, ok, booked } = await getBooked();
  return Response.json({ configured, ok, booked }, { headers: { "Cache-Control": "no-store" } });
}
