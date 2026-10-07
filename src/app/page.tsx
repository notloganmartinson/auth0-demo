import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { Icon } from "@/components/icon";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          src="/images/campaign.png"
          alt="Two models in easy autumn layers walking beside a sunlit coastal building"
          fill
          priority
          sizes="100vw"
          className="hero-photo"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="eyebrow">The autumn edit · No. 01</span>
          <h1>
            Find your
            <br />
            <em>everyday.</em>
          </h1>
          <p>
            Fresh air. Familiar favorites.
            <br />
            Good pieces for wherever life takes you.
          </p>
          <Link href="/shop?collection=new" className="button button-light">
            Explore New Arrivals <Icon name="arrow" />
          </Link>
        </div>
        <div className="hero-caption">
          <span>OUT OF OFFICE. INTO YOUR ELEMENT.</span>
          <span>Northstar / Fall ’26</span>
        </div>
      </section>
      <div className="values-strip">
        <span>
          <Icon name="truck" />
          Free shipping on orders $125+
        </span>
        <span>
          <Icon name="box" />
          Easy 30-day returns
        </span>
        <span>
          <Icon name="star" />
          Considered. Comfortable. Yours.
        </span>
      </div>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Meet your new rotation</span>
            <h2>Just landed.</h2>
          </div>
          <Link href="/shop?collection=new" className="text-link">
            Shop New Arrivals <Icon name="arrow" />
          </Link>
        </div>
        <div className="product-grid">
          {[products[0], products[1], products[3], products[7]].map(
            (product) => (
              <ProductCard key={product.slug} product={product} />
            ),
          )}
        </div>
      </section>
      <section className="collection-section container">
        <div className="collection-copy">
          <span className="eyebrow">The everyday collection</span>
          <h2>
            Less overthinking.
            <br />
            <em>More living.</em>
          </h2>
          <p>
            The layers you leave by the door. The knit you reach for again. The
            pieces that make getting dressed feel effortless.
          </p>
          <Link href="/shop?category=Layers" className="button">
            Discover the collection <Icon name="arrow" />
          </Link>
          <span className="collection-footnote">
            GOOD ON THEIR OWN. BETTER TOGETHER.
          </span>
        </div>
        <div className="collection-image">
          <ProductImage product={products[0]} />
          <span className="collection-label">01 / THE FIELD OVERSHIRT</span>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Two ways to find your way</span>
            <h2>Make it your own.</h2>
          </div>
        </div>
        <div className="category-grid">
          <Link href="/shop?gender=Men" className="category-card category-men">
            <Image
              src="/images/campaign.png"
              alt="Men’s olive overshirt and relaxed trousers"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div>
              <span className="eyebrow">Easy layers. Everyday character.</span>
              <h3>
                For him. <Icon name="arrow" />
              </h3>
              <span className="category-cta">Shop Men</span>
            </div>
          </Link>
          <Link
            href="/shop?gender=Women"
            className="category-card category-women"
          >
            <Image
              src="/images/campaign.png"
              alt="Women’s oatmeal knit and tailored trousers"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div>
              <span className="eyebrow">
                Soft textures. Strong sense of self.
              </span>
              <h3>
                For her. <Icon name="arrow" />
              </h3>
              <span className="category-cta">Shop Women</span>
            </div>
          </Link>
        </div>
      </section>
      <section className="section container trending-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Worth coming back to</span>
            <h2>In good company.</h2>
          </div>
          <Link href="/shop?collection=trending" className="text-link">
            Shop Trending <Icon name="arrow" />
          </Link>
        </div>
        <div className="product-grid">
          {[products[2], products[5], products[9], products[0]].map(
            (product) => (
              <ProductCard key={product.slug} product={product} />
            ),
          )}
        </div>
      </section>
      <section className="promo-banner">
        <Icon name="star" />
        <div>
          <span className="eyebrow">A good reason to wander</span>
          <h2>Your next favorite is out there.</h2>
          <p>Find it here. Shipping is on us when you spend $125.</p>
        </div>
        <Link href="/shop" className="button button-light">
          Find your Northstar <Icon name="arrow" />
        </Link>
      </section>
    </>
  );
}
