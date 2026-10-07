// Temporary destinations only. Replace these when you personally add authentication.
// No SDK assumptions, session state, or authentication behavior lives here.
export const accountNavigation = {
  login: { label: "Log In", href: "/login" },
  signup: { label: "Create Account", href: "/signup" },
  account: { label: "My Account", href: "/account" },
} as const;

export const shopNavigation = [
  { label: "Men", href: "/shop?gender=Men" },
  { label: "Women", href: "/shop?gender=Women" },
  { label: "New Arrivals", href: "/shop?collection=new" },
  { label: "Shop All", href: "/shop" },
];
