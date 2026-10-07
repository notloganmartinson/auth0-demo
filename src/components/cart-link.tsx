"use client";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { Icon } from "./icon";

export function CartLink() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      className="cart-link"
      aria-label={`Shopping bag, ${count} items`}
    >
      <Icon name="bag" />
      <span className="cart-count" aria-live="polite">
        {count}
      </span>
    </Link>
  );
}
