"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { getProduct } from "@/lib/products";

export type CartItem = { slug: string; size: string; quantity: number };
const EMPTY_CART: CartItem[] = [];
const STORAGE_KEY = "northstar-cart-v1";
export const MAX_QUANTITY = 10;

// Treat browser storage as untrusted: ignore stale products and invalid variants.
function readCart(): CartItem[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]",
    );
    if (!Array.isArray(value)) return [];
    const valid: CartItem[] = [];
    for (const entry of value) {
      if (
        !entry ||
        typeof entry.slug !== "string" ||
        typeof entry.size !== "string"
      )
        continue;
      const product = getProduct(entry.slug);
      if (
        !product?.sizes.includes(entry.size) ||
        !Number.isInteger(entry.quantity) ||
        entry.quantity < 1
      )
        continue;
      const existing = valid.find(
        (item) => item.slug === entry.slug && item.size === entry.size,
      );
      if (existing)
        existing.quantity = Math.min(
          MAX_QUANTITY,
          existing.quantity + entry.quantity,
        );
      else
        valid.push({
          slug: entry.slug,
          size: entry.size,
          quantity: Math.min(MAX_QUANTITY, entry.quantity),
        });
    }
    return valid;
  } catch {
    return [];
  }
}

type Action =
  | { type: "restore"; items: CartItem[] }
  | { type: "add"; slug: string; size: string }
  | { type: "quantity"; slug: string; size: string; quantity: number }
  | { type: "clear" };
function reducer(current: CartItem[] | null, action: Action): CartItem[] {
  const items = current ?? [];
  if (action.type === "restore") return action.items;
  if (action.type === "clear") return [];
  if (action.type === "add") {
    if (!getProduct(action.slug)?.sizes.includes(action.size)) return items;
    const found = items.some(
      (item) => item.slug === action.slug && item.size === action.size,
    );
    return found
      ? items.map((item) =>
          item.slug === action.slug && item.size === action.size
            ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) }
            : item,
        )
      : [...items, { slug: action.slug, size: action.size, quantity: 1 }];
  }
  if (!Number.isInteger(action.quantity)) return items;
  return items
    .map((item) =>
      item.slug === action.slug && item.size === action.size
        ? {
            ...item,
            quantity: Math.min(MAX_QUANTITY, Math.max(0, action.quantity)),
          }
        : item,
    )
    .filter((item) => item.quantity > 0);
}

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  count: number;
  subtotal: number;
  addItem: (slug: string, size: string) => void;
  setQuantity: (slug: string, size: string, quantity: number) => void;
  clearCart: () => void;
};
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [restoredItems, dispatch] = useReducer(reducer, null);
  const ready = restoredItems !== null;
  const items = restoredItems ?? EMPTY_CART;
  useEffect(() => {
    // Restore after hydration; never overwrite saved items with the empty server render.
    dispatch({ type: "restore", items: readCart() });
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* Cart still works in memory if storage is unavailable. */
    }
  }, [items, ready]);
  return (
    <CartContext.Provider
      value={{
        items,
        ready,
        count: items.reduce((n, item) => n + item.quantity, 0),
        subtotal: items.reduce(
          (n, item) => n + (getProduct(item.slug)?.price ?? 0) * item.quantity,
          0,
        ),
        addItem: (slug, size) => dispatch({ type: "add", slug, size }),
        setQuantity: (slug, size, quantity) =>
          dispatch({ type: "quantity", slug, size, quantity }),
        clearCart: () => dispatch({ type: "clear" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used within CartProvider");
  return cart;
}
