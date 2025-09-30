// app/(protected)/dashboard/page.tsx

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"; // Import the Prisma client instance
import type { Dashboard } from "@prisma/client"; // ✅ Import Prisma-generated type
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateDashboardButton } from '@/components/dashboard/CreateDashboardButton';

// ShadCN components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, PlusCircle } from "lucide-react";



export default async function DashboardOverviewPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    console.warn(
      "No session or user ID found on protected dashboard page, redirecting."
    );
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  const userId = session.user.id;


  // --- Database Fetch ---
  let userDashboards: Dashboard[] = [];
  try {
    userDashboards = await prisma.dashboard.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch dashboards:", error);
  }
  // --- End Database Fetch ---

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Your Dashboards
          </h1>
          <p className="text-muted-foreground">
            Welcome, {session.user.name || session.user.email}! View or create
            dashboards below.
          </p>
        </div>
        <div>
         

         <CreateDashboardButton />
        </div>
      </div>

      {/* Dashboard List Area */}
      <div>
        {userDashboards.length === 0 ? (
          <div className="border border-dashed rounded-lg p-8 text-center mt-4">
            <p className="text-muted-foreground">
              You haven't created any dashboards yet.
            </p>
            <CreateDashboardButton />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {userDashboards.map((dashboard) => (
              <Card key={dashboard.id}>
                <CardHeader>
                  <CardTitle className="truncate">{dashboard.name}</CardTitle>
                  <CardDescription>
                    Created:{" "}
                    {new Date(dashboard.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    No preview available.
                  </p>
                
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/dashboard/${dashboard.id}`}
                    className="flex items-center text-sm text-primary hover:underline"
                  >
                    View Dashboard
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
