import type { Metadata } from "next";
import { CheckoutContent } from "@/components/checkout-content";
export const metadata: Metadata = { title: "Checkout" };
export default function CheckoutPage() {
  return (
    <div className="container page-section">
      <CheckoutContent />
    </div>
  );
}
