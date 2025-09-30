// actions/dashboard.ts
'use server'; // Directive to mark all exported functions in this file as Server Actions

import { prisma } from '@/lib/prisma'; // Import your singleton Prisma client
import { authOptions } from '@/lib/auth'; // Import your NextAuth options
import { getServerSession } from 'next-auth/next'; // Helper to get session server-side
import { revalidatePath } from 'next/cache'; // Function to revalidate cached paths
import { redirect } from 'next/navigation'; 
interface ActionResult {
  success: boolean;
  dashboardId?: string; 
  error?: string; 
}

/**
 * Server Action: createDashboardAction
 *
 * Creates a new dashboard record in the database for the currently authenticated user.
 * @returns {Promise<ActionResult>} Object indicating success or failure, and potentially the new dashboard ID.
 */
export async function createDashboardAction(): Promise<ActionResult> {
  // 1. Get the current user's session
  const session = await getServerSession(authOptions);

  // 2. Verify authentication
  if (!session?.user?.id) {
    // This should ideally not happen if middleware is effective, but double-check
    console.error('Authentication required: No user session found.');
    return { success: false, error: 'Authentication required.' };
  }
  const userId = session.user.id;
  const defaultDashboardName = 'My New Dashboard';

  // 4. Use Prisma to create the new dashboard entry
  try {
    const newDashboard = await prisma.dashboard.create({
      data: {
        name: defaultDashboardName,
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    console.log(`Dashboard created successfully for user ${userId} with ID: ${newDashboard.id}`);
    revalidatePath('/dashboard');

    // 6. Return success status and the new dashboard ID
    return { success: true, dashboardId: newDashboard.id };

  } catch (error) {
    console.error('Failed to create dashboard:', error);
    // Return an error status
    return { success: false, error: 'Failed to create dashboard. Please try again.' };
  }
}
