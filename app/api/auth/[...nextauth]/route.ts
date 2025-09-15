// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
// Import your authentication options from a separate configuration file
// We will create and populate this file in the next step!
import { authOptions } from "@/lib/auth"; // Adjust the path if necessary

/**
 * Initializes NextAuth.js with the defined authentication options.
 * NextAuth() returns a handler function that can process incoming HTTP requests.
 *
 * We export handlers for GET and POST requests. NextAuth.js internally maps
 * different authentication actions (like signin, signout, callback, session)
 * to these HTTP methods based on the request path matched by the catch-all route.
 * For example:
 * - GET /api/auth/signin might return a sign-in page.
 * - POST /api/auth/signin/credentials would handle a form submission.
 * - GET /api/auth/callback/google handles the redirect from Google after login.
 * - GET /api/auth/session retrieves the current session status.
 * - POST /api/auth/signout initiates the sign-out process.
 */
const handler = NextAuth(authOptions);

// Export the handlers for GET and POST requests.
// These handlers will be invoked by Next.js when requests hit /api/auth/*
export { handler as GET, handler as POST };
