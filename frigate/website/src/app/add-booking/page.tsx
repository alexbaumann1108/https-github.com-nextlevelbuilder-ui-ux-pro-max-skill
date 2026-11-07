import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { AddBookingForm } from "@/components/forms/add-booking-form";
import { calendarIdFromIcs } from "@/lib/booking-links";

/**
 * Captain only (unlisted): add a trip booked directly, by phone or in person.
 * Saving it to the bookings calendar blocks the time on the website, the same
 * as confirming a website request. Nothing here changes data by itself; it
 * opens the captain's own Google Calendar and Messages with the trip filled in.
 */
export const metadata: Metadata = {
  title: "Add a booking",
  robots: { index: false, follow: false },
};

export default function AddBookingPage() {
  const calendarId = calendarIdFromIcs(process.env.BOOKING_CALENDAR_ICS_URL);
  return (
    <>
      <PageHeader
        label="Captain only"
        title="Add a booking"
        lede="For trips booked with you directly. Fill in the trip, save it to your calendar and the website blocks that time within about 5 minutes. Then send the customer their confirmation."
        art="emblem"
        book={false}
      />
      <section className="py-12 md:py-16">
        <div className="shell max-w-2xl">
          <AddBookingForm calendarId={calendarId} />
        </div>
      </section>
    </>
  );
}
