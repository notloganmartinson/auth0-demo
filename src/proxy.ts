import { auth0 } from "./lib/auth0"; // give this network layer access to the auth0 client i configured earlier

export async function proxy(request: Request) { // every matching HTTP request coming in next.js can pass thru this function before routing to client page
	return await auth0.middleware(request); // tells Auth0 to inspect/process the request and return the appropriate response
} // auth0 uses this interception layer to automatically support its auth routes and session handling. 

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)", // regex: run the proxy for basically everyhting except the next.js internal static assets and a few public metadata files
	],
};
