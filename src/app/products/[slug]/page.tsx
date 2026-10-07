import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, formatPrice } from "@/lib/products";
import { ProductImage } from "@/components/product-image";
import { ProductCard } from "@/components/product-card";
import { AddToCart } from "@/components/add-to-cart";
import { Icon } from "@/components/icon";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return {
    title: product?.name ?? "Product not found",
    description: product?.description,
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.gender === product.gender || p.gender === "Unisex"),
    )
    .slice(0, 4);
  return (
    <div className="container">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>
      <section className="product-detail">
        <div className="detail-photo">
          <ProductImage product={product} />
          {product.isNew && <span className="product-badge">Just landed</span>}
        </div>
        <div className="product-info">
          <span className="eyebrow">
            Northstar essentials / {product.category}
          </span>
          <h1>{product.name}</h1>
          <p className="product-price">
            {formatPrice(product.price)} <span>USD</span>
          </p>
          <p className="product-description">{product.description}</p>
          <div className="product-color">
            <span className="swatch" style={{ background: product.swatch }} />
            <span>
              Color: <strong>{product.color}</strong>
            </span>
          </div>
          <AddToCart key={product.slug} product={product} />
          <div className="product-benefits">
            <p>
              <Icon name="truck" />
              Free shipping on orders $125+
            </p>
            <p>
              <Icon name="box" />
              Easy returns within 30 days
            </p>
          </div>
          <details className="product-accordion">
            <summary>Materials & care</summary>
            <p>{product.composition}</p>
          </details>
          <details className="product-accordion">
            <summary>Shipping & returns</summary>
            <p>
              Standard shipping: 3–5 business days, $8 or free on orders $125+.
              Express: 1–2 business days, $18. These are sample retail policies
              for this demo; no products are shipped.
            </p>
          </details>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Better together</span>
            <h2>Complete your rotation.</h2>
          </div>
          <Link href="/shop" className="text-link">
            Explore more <Icon name="arrow" />
          </Link>
        </div>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
