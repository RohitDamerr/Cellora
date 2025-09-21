"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button variant="outline" size="sm" disabled aria-busy="true">
        Loading...
      </Button>
    );
  }

  if (status === "authenticated" && session) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/" })}
        aria-label="Sign out"
      >
        Sign Out
        {session.user?.email && (
          <span className="ml-2 text-xs hidden sm:inline">
            ({session.user.email})
          </span>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => signIn()}
      aria-label="Sign in"
    >
      Sign In
    </Button>
  );
}


