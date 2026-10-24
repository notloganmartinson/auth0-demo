# Northstar Supply Co.

Northstar Supply Co. is a fictional Next.js retail application with an Auth0 (Okta) Universal Login integration, built for a Technical Account Manager interview demonstration. It combines a mock storefront, browser-persisted cart, and demo checkout with session-aware navigation and a protected account page.

## Install and run

Use Node.js 20.9+ (Node 22 recommended) and npm. Install the locked dependencies:

```bash
npm ci
```

Authentication requires an Auth0 tenant and a **Regular Web Application** in the Auth0 Dashboard. `package.json` declares `@auth0/nextjs-auth0` as `^4.31.1`; the lockfile resolves version **4.31.1**.

Create `.env.local` in the repository root with your application's settings:

```dotenv
AUTH0_DOMAIN=your-tenant.us.auth0.com
AUTH0_CLIENT_ID=your-application-client-id
AUTH0_CLIENT_SECRET=your-application-client-secret
AUTH0_SECRET=your-generated-64-character-hex-secret
APP_BASE_URL=http://localhost:3000
```

Use the Domain, Client ID, and Client Secret from the Auth0 application's settings. Generate a separate cookie encryption secret for `AUTH0_SECRET`:

```bash
openssl rand -hex 32
```

Register these URLs in the Auth0 application's settings:

| Setting | Local value |
| --- | --- |
| Allowed Callback URLs | `http://localhost:3000/auth/callback` |
| Allowed Logout URLs | `http://localhost:3000` |

Ensure the application has an enabled connection that your test user can authenticate with. The hosted signup experience also depends on the tenant's connection and signup settings.

`APP_BASE_URL` sets the application's origin for redirects. SDK 4.31.1 can infer it from the request when omitted; set it explicitly for this local setup. For a deployment, use the deployed HTTPS origin and register its corresponding callback and logout URLs. These settings follow the [Auth0 Next.js SDK setup guide](https://github.com/auth0/nextjs-auth0#getting-started) and were checked against the installed version. `.env.local` is ignored by Git; keep client and cookie secrets server-side.

Start the development server after configuring the environment:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). Restart the server after changing environment variables.

For a reliable interview run, build ahead of time and use the production server:

```bash
npm run lint
npm run build
npm start
```

`npm run typecheck` also checks TypeScript. The same Auth0 configuration is needed for the production server. The commerce demo requires no database or payment service; authentication uses Auth0. Next.js installation requirements are documented in the [official installation guide](https://nextjs.org/docs/app/getting-started/installation).

## Dependency maintenance

Next.js is pinned to 16.4.0. Use `npm ci` to install the versions recorded in the lockfile.

`next.config.ts` keeps TypeScript checking on the compiler API used before Next.js 16.4. The new CLI subprocess returns empty configuration output in this restricted build environment. Type checking remains enabled; this uses the documented [`useTypeScriptCli` option](https://nextjs.org/docs/app/api-reference/config/next-config-js/useTypeScriptCli), not `ignoreBuildErrors`.

Linting uses the recommended TypeScript, React, React Hooks, and JSX accessibility rules directly. The optional `eslint-config-next` preset is not installed. Next-specific plugin rules are not enabled; framework compilation and type validation remain part of `npm run build`.

Run `npm audit` when registry access is available to check current advisories.

## What is implemented

- `/`: responsive editorial storefront, new arrivals, trending products, featured collection, men's/women's links, and a shipping promotion.
- `/shop`: 12 mock products; department, category, collection, text search, and price/name sorting. Department collections include unisex products. Navigation can initialize filters with query parameters; subsequent filter interactions are page-local.
- `/products/[slug]`: product descriptions, color, materials, size selection, working Add to Cart, and related products. Unknown slugs render a 404.
- `/cart`: size-specific line items, quantities, removal, subtotal, shipping estimate, and checkout link. Maximum quantity is 10 per product/size.
- `/checkout`: browser-validated contact and US shipping fields, standard/express delivery, order summary, and a demo-only success state. Standard shipping is $8, free from $125; express is $18. Tax is explicitly $0 for the demo.
- `/account`: **protected**, requiring an Auth0 session. Displays the authenticated user's name and email alongside static sample orders, membership year, shipping address, and settings. Profile and settings are display-only.
- **Log In**: starts Auth0 Universal Login through `/auth/login?returnTo=/account`. **Create Account** uses the same hosted flow with `screen_hint=signup`.
- Header navigation: signed-out visitors see Log In and Create Account; signed-in visitors see a name greeting, a My Account icon link, and **Log Out** (`/auth/logout`). The footer retains its static account links in both states.
- `/login` and `/signup`: legacy, form-free placeholder pages still accessible directly. Their integration-pending text is outdated; the active navigation uses `/auth/login`, not these pages.

Checkout makes no API call, collects no payment, and does not store or transmit contact/address values. Placing a demo order clears the bag and shows a temporary confirmation; refreshing does not retain that confirmation. It does not create account order history. Use fictional information during demonstrations.

## Project structure

```text
src/
  app/                         App Router routes; layouts/pages are server components
    globals.css                Tailwind import, design tokens, responsive storefront styles
    account/page.tsx            Session guard, authenticated profile, sample account content
    login/page.tsx              Legacy placeholder; not the active login destination
    signup/page.tsx             Legacy placeholder; not the active signup destination
    products/[slug]/page.tsx    Product page and metadata
  components/
    header.tsx                 Brand, shopping navigation, account links, bag
    account-navigation.tsx     Server component rendering navigation from the Auth0 session
    auth-placeholder.tsx       Shared legacy placeholder message
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
    navigation.ts              Auth0 login/signup URLs, account destination, shop navigation
    account-demo.ts            Static sample customer/order fixtures
    auth0.ts                   Shared server-side Auth0Client with a 10-second HTTP timeout
  proxy.ts                     Delegates matching requests to Auth0 middleware
public/images/                 Original locally stored campaign and catalog imagery
docs/image-assets.md           Asset provenance and generation prompts
flow.md                        Short login-to-callback flow sketch
```

Only interactive commerce components are client components. The root server layout places the shared cart provider around server-rendered content. The cart stores only product slug, size, and quantity in `northstar-cart-v1` in localStorage. Prices always come from the catalog. Stored data is validated and invalid entries are ignored; when storage is unavailable, the cart still works in memory. Storage restores after hydration before purchase controls become available. Cart changes persist within that browser; live cross-tab synchronization is intentionally out of scope.

## Authentication

The application uses `@auth0/nextjs-auth0` v4. A shared `Auth0Client` in `src/lib/auth0.ts` reads configuration from the environment and sets `httpTimeout: 10000`. `src/proxy.ts` passes matching requests to `auth0.middleware(request)`, which handles the SDK's authentication routes and session lifecycle. Its matcher excludes Next.js static/image assets and `favicon.ico`, `sitemap.xml`, and `robots.txt`.

The login flow expands the sketch in [flow.md](flow.md):

1. **Log In** navigates to `/auth/login?returnTo=/account`, as configured in `src/lib/navigation.ts`.
2. The SDK starts the authentication transaction and redirects to **Auth0-hosted Universal Login**. Credentials are entered on Auth0's hosted page; this application has no custom login form.
3. Auth0 redirects back to `/auth/callback`. The SDK processes the authorization response, establishes the session, and redirects to `/account` using `returnTo`.
4. Server components call `auth0.getSession()` to read the session. With no custom session store configured, the SDK uses its default encrypted, HttpOnly cookie session and rolling session handling through the middleware. No application session database is configured.

The SDK supplies `/auth/login`, `/auth/callback`, and `/auth/logout` through the proxy; these are not custom App Router route handlers. Middleware session handling alone does not protect every page. The explicit guard is in `src/app/account/page.tsx`: if `auth0.getSession()` returns no session, it redirects to `/auth/login?returnTo=/account`. The storefront, cart, and demo checkout remain public.

`src/components/account-navigation.tsx` also calls `auth0.getSession()`. Its signed-in greeting uses `given_name`, falling back to `name`. The account page renders the session user's name, derived initials, and email, with fallback text when claims are unavailable. Orders, membership year, shipping address, and settings remain sample presentation data; they are not retrieved from Auth0 or created by checkout.

**Create Account** links to `/auth/login?screen_hint=signup&returnTo=/account`, requesting the hosted signup screen subject to the tenant's configuration. The legacy `/login` and `/signup` placeholders do not participate in this flow.

**Log Out** links to `/auth/logout`. The SDK clears the local session and redirects through Auth0's logout flow, returning to `APP_BASE_URL` with the setup above. The application does not request federated logout from an upstream identity provider. After logout, the header shows the signed-out links and `/account` requires authentication again.

## Design and assets

Warm ivory, charcoal, and muted olive establish an original Northstar identity. Large editorial photography, restrained rectangular controls, a custom star mark, and generous space keep the focus on apparel. Fonts use a local system stack, avoiding font downloads during builds or demos.

All imagery is original AI-generated demo artwork stored in `public/images`; it does not depend on third-party image hosts, random-image URLs, or real retail logos. A single 4-by-3 catalog contact sheet is displayed through CSS positions, so all 12 product images share one cached asset. Product and campaign representations are illustrative, not real merchandise. See [asset notes and prompts](docs/image-assets.md).

## Quick demo check

1. Open `/`, follow Men/Women or New Arrivals, and try search/sorting.
2. Open a product, select a size, add it, and follow **View your bag**.
3. Change a quantity and reload to confirm the bag persists. Try a second size of the same product.
4. Continue to checkout, fill sample details, switch shipping methods, and place a demo order. Confirm the success message and empty bag count.
5. In a signed-out/private browser session, click **Log In** in the header. Confirm navigation through `/auth/login?returnTo=/account` to Auth0 Universal Login, then authenticate with a test user. The browser's Network panel with Preserve log enabled can show the redirect through `/auth/callback` before reaching `/account`.
6. Confirm the header shows the authenticated name greeting, My Account icon, and Log Out. On `/account`, verify the name/email match the available user claims and that orders, address, membership year, and settings remain sample content. Reload to confirm the session is retained.
7. Click **Log Out**. Confirm the browser returns to `/` and the header shows Log In and Create Account. Then open `/account` directly: it should redirect into the login flow instead of displaying the account page. Complete authentication again and confirm it returns to `/account`.
8. After logging out again, try **Create Account** to check the hosted signup experience if the tenant permits signup. Direct visits to `/login` and `/signup` still show legacy placeholders and do not test the active integration.

The account's historical sample orders remain fixed and are unrelated to demo checkout. Authentication does not turn the mock checkout into a real order or payment service.

## Validation

Run the available static/build checks with the environment configured:

```bash
npm run lint
npm run typecheck
npm run build
```

These checks do not verify the hosted authentication flow. Use the quick demo check above with a configured Auth0 application to validate login, callback, session rendering, account protection, and logout. This README update was reviewed against the source and installed SDK; a live Auth0 browser flow was not run as part of the documentation update.
