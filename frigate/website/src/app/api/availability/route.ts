import { connection } from "next/server";
import { getBookedDates } from "@/lib/booked-dates";

/** Booked dates for the booking calendar. Read fresh on each request. */
export async function GET() {
  await connection();
  const { configured, ok, dates } = await getBookedDates();
  return Response.json(
    { configured, ok, booked: dates },
    { headers: { "Cache-Control": "no-store" } },
  );
}
