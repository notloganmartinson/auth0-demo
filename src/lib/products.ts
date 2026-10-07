export type Product = {
  slug: string;
  name: string;
  category: "Layers" | "Knitwear" | "Tops" | "Bottoms" | "Accessories";
  gender: "Men" | "Women" | "Unisex";
  price: number;
  color: string;
  swatch: string;
  image: string;
  imageIndex: number;
  description: string;
  composition: string;
  sizes: string[];
  isNew?: boolean;
  featured?: boolean;
};

const clothingSizes = ["XS", "S", "M", "L", "XL"];
const catalog: Omit<Product, "image" | "imageIndex">[] = [
  {
    slug: "field-overshirt",
    name: "The Field Overshirt",
    category: "Layers",
    gender: "Men",
    price: 98,
    color: "Moss",
    swatch: "#626650",
    description:
      "Your everyday layer, with a little more character. Substantial cotton twill, easy dropped shoulders, and two generous chest pockets. Throw it over a tee and head somewhere good.",
    composition: "100% cotton twill. Machine wash cold; hang to dry.",
    sizes: clothingSizes,
    isNew: true,
    featured: true,
  },
  {
    slug: "weekend-cable-knit",
    name: "Weekend Cable Knit",
    category: "Knitwear",
    gender: "Women",
    price: 88,
    color: "Oat",
    swatch: "#d6cdbb",
    description:
      "Slow mornings, long walks, one very good sweater. A relaxed cable knit with a soft hand feel and a timeless crew neckline. Roomy enough for your favorite tee underneath.",
    composition: "60% cotton, 40% wool. Hand wash cold; dry flat.",
    sizes: clothingSizes,
    isNew: true,
    featured: true,
  },
  {
    slug: "everyday-straight-jean",
    name: "Everyday Straight Jean",
    category: "Bottoms",
    gender: "Unisex",
    price: 84,
    color: "Washed black",
    swatch: "#43433f",
    description:
      "A straight-up staple. Mid-rise denim with a relaxed straight leg and a worn-in wash that only gets better. Designed for repeat wear, from the first coffee to the last train.",
    composition: "100% cotton denim. Wash inside out with similar colors.",
    sizes: ["26", "28", "30", "32", "34", "36"],
    featured: true,
  },
  {
    slug: "heavyweight-cotton-tee",
    name: "Heavyweight Cotton Tee",
    category: "Tops",
    gender: "Unisex",
    price: 38,
    color: "Chalk",
    swatch: "#eeeae1",
    description:
      "The foundation of a good wardrobe. A substantial cotton jersey tee with a clean neckline, boxy fit, and just-right sleeve. Simple, considered, and always in rotation.",
    composition: "100% cotton jersey. Machine wash cold; tumble dry low.",
    sizes: clothingSizes,
    isNew: true,
    featured: true,
  },
  {
    slug: "city-trench",
    name: "The City Trench",
    category: "Layers",
    gender: "Women",
    price: 168,
    color: "Sandstone",
    swatch: "#c1ab8a",
    description:
      "A fresh take on an enduring favorite. An easy double-breasted trench with a removable belt and room to layer. For cloudy commutes and whatever the weekend brings.",
    composition: "Shell: 100% cotton. Lining: 100% polyester. Dry clean.",
    sizes: clothingSizes,
    isNew: true,
  },
  {
    slug: "off-duty-crew",
    name: "Off-Duty Crew",
    category: "Tops",
    gender: "Unisex",
    price: 68,
    color: "Midnight",
    swatch: "#303c48",
    description:
      "Comfort without compromise. Soft loopback cotton, a relaxed cut, and sturdy ribbed cuffs make this the sweatshirt you reach for on your days off. And your days on.",
    composition: "100% cotton French terry. Machine wash cold.",
    sizes: clothingSizes,
    featured: true,
  },
  {
    slug: "daily-oxford",
    name: "The Daily Oxford",
    category: "Tops",
    gender: "Men",
    price: 78,
    color: "Sky",
    swatch: "#a2b8ce",
    description:
      "Sharp enough for plans, relaxed enough for no plans. A breathable Oxford weave, button-down collar, and easy fit make getting dressed the simplest part of your day.",
    composition: "100% cotton Oxford. Machine wash cold; warm iron.",
    sizes: clothingSizes,
  },
  {
    slug: "relaxed-pleated-trouser",
    name: "Relaxed Pleated Trouser",
    category: "Bottoms",
    gender: "Women",
    price: 92,
    color: "Dune",
    swatch: "#b6a285",
    description:
      "A little tailoring goes a long way. These fluid wide-leg trousers feature a high waist and soft front pleats. Pair with a tucked tee or your coziest knit.",
    composition: "65% cotton, 35% lyocell. Machine wash cold; hang to dry.",
    sizes: ["0", "2", "4", "6", "8", "10", "12"],
    isNew: true,
  },
  {
    slug: "ribbed-watch-cap",
    name: "Ribbed Watch Cap",
    category: "Accessories",
    gender: "Unisex",
    price: 28,
    color: "Charcoal",
    swatch: "#4d4d49",
    description:
      "Small detail. Big difference. A soft ribbed knit beanie with a fold-over cuff and comfortable stretch. Your cool-weather constant.",
    composition: "50% wool, 50% acrylic. Hand wash cold; dry flat.",
    sizes: ["One size"],
  },
  {
    slug: "weekender-canvas-tote",
    name: "Weekender Canvas Tote",
    category: "Accessories",
    gender: "Unisex",
    price: 42,
    color: "Olive",
    swatch: "#626650",
    description:
      "Take the long way home. A generous everyday tote in sturdy cotton canvas, with comfortable shoulder straps and an inside pocket for the small things.",
    composition: "100% cotton canvas. Spot clean. 16 × 15 × 5 inches.",
    sizes: ["One size"],
    featured: true,
  },
  {
    slug: "coast-ribbed-cardigan",
    name: "Coast Ribbed Cardigan",
    category: "Knitwear",
    gender: "Women",
    price: 96,
    color: "Natural",
    swatch: "#ddd3bf",
    description:
      "Made for the in-between moments. A soft, textured cardigan with an easy V-neck, relaxed fit, and warm brown buttons. A little coastal, wherever you are.",
    composition: "80% cotton, 20% wool. Hand wash cold; dry flat.",
    sizes: clothingSizes,
    isNew: true,
  },
  {
    slug: "easy-day-short",
    name: "Easy Day Short",
    category: "Bottoms",
    gender: "Men",
    price: 54,
    color: "Ink",
    swatch: "#333e4b",
    description:
      "Less planning, more living. An easy pull-on short with a comfortable drawstring waist, practical pockets, and a relaxed fit. Built for the better part of the week.",
    composition: "100% cotton. Machine wash cold; tumble dry low.",
    sizes: clothingSizes,
  },
];

export const products: Product[] = catalog.map((product, imageIndex) => ({
  ...product,
  image: "/images/catalog.png",
  imageIndex,
}));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
