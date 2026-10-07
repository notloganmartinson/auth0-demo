import type { Product } from "@/lib/products";

// One local contact sheet keeps the complete catalog available offline.
// CSS selects a cell without requiring twelve duplicate downloads.
export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const column = product.imageIndex % 4;
  const row = Math.floor(product.imageIndex / 4);
  return (
    <div
      role="img"
      aria-label={`${product.name} in ${product.color}`}
      className={`product-image ${className}`}
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: "400% 300%",
        backgroundPosition: `${(column * 100) / 3}% ${row * 50}%`,
      }}
    />
  );
}
