"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { formatPrice, getProduct } from "@/lib/products";
import { shippingPrice } from "@/lib/commerce";
import { useCart } from "./cart-provider";
import { EmptyBag } from "./cart-content";
import { ProductImage } from "./product-image";
import { Icon } from "./icon";

export function CheckoutContent() {
  const { items, subtotal, ready, clearCart } = useCart();
  const [method, setMethod] = useState<"standard" | "express">("standard");
  const [placed, setPlaced] = useState<{ total: number; count: number } | null>(
    null,
  );
  const shipping = shippingPrice(subtotal, method);
  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) return;
    // Deliberately no request, payment, or persistence of contact/address fields.
    setPlaced({
      total: subtotal + shipping,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
    });
    clearCart();
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  if (!ready)
    return (
      <p className="loading-message" role="status">
        Getting your checkout ready…
      </p>
    );
  if (placed)
    return (
      <div className="order-success" role="status">
        <span className="success-icon">
          <Icon name="check" />
        </span>
        <span className="eyebrow">A little something to look forward to</span>
        <h1>That looks good on you.</h1>
        <p>Your demo order is complete.</p>
        <div className="success-receipt">
          <span>DEMO ORDER · NS-DEMO</span>
          <strong>
            {placed.count} {placed.count === 1 ? "piece" : "pieces"} ·{" "}
            {formatPrice(placed.total)}
          </strong>
          <p>
            This was a demonstration only. You have not been charged, nothing
            will ship, and no contact or shipping details were saved or sent.
          </p>
        </div>
        <Link href="/shop" className="button">
          Keep exploring <Icon name="arrow" />
        </Link>
      </div>
    );
  if (!items.length) return <EmptyBag checkout />;
  return (
    <>
      <div className="page-intro">
        <Link href="/cart" className="text-link mb-7">
          ← Back to your bag
        </Link>
        <span className="eyebrow">The final details</span>
        <h1>Make it yours.</h1>
        <p>
          Demo checkout. No payment, no real order. Please use sample
          information.
        </p>
      </div>
      <form className="checkout-layout" onSubmit={placeOrder}>
        <div className="checkout-fields">
          <fieldset className="checkout-section">
            <legend>
              <span>01</span> Contact
            </legend>
            <label>
              Email address
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="alex@example.com"
                maxLength={160}
              />
            </label>
            <p className="field-note">
              For this demo only. No email will be sent.
            </p>
          </fieldset>
          <fieldset className="checkout-section">
            <legend>
              <span>02</span> Shipping address
            </legend>
            <div className="form-grid">
              <label>
                First name
                <input
                  name="firstName"
                  required
                  autoComplete="given-name"
                  placeholder="Alex"
                  maxLength={80}
                  pattern=".*\S.*"
                />
              </label>
              <label>
                Last name
                <input
                  name="lastName"
                  required
                  autoComplete="family-name"
                  placeholder="Morgan"
                  maxLength={80}
                  pattern=".*\S.*"
                />
              </label>
              <label className="full-width">
                Street address
                <input
                  name="address"
                  required
                  autoComplete="address-line1"
                  placeholder="123 Example Street"
                  maxLength={180}
                  pattern=".*\S.*"
                />
              </label>
              <label className="full-width">
                Apartment, suite, etc.{" "}
                <span className="text-muted">(optional)</span>
                <input
                  name="apartment"
                  autoComplete="address-line2"
                  maxLength={80}
                />
              </label>
              <label>
                City
                <input
                  name="city"
                  required
                  autoComplete="address-level2"
                  placeholder="Chicago"
                  maxLength={80}
                  pattern=".*\S.*"
                />
              </label>
              <label>
                State
                <select
                  name="state"
                  required
                  autoComplete="address-level1"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a state
                  </option>
                  {[
                    "AL",
                    "AK",
                    "AZ",
                    "AR",
                    "CA",
                    "CO",
                    "CT",
                    "DE",
                    "DC",
                    "FL",
                    "GA",
                    "HI",
                    "ID",
                    "IL",
                    "IN",
                    "IA",
                    "KS",
                    "KY",
                    "LA",
                    "ME",
                    "MD",
                    "MA",
                    "MI",
                    "MN",
                    "MS",
                    "MO",
                    "MT",
                    "NE",
                    "NV",
                    "NH",
                    "NJ",
                    "NM",
                    "NY",
                    "NC",
                    "ND",
                    "OH",
                    "OK",
                    "OR",
                    "PA",
                    "RI",
                    "SC",
                    "SD",
                    "TN",
                    "TX",
                    "UT",
                    "VT",
                    "VA",
                    "WA",
                    "WV",
                    "WI",
                    "WY",
                  ].map((state) => (
                    <option key={state}>{state}</option>
                  ))}
                </select>
              </label>
              <label>
                ZIP code
                <input
                  name="zip"
                  required
                  autoComplete="postal-code"
                  inputMode="numeric"
                  pattern="[0-9]{5}(-[0-9]{4})?"
                  title="Enter a 5-digit US ZIP code, optionally followed by four digits"
                  placeholder="60601"
                  maxLength={10}
                />
              </label>
              <label>
                Country
                <select name="country" autoComplete="country-name">
                  <option>United States</option>
                </select>
              </label>
            </div>
          </fieldset>
          <fieldset className="checkout-section">
            <legend>
              <span>03</span> Shipping method
            </legend>
            <label
              className={`shipping-option ${method === "standard" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="shipping"
                value="standard"
                checked={method === "standard"}
                onChange={() => setMethod("standard")}
              />
              <span>
                <strong>Standard delivery</strong>
                <small>3–5 business days</small>
              </span>
              <strong>
                {shippingPrice(subtotal)
                  ? formatPrice(shippingPrice(subtotal))
                  : "Free"}
              </strong>
            </label>
            <label
              className={`shipping-option ${method === "express" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="shipping"
                value="express"
                checked={method === "express"}
                onChange={() => setMethod("express")}
              />
              <span>
                <strong>Express delivery</strong>
                <small>1–2 business days</small>
              </span>
              <strong>{formatPrice(18)}</strong>
            </label>
          </fieldset>
        </div>
        <aside className="order-summary checkout-summary">
          <span className="eyebrow">Your new rotation</span>
          <h2>Order summary</h2>
          <div className="checkout-items">
            {items.map((item) => {
              const product = getProduct(item.slug)!;
              return (
                <div
                  className="checkout-item"
                  key={`${item.slug}-${item.size}`}
                >
                  <ProductImage product={product} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {product.color} / {item.size} / Qty {item.quantity}
                    </p>
                    <strong>
                      {formatPrice(product.price * item.quantity)}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <span>{shipping ? formatPrice(shipping) : "On us"}</span>
          </div>
          <div className="summary-line text-muted">
            <span>Tax (demo)</span>
            <span>{formatPrice(0)}</span>
          </div>
          <div className="summary-total" aria-live="polite">
            <span>Total</span>
            <strong>{formatPrice(subtotal + shipping)}</strong>
          </div>
          <button className="button w-full" type="submit">
            Place Demo Order <Icon name="arrow" />
          </button>
          <p className="summary-note">
            Demo only. No payment is collected.
            <br />
            Your details stay on this page and are not saved.
          </p>
        </aside>
      </form>
    </>
  );
}
