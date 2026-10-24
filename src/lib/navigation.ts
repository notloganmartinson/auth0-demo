export const accountNavigation = {
  login: { label: "Log In", href: "/auth/login?returnTo=/account" },
  signup: { label: "Create Account", href: "/auth/login?screen_hint=signup&returnTo=/account" },
  account: { label: "My Account", href: "/account" },
} as const;
// /auth/login starts the Auth0 login transaction, after finishing authentication takes user to /account page. 

export const shopNavigation = [
  { label: "Men", href: "/shop?gender=Men" },
  { label: "Women", href: "/shop?gender=Women" },
  { label: "New Arrivals", href: "/shop?collection=new" },
  { label: "Shop All", href: "/shop" },
];
