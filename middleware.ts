// middleware.ts
import { withAuth } from "next-auth/middleware"; // Import the NextAuth middleware helper
import { NextResponse } from "next/server"; // Import NextResponse for potential customizations

export default withAuth(
  function middleware(req) {

    return NextResponse.next(); // Allow the request to proceed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        return !!token;
      },
    },

  }
);

export const config = {

  matcher: [
    "/dashboard/:path*",
  ],
};
