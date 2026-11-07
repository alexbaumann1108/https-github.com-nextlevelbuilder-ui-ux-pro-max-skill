/**
 * Cancellation policy, shown on the booking form (customers agree to it
 * before sending a request) and in the confirmation email.
 */
export const cancellationPolicy = {
  title: "Cancellation policy",
  intro: "Plans change and I understand. Here's how cancellations work:",
  items: [
    "Cancel more than 7 days before your trip and there's nothing to pay.",
    "Cancel within 7 days of your trip and 25% of the trip price is due.",
    "Cancel within 48 hours of your trip, or don't show up, and 50% of the trip price is due.",
    "If I call off the trip because of weather or for any other reason, you owe nothing.",
  ],
  agree: "I've read and agree to the cancellation policy.",
};
