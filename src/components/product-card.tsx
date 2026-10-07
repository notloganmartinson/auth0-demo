import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import { ProductImage } from "./product-image";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link
        href={`/products/${product.slug}`}
        className="product-card-image"
        aria-label={`Shop ${product.name}`}
      >
        <ProductImage product={product} />
        {product.isNew && <span className="product-badge">Just landed</span>}
        <span className="quick-view">
          Discover the details <span aria-hidden="true">↗</span>
        </span>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h3>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <span className="whitespace-nowrap text-sm">
          {formatPrice(product.price)}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-muted">
        <span className="swatch" style={{ background: product.swatch }} />
        {product.color}
        <span className="ml-auto">{product.gender}</span>
      </div>
    </article>
  );
}
