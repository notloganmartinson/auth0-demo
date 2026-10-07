export const FREE_SHIPPING_THRESHOLD = 125;
export function shippingPrice(
  subtotal: number,
  method: "standard" | "express" = "standard",
) {
  return method === "express"
    ? 18
    : subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : 8;
}
