"use client";
import Link from "next/link";
import { getProduct, formatPrice } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD, shippingPrice } from "@/lib/commerce";
import { useCart, MAX_QUANTITY } from "./cart-provider";
import { ProductImage } from "./product-image";
import { Icon } from "./icon";

export function EmptyBag({ checkout = false }: { checkout?: boolean }) {
  return (
    <div className="empty-state">
      <Icon name="bag" />
      <span className="eyebrow">Room for something good</span>
      <h1>
        {checkout
          ? "Let’s find you something first."
          : "Your bag is taking a breather."}
      </h1>
      <p>Your next everyday favorite is waiting in the collection.</p>
      <Link href="/shop" className="button">
        Explore the collection <Icon name="arrow" />
      </Link>
    </div>
  );
}
export function CartContent() {
  const { items, ready, count, subtotal, setQuantity } = useCart();
  if (!ready)
    return (
      <p className="loading-message" role="status">
        Opening your bag…
      </p>
    );
  if (!items.length) return <EmptyBag />;
  const shipping = shippingPrice(subtotal);
  return (
    <>
      <div className="page-intro">
        <span className="eyebrow">Good choices, all yours</span>
        <h1>
          Your bag. <span className="heading-count">({count})</span>
        </h1>
      </div>
      <div className="cart-layout">
        <div>
          <div className="shipping-progress">
            <Icon name="truck" />
            <span>
              {subtotal >= FREE_SHIPPING_THRESHOLD
                ? "Your order qualifies for complimentary shipping."
                : `You’re ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} away from complimentary shipping.`}
            </span>
            <progress
              max={FREE_SHIPPING_THRESHOLD}
              value={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
              aria-label="Progress toward free shipping"
            />
          </div>
          <div className="cart-items">
            {items.map((item) => {
              const product = getProduct(item.slug)!;
              return (
                <article
                  className="cart-item"
                  key={`${item.slug}-${item.size}`}
                >
                  <Link
                    href={`/products/${item.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <ProductImage product={product} />
                  </Link>
                  <div className="cart-item-info">
                    <div className="flex justify-between gap-4">
                      <h2>
                        <Link href={`/products/${item.slug}`}>
                          {product.name}
                        </Link>
                      </h2>
                      <span>{formatPrice(product.price * item.quantity)}</span>
                    </div>
                    <p>
                      {product.color} <span>/</span> Size {item.size}
                    </p>
                    <p className="unit-price">
                      {formatPrice(product.price)} each
                    </p>
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          aria-label={`Decrease ${product.name}, size ${item.size}`}
                          onClick={() =>
                            setQuantity(item.slug, item.size, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                        >
                          <Icon name="minus" />
                        </button>
                        <span aria-label={`Quantity ${item.quantity}`}>
                          {item.quantity}
                        </span>
                        <button
                          aria-label={`Increase ${product.name}, size ${item.size}`}
                          onClick={() =>
                            setQuantity(item.slug, item.size, item.quantity + 1)
                          }
                          disabled={item.quantity === MAX_QUANTITY}
                        >
                          <Icon name="plus" />
                        </button>
                      </div>
                      <button
                        className="remove-link"
                        onClick={() => setQuantity(item.slug, item.size, 0)}
                        aria-label={`Remove ${product.name}, size ${item.size}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <Link href="/shop" className="text-link mt-8">
            ← Continue shopping
          </Link>
        </div>
        <aside className="order-summary">
          <span className="eyebrow">One step closer</span>
          <h2>Order summary</h2>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-line">
            <span>Standard shipping</span>
            <span>{shipping ? formatPrice(shipping) : "On us"}</span>
          </div>
          <div className="summary-line text-muted">
            <span>Tax (demo)</span>
            <span>{formatPrice(0)}</span>
          </div>
          <div className="summary-total">
            <span>Estimated total</span>
            <strong>{formatPrice(subtotal + shipping)}</strong>
          </div>
          <Link href="/checkout" className="button w-full">
            Proceed to Checkout <Icon name="arrow" />
          </Link>
          <p className="summary-note">
            A little closer to your new favorites.
            <br />
            Demo checkout · No payment required.
          </p>
        </aside>
      </div>
    </>
  );
}
