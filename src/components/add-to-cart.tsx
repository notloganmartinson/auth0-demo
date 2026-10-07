"use client";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { MAX_QUANTITY, useCart } from "./cart-provider";
import { Icon } from "./icon";

export function AddToCart({ product }: { product: Product }) {
  const [size, setSize] = useState(
    product.sizes.length === 1 ? product.sizes[0] : "",
  );
  const [message, setMessage] = useState("");
  const { addItem, ready, items } = useCart();
  const atLimit =
    (items.find((item) => item.slug === product.slug && item.size === size)
      ?.quantity ?? 0) >= MAX_QUANTITY;
  function add() {
    if (!size) {
      setMessage("Choose a size to find your perfect fit.");
      return;
    }
    if (atLimit) return;
    addItem(product.slug, size);
    setMessage(`${product.name} · ${size} added to your bag.`);
  }
  return (
    <div className="purchase-controls">
      <fieldset>
        <legend>
          Select your size <span>True to size · Relaxed fit</span>
        </legend>
        <div className="size-options">
          {product.sizes.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={size === value}
              onClick={() => {
                setSize(value);
                setMessage("");
              }}
              className={size === value ? "selected" : ""}
            >
              {value}
            </button>
          ))}
        </div>
      </fieldset>
      <button
        onClick={add}
        className="button w-full"
        disabled={!ready || atLimit}
      >
        {" "}
        {atLimit ? "Maximum 10 per size in bag" : "Add to Cart"}
        <Icon name="plus" />
      </button>
      <div className="add-feedback" aria-live="polite">
        {message && (
          <>
            <p>{message}</p>
            {message.includes("added") && (
              <Link href="/cart" className="text-link">
                View your bag <Icon name="arrow" />
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
