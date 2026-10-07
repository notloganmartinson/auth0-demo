import Link from "next/link";
import { Icon } from "./icon";
export function AuthPlaceholder({ label }: { label: string }) {
  return (
    <div className="container placeholder-page">
      <Icon name="star" />
      <span className="eyebrow">{label} · Development placeholder</span>
      <h1>Authentication integration pending.</h1>
      <p>
        This temporary page intentionally has no authentication behavior. The
        storefront is ready for the project owner to add their own integration.
      </p>
      <Link href="/shop" className="button">
        Back to the collection <Icon name="arrow" />
      </Link>
    </div>
  );
}
