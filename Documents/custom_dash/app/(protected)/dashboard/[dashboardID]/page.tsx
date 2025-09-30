// app/(protected)/dashboard/[dashboardId]/page.tsx

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import type { AppWidget, WidgetConfig, WidgetType } from "@/lib/types/widget";


interface SpecificDashboardPageProps {
  params: {
    dashboardId: string;
  };
}

export default async function SpecificDashboardPage({
  params,
}: SpecificDashboardPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.warn(
      "No session found on specific dashboard page, redirecting."
    );
    redirect(`/api/auth/signin?callbackUrl=/dashboard/${params.dashboardId}`);
  }

  const userId = session.user.id;
  const dashboardId = params.dashboardId;

  // Fetch the specific dashboard data using Prisma
  // Fetch the specific dashboard data using Prisma
  const dashboard = await prisma.dashboard.findFirst({
    where: {
      id: dashboardId,
      userId: userId, // ✅ valid with findFirst
    },
    include: {
      widgets: {
        orderBy: [{ gridY: "asc" }, { gridX: "asc" }],
      },
    },
  });

   if (!dashboard) {
    notFound(); // Render the Next.js 404 page
  }

  // --- Prepare Widget Data for Client Component ---
  // Map Prisma data to ensure configuration is correctly typed (or validated)
   const initialWidgets: AppWidget[] = dashboard.widgets.map(w => {
     // Basic validation/casting - enhance as needed
     let configuration: WidgetConfig;
     try {
        // Assuming configuration is stored as JSON and includes the 'type' field
        // Adjust parsing/validation based on your actual data structure
       const parsedConfig = w.configuration as any; // Cast from JsonValue
       configuration = {
         type: w.type as WidgetType, // Ensure type matches defined types
         ...parsedConfig // Spread the rest of the config properties
       } as WidgetConfig; // Assert the final type

       // Add validation logic here if needed (e.g., using Zod)

     } catch (error) {
       console.error(`Error parsing configuration for widget ${w.id}:`, error);
       // Provide a default/error state config
       configuration = { type: w.type as WidgetType }; // Minimal fallback
     }

     return {
       ...w, // Spread other Prisma fields (id, gridX, gridY, etc.)
       configuration: configuration, // Use the typed configuration
     };
   });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {dashboard.name}
        </h1>
        <p className="text-muted-foreground">
          Arrange and configure your widgets below. Drag and drop is enabled.
         
          
        </p>
      </div>
<DashboardGrid
          initialWidgets={initialWidgets}
          dashboardId={dashboardId}
      />
      {/* Main Dashboard Grid Area */}
      <div className="border border-dashed rounded-lg p-16 text-center min-h-[400px]">
        {dashboard.widgets.length > 0 ? (
          <p className="text-muted-foreground">
            Widgets will be displayed here.
          </p>
        ) : (
          <p className="text-muted-foreground">No widgets added yet.</p>
        )}
      </div>

      {/* Debugging Info (optional, remove later) */}
      {/*
      <div className="mt-4 p-2 bg-muted rounded text-xs">
        <p>Current User ID: {userId}</p>
        <p>Viewing Dashboard ID: {dashboardId}</p>
        <pre>{JSON.stringify(dashboard, null, 2)}</pre>
      </div>
      */}
    </div>
  );
}
