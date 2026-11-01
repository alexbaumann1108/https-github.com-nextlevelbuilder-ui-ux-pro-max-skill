/** Trip rates, per trip. Confirmed by the owner. */
export const rates = [
  { hours: 4, name: "Half day", price: 600 },
  { hours: 6, name: "Three-quarter day", price: 900 },
  { hours: 8, name: "Full day", price: 1200 },
] as const;

export const formatPrice = (n: number) => `$${n.toLocaleString("en-US")}`;

export const lowestRate = Math.min(...rates.map((r) => r.price));
