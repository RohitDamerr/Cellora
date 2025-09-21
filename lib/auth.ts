// lib/auth.ts
import type { NextAuthOptions, User, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend next-auth Session type to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// Define the authentication options object
export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        // --- TEMPORARY TESTING AUTH LOGIC ---
        // TODO: Replace this with actual database user lookup and password validation using Prisma and bcrypt
        if (!credentials?.email || !credentials?.password) {
          console.error("Credentials missing");
          return null;
        }

        if (credentials.email === "test@example.com" && credentials.password === "password") {
          console.log("Authorize successful for test user");
          // Return the user object required by NextAuth.js
          const user: User = {
            id: "test-user-id-123",
            name: "Test User",
            email: "test@example.com",
          };
          return user;
        } else {
          console.warn("Authorize failed for:", credentials.email);
          // Return null if user data could not be retrieved
          return null;
        }
        // --- END TEMPORARY LOGIC ---
      }
    })
    // Add other providers like Google, GitHub here later
  ],

  // Secret for JWT signing/encryption - MUST be set in .env
  secret: process.env.NEXTAUTH_SECRET,
  // Check if NEXTAUTH_SECRET is set, throw an error if not (especially important for build/production)
  // if (!process.env.NEXTAUTH_SECRET) {
  //   throw new Error("FATAL ERROR: NEXTAUTH_SECRET environment variable is not set.");
  // }

  // Session management strategy
  session: {
    // Use JSON Web Tokens for session management (stateless)
    strategy: "jwt",
    // Optional: Set session duration (default is 30 days)
    // maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },

  // Optional: Specify custom pages for authentication flow
  // pages: {
  //   signIn: '/login', // Redirect users to /login page for sign-in
  //   error: '/auth/error', // Redirect users to a custom error page
  // },

  // Optional: Callbacks allow customizing default behavior
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string; // Add user ID to session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Standard property for user ID in JWT
      }
      return token;
    },
  },
};
