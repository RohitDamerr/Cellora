// components/dashboard/CreateDashboardButton.tsx
'use client'; // Mark this as a Client Component

import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react'; // Import Loader2 for pending state
import { createDashboardAction } from '@/actions/dashboard'; 
import { useRouter } from 'next/navigation'; 

export function CreateDashboardButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter(); // Get the router instance

  const handleClick = () => {
    startTransition(async () => {
      // Call the Server Action
      const result = await createDashboardAction();

      if (result.success && result.dashboardId) {
        // Action succeeded!
        console.log('Dashboard created, ID:', result.dashboardId);
        router.push(`/dashboard/${result.dashboardId}`);
      } else {
        console.error('Failed to create dashboard:', result.error);
        alert(`Error: ${result.error || 'Could not create dashboard.'}`);
      }
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      aria-disabled={isPending} 
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PlusCircle className="mr-2 h-4 w-4" />
      )}
      {isPending ? 'Creating...' : 'Create New Dashboard'}
    </Button>
  );
}