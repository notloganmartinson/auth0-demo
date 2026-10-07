import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container empty-state">
      <span className="eyebrow">A little off the beaten path</span>
      <h1>Nothing here. Plenty out there.</h1>
      <p>That page or product isn’t in our collection.</p>
      <Link className="button" href="/shop">
        Back to the collection →
      </Link>
    </div>
  );
}
