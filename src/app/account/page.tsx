import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { demoProfile, demoOrders } from "@/lib/account-demo";
import { getProduct, formatPrice } from "@/lib/products";
import { ProductImage } from "@/components/product-image";
import { Icon } from "@/components/icon";

export const metadata: Metadata = { title: "My account" };

export default async function AccountPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login?returnTo=/account");
  }

  const { user } = session;
  const name = user.name ?? user.given_name ?? "Your account";
  const greetingName = user.given_name ?? user.name ?? "there";
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div className="container page-section">
      <div className="account-demo-note">
        Your account · Sample orders, shipping address, and settings
      </div>
      <div className="page-intro">
        <span className="eyebrow">Your corner of Northstar</span>
        <h1>Welcome back, {greetingName}.</h1>
        <p>Good to see you. Here’s what’s happening in your wardrobe.</p>
      </div>
      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="profile-card">
            <span className="avatar">{initials}</span>
            <strong>{name}</strong>
            <span>Part of the everyday since {demoProfile.memberSince}</span>
          </div>
          <nav aria-label="Account sections">
            <a href="#orders">
              <Icon name="box" /> Orders
            </a>
            <a href="#profile">
              <Icon name="user" /> Profile
            </a>
            <a href="#addresses">
              <Icon name="truck" /> Addresses
            </a>
            <a href="#settings">
              <Icon name="star" /> Account settings
            </a>
          </nav>
          <Link href="/shop" className="text-link">
            Find your next favorite <Icon name="arrow" />
          </Link>
        </aside>
        <div className="account-body">
          <section id="orders">
            <div className="account-section-heading">
              <h2>Your orders</h2>
              <span>{demoOrders.length} past orders</span>
            </div>
            {demoOrders.map((order) => (
              <article className="order-card" key={order.number}>
                <div className="order-topline">
                  <div>
                    <strong>{order.number}</strong>
                    <span>{order.date}</span>
                  </div>
                  <span className="status-badge">
                    <Icon name="check" />
                    {order.status}
                  </span>
                </div>
                <div className="order-products">
                  {order.items.map((item) => {
                    const product = getProduct(item.slug)!;
                    return (
                      <Link
                        key={item.slug}
                        href={`/products/${item.slug}`}
                        className="order-product"
                      >
                        <ProductImage product={product} />
                        <div>
                          <h3>{product.name}</h3>
                          <p>
                            {product.color} / {item.size}
                          </p>
                          <span>Shop again ↗</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="order-bottomline">
                  <span>
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"} · Includes
                    shipping
                  </span>
                  <strong>{formatPrice(order.total)}</strong>
                </div>
              </article>
            ))}
          </section>
          <div className="account-panels">
            <section id="profile" className="account-panel">
              <span className="eyebrow">The essentials</span>
              <h2>Your profile</h2>
              <dl>
                <dt>Name</dt>
                <dd>{name}</dd>
                <dt>Email address</dt>
                <dd>{user.email ?? "Not provided"}</dd>
              </dl>
              <p className="field-note">Profile · Display only</p>
            </section>
            <section id="addresses" className="account-panel">
              <span className="eyebrow">Home is where it lands</span>
              <h2>Your addresses</h2>
              <span className="small-badge">Default shipping · Sample</span>
              <address>
                Alex Morgan
                <br />
                123 Example Street, Apt 4B
                <br />
                Chicago, IL 60601
                <br />
                United States
              </address>
            </section>
          </div>
          <section id="settings" className="account-panel settings-panel">
            <span className="eyebrow">Just how you like it</span>
            <h2>Account settings</h2>
            <div className="settings-row">
              <span>Shopping region</span>
              <strong>United States · USD</strong>
            </div>
            <div className="settings-row">
              <span>Email preferences</span>
              <strong>Order updates only</strong>
            </div>
            <p className="field-note">
              Sample settings for the account preview. Editing is not enabled.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
