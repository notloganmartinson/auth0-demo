import Link from "next/link";
import { shopNavigation } from "@/lib/navigation";
import { AccountNavigation } from "./account-navigation";
import { CartLink } from "./cart-link";
import { Icon } from "./icon";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Northstar Supply Co. home"
      className={`brand ${light ? "brand-light" : ""}`}
    >
      <Icon name="star" className="brand-star" />
      <span>
        NORTHSTAR<span className="brand-subtitle">SUPPLY CO.</span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <>
      <div className="announcement">
        <span>
          Good things, delivered. Complimentary shipping on orders $125+
        </span>
        <span className="announcement-right">Made for your everyday.</span>
      </div>
      <header className="site-header">
        <div className="header-main">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav">
            {shopNavigation.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="icon-link"
              href="/shop#product-search"
              aria-label="Search products"
            >
              <Icon name="search" />
            </Link>
            <AccountNavigation />
            <CartLink />
          </div>
        </div>
        <nav aria-label="Mobile navigation" className="mobile-nav">
          {shopNavigation.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
