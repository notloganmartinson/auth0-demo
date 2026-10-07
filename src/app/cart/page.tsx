import type { Metadata } from "next";
import { CartContent } from "@/components/cart-content";
export const metadata: Metadata = { title: "Your bag" };
export default function CartPage() {
  return (
    <div className="container page-section">
      <CartContent />
    </div>
  );
}
