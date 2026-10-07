import Link from "next/link";
import { Brand } from "./header";
import { accountNavigation } from "@/lib/navigation";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Brand light />
          <p>
            Considered essentials.
            <br />
            For wherever life takes you.
          </p>
        </div>
        <div>
          <h2>Find your everyday</h2>
          <Link href="/shop?gender=Men">Shop Men</Link>
          <Link href="/shop?gender=Women">Shop Women</Link>
          <Link href="/shop?collection=new">New Arrivals</Link>
        </div>
        <div>
          <h2>Your Northstar</h2>
          <Link href={accountNavigation.account.href}>My Account</Link>
          <Link href="/cart">Shopping Bag</Link>
          <Link href={accountNavigation.login.href}>Log In</Link>
          <Link href={accountNavigation.signup.href}>Create Account</Link>
        </div>
        <div className="footer-note">
          <span className="eyebrow">A little less. A little better.</span>
          <p>
            Good pieces. Easy mornings.
            <br />A wardrobe that feels like you.
          </p>
          <Link href="/shop" className="text-link">
            Find your next favorite ↗
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Northstar Supply Co.</span>
        <span>Fictional retailer · Interview demonstration · USD</span>
      </div>
    </footer>
  );
}
