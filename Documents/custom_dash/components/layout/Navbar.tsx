// components/layout/Navbar.tsx
"use client"; // Directive to mark this as a Client Component

import Link from 'next/link';
import React from 'react';
import { useSession } from "next-auth/react"; // Import the useSession hook
import { AuthButton } from '@/app/api/auth/AuthButton';

const Navbar: React.FC = () => {
  // Call useSession to get session data and status
  // This hook requires the component to be a Client Component ("use client")
  // and relies on the <SessionProvider> context established in the layout.
  const { data: session, status } = useSession();

  // status can be 'loading', 'authenticated', or 'unauthenticated'
  const isAuthenticated = status === 'authenticated';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="container flex h-14 items-center px-4 sm:px-6 lg:px-8">
        {/* Left Section: Application Title/Logo & Conditional Links */}
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* <span className="text-2xl font-bold">📊</span> */}
            <span className="font-bold text-lg text-foreground">Dashboard Builder</span>
          </Link>

          {/* Main navigation links */}
          <nav className="hidden items-center space-x-4 md:flex">
            {/* Conditionally render the "Dashboards" link */}
            {/* Only show this link if the user is authenticated */}
            {isAuthenticated && (
              <Link
                href="/dashboard" // Link to the main dashboard overview page (we'll create this route later)
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboards
              </Link>
            )}

            {/* Add other potential navigation links here (e.g., Settings) */}
            {/* Example:
            {isAuthenticated && (
              <Link href="/settings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Settings
              </Link>
            )}
            */}
          </nav>
        </div>

        {/* Right Section: Authentication Button */}
        {/* AuthButton handles conditional rendering based on session */}
        <div className="flex items-center space-x-4">
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;