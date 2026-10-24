import { Auth0Client } from "@auth0/nextjs-auth0/server"; // brings server-side auth0 client class into this file

export const auth0 = new Auth0Client({
	httpTimeout: 10000,
}); 
// creates one configured Auth0 client and make it available to rest of the application. constructor automatically reads env vars

// want one shared object that differnt server side parsts of app can import. this file is apps central connection to the Auth0 SDK

