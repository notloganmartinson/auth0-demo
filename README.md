# Northstar Supply Co.

A fictional clothing retailer built as the existing customer storefront for an Okta/Auth0 Technical Account Manager interview. The commerce experience is complete; the project owner adds authentication separately.

## Install and run

Use Node.js 20.9+ (Node 22 recommended) and npm.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

For a reliable interview run, build ahead of time and use the production server:

```bash
npm run lint
npm run build
npm start
```

`npm run typecheck` also checks TypeScript. No environment variables, accounts, database, or external services are required. Next.js and its installation requirements are documented in the [official installation guide](https://nextjs.org/docs/app/getting-started/installation).

## Dependency maintenance

Next.js is pinned to 16.4.0, and the lockfile includes the compatible security updates from `npm audit fix`.

`next.config.ts` keeps TypeScript checking on the compiler API used before Next.js 16.4. The new CLI subprocess returns empty configuration output in this restricted build environment. Type checking remains enabled; this uses the documented [`useTypeScriptCli` option](https://nextjs.org/docs/app/api-reference/config/next-config-js/useTypeScriptCli), not `ignoreBuildErrors`.

Linting uses the recommended TypeScript, React, React Hooks, and JSX accessibility rules directly. The optional `eslint-config-next` preset was removed because its dependency chain (`@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`) includes the unpatched [braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Those five packages are absent from the dependency tree. Next-specific plugin rules are no longer enabled; framework compilation and type validation remain part of `npm run build`. No advisory suppression or incompatible forced downgrade is used.

Run `npm audit` when registry access is available to check current advisories. The remediation was checked against the supplied audit report; the build environment could not obtain a fresh live audit because npm registry DNS access is blocked.

## What is implemented

- `/`: responsive editorial storefront, new arrivals, trending products, featured collection, men's/women's links, and a shipping promotion.
- `/shop`: 12 mock products; department, category, collection, text search, and price/name sorting. Department collections include unisex products. Navigation can initialize filters with query parameters; subsequent filter interactions are page-local.
- `/products/[slug]`: product descriptions, color, materials, size selection, working Add to Cart, and related products. Unknown slugs render a 404.
- `/cart`: size-specific line items, quantities, removal, subtotal, shipping estimate, and checkout link. Maximum quantity is 10 per product/size.
- `/checkout`: browser-validated contact and US shipping fields, standard/express delivery, order summary, and a demo-only success state. Standard shipping is $8, free from $125; express is $18. Tax is explicitly $0 for the demo.
- `/account`: **public**, read-only account presentation with clearly labeled sample profile, order history, address, and settings.
- `/login` and `/signup`: minimal development placeholders with no forms or authentication behavior.

Checkout makes no API call, collects no payment, and does not store or transmit contact/address values. Placing a demo order clears the bag and shows a temporary confirmation; refreshing does not retain that confirmation. It does not create account order history. Use fictional information during demonstrations.

## Project structure

```text
src/
  app/                         App Router routes; layouts/pages are server components
    globals.css                Tailwind import, design tokens, responsive storefront styles
    account/page.tsx            Public sample dashboard; future protection location
    login/page.tsx              Temporary Log In destination
    signup/page.tsx             Temporary Create Account destination
    products/[slug]/page.tsx    Product page and metadata
  components/
    header.tsx                 Brand, shopping navigation, account links, bag
    account-navigation.tsx     Small replaceable account navigation component
    auth-placeholder.tsx       Shared form-free integration-pending message
    cart-provider.tsx          Cart reducer/context and localStorage persistence
    cart-link.tsx              Live header bag count
    cart-content.tsx           Bag and quantity controls
    checkout-content.tsx       Mock checkout and success presentation
    add-to-cart.tsx            Size selector and add feedback
    shop-grid.tsx              Interactive filters and sorting
    product-card.tsx           Reusable catalog card
    product-image.tsx          Local catalog contact-sheet display
  lib/
    products.ts                Typed mock catalog: names, prices, descriptions, sizes, images
    commerce.ts                Shared shipping calculation
    navigation.ts              Central account destinations and shop navigation
    account-demo.ts            Static sample customer/order fixtures
public/images/                 Original locally stored campaign and catalog imagery
docs/image-assets.md           Asset provenance and generation prompts
```

Only interactive commerce components are client components. The root server layout places the shared cart provider around server-rendered content. The cart stores only product slug, size, and quantity in `northstar-cart-v1` in localStorage. Prices always come from the catalog. Stored data is validated and invalid entries are ignored; when storage is unavailable, the cart still works in memory. Storage restores after hydration before purchase controls become available. Cart changes persist within that browser; live cross-tab synchronization is intentionally out of scope.

## Authentication intentionally not implemented

There is no identity SDK, fake authentication, login/signup form, session, token/JWT handling, OAuth/OIDC implementation, callback route, logout handler, middleware/proxy guard, or protected route. No authentication configuration or environment variables are needed.

The only current authentication placeholders are:

1. `src/lib/navigation.ts`: `accountNavigation.login` (`/login`) and `accountNavigation.signup` (`/signup`) centralize the temporary destinations. Header and footer use this configuration.
2. `src/app/login/page.tsx` and `src/app/signup/page.tsx`: temporary pages displaying **“Authentication integration pending.”** through `src/components/auth-placeholder.tsx`. They have no forms.
3. `src/components/account-navigation.tsx`: always displays the same public Log In, Create Account, and My Account navigation. This is the small component to change when real user information becomes available.
4. `src/app/account/page.tsx`: intentionally public, with a code comment marking where the project owner will later add protection. The displayed name comes from sample presentation content, not a logged-in user.

The files you will most likely touch later are `src/lib/navigation.ts`, `src/components/account-navigation.tsx`, `src/app/account/page.tsx`, and possibly the root `src/app/layout.tsx`. Replace/remove the two temporary pages and the sample data in `src/lib/account-demo.ts` as appropriate for your own integration. No SDK API has been anticipated or implemented.

## Design and assets

Warm ivory, charcoal, and muted olive establish an original Northstar identity. Large editorial photography, restrained rectangular controls, a custom star mark, and generous space keep the focus on apparel. Fonts use a local system stack, avoiding font downloads during builds or demos.

All imagery is original AI-generated demo artwork stored in `public/images`; it does not depend on third-party image hosts, random-image URLs, or real retail logos. A single 4-by-3 catalog contact sheet is displayed through CSS positions, so all 12 product images share one cached asset. Product and campaign representations are illustrative, not real merchandise. See [asset notes and prompts](docs/image-assets.md).

## Quick demo check

1. Open `/`, follow Men/Women or New Arrivals, and try search/sorting.
2. Open a product, select a size, add it, and follow **View your bag**.
3. Change a quantity and reload to confirm the bag persists. Try a second size of the same product.
4. Continue to checkout, fill sample details, switch shipping methods, and place a demo order. Confirm the success message and empty bag count.
5. Open `/account` directly: it must be accessible without logging in.
6. Follow Log In and Create Account: both show the integration-pending message and no forms.

Keep authentication separate until you implement it yourself. The account's historical sample orders remain fixed and are unrelated to demo checkout.

## Validation performed

Dependencies were installed with npm, and ESLint, TypeScript, and the production build passed. In-process production request checks covered all routes, all 12 products, query-based filters/search, empty results, invalid filters, the public account page, form-free placeholders, and 404 responses for unknown products, `/callback`, and `/logout`. Cart logic checks covered size variants, merging, quantity limits, removal, totals, clearing, malformed/unavailable storage, duplicate normalization, and shipping thresholds. Local image file integrity was checked.

This build environment blocks listening sockets and Chromium startup, so an actual browser click-through and visual inspection could not be completed here. Use the quick demo check above on your laptop before the interview.
