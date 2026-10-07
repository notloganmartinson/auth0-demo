import type { Metadata } from "next";
import { ShopGrid, type ShopFilters } from "@/components/shop-grid";
export const metadata: Metadata = { title: "Shop the collection" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;
  const initial: ShopFilters = {
    gender: ["Men", "Women"].includes(first(params.gender) ?? "")
      ? first(params.gender)
      : "All",
    category: ["Layers", "Knitwear", "Tops", "Bottoms", "Accessories"].includes(
      first(params.category) ?? "",
    )
      ? first(params.category)
      : "All",
    collection: ["new", "trending"].includes(first(params.collection) ?? "")
      ? first(params.collection)
      : "all",
    q: first(params.q) ?? "",
  };
  const title =
    initial.collection === "new"
      ? "A fresh perspective."
      : initial.gender === "Men"
        ? "Everyday, his way."
        : initial.gender === "Women"
          ? "Everyday, her way."
          : "Good pieces. Great days.";
  return (
    <div className="container page-section">
      <div className="page-intro">
        <span className="eyebrow">The Northstar wardrobe</span>
        <h1>{title}</h1>
        <p>Considered essentials, easy layers, and a few new favorites.</p>
      </div>
      <ShopGrid key={JSON.stringify(initial)} initial={initial} />
    </div>
  );
}
