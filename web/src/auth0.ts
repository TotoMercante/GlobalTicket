import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  authorizationParameters: {
    redirect_uri: "http://localhost:3000/api/auth/callback",
    audience: process.env.AUTH0_AUDIENCE,
  },
});
