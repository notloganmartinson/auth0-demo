"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "./product-card";
import { Icon } from "./icon";

export type ShopFilters = {
  gender?: string;
  category?: string;
  collection?: string;
  q?: string;
};
export function ShopGrid({ initial }: { initial: ShopFilters }) {
  const [gender, setGender] = useState(initial.gender ?? "All");
  const [category, setCategory] = useState(initial.category ?? "All");
  const [collection, setCollection] = useState(initial.collection ?? "all");
  const [query, setQuery] = useState(initial.q ?? "");
  const [sort, setSort] = useState("featured");
  const filtered = products
    .filter(
      (p) =>
        (gender === "All" || p.gender === gender || p.gender === "Unisex") &&
        (category === "All" || p.category === category) &&
        (collection !== "new" || p.isNew) &&
        (collection !== "trending" || p.featured) &&
        `${p.name} ${p.category} ${p.color} ${p.description}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : Number(!!b.featured) - Number(!!a.featured),
    );
  function reset() {
    setGender("All");
    setCategory("All");
    setCollection("all");
    setQuery("");
    setSort("featured");
  }
  return (
    <>
      <div className="shop-toolbar">
        <div className="filter-tabs" role="group" aria-label="Shop department">
          {["All", "Men", "Women"].map((value) => (
            <button
              key={value}
              aria-pressed={gender === value}
              className={gender === value ? "active" : ""}
              onClick={() => setGender(value)}
            >
              {value === "All" ? "All pieces" : value}
            </button>
          ))}
        </div>
        <label className="search-input">
          <Icon name="search" />
          <input
            id="product-search"
            type="search"
            aria-label="Search products"
            placeholder="Find your next favorite"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div className="filter-row">
        <div className="filter-selects">
          <label>
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {[
                "All",
                "Layers",
                "Knitwear",
                "Tops",
                "Bottoms",
                "Accessories",
              ].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Collection
            <select
              value={collection}
              onChange={(event) => setCollection(event.target.value)}
            >
              <option value="all">All collections</option>
              <option value="new">New Arrivals</option>
              <option value="trending">Trending</option>
            </select>
          </label>
        </div>
        <label className="sort-label">
          Sort by
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>
      <p className="result-count" role="status">
        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} to make
        your own
      </p>
      {filtered.length > 0 ? (
        <div className="product-grid shop-product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="search" />
          <h2>A fresh start?</h2>
          <p>
            We couldn’t find a match. Try another search or clear your filters.
          </p>
          <button className="button" onClick={reset}>
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
