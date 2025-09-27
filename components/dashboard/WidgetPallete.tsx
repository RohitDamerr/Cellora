// components/dashboard/WidgetPalette.tsx
'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { BarChartBig, StickyNote, Hash, Table } from 'lucide-react'; 

const availableWidgets = [
  {
    id: 'KPI', 
    name: 'KPI Card',
    description: 'Display a key performance indicator value.',
    icon: Hash,
  },
  {
    id: 'Notes',
    name: 'Notes',
    description: 'A simple text area for quick notes.',
    icon: StickyNote,
  },
  {
    id: 'Chart',
    name: 'Chart Placeholder',
    description: 'Display data visually (placeholder).',
    icon: BarChartBig,
  },
  {
    id: 'DataTable',
    name: 'Data Table Placeholder',
    description: 'Display tabular data (placeholder).',
    icon: Table,
  },
];
export type WidgetTypeId = typeof availableWidgets[number]['id']; 
interface WidgetPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectWidget: (widgetTypeId: WidgetTypeId) => void; 
}
export function WidgetPalette({
  open,
  onOpenChange,
  onSelectWidget // Receive the callback prop
}: WidgetPaletteProps) {

  // Handler when a widget type button is clicked
  const handleSelect = (widgetTypeId: WidgetTypeId) => {
    console.log(`Selected widget type: ${widgetTypeId}`);
    onSelectWidget(widgetTypeId); // Call the passed-in handler function
    // Optional: Close the sheet automatically after selection
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[350px] sm:w-[450px] flex flex-col">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Add Widget</SheetTitle>
          <SheetDescription>
            Select a widget type from the list below to add it to your dashboard.
          </SheetDescription>
        </SheetHeader>

        {/* Main content area - Render the list of widgets */}
        <div className="flex-grow p-6 space-y-4 overflow-y-auto">
          {availableWidgets.map((widget) => {
            // Dynamically render the icon if provided
            const IconComponent = widget.icon;
            return (
              // Use a Button for each widget type for clear click interaction
              <Button
                key={widget.id}
                variant="outline" // Use outline style for list items
                className="w-full h-auto justify-start text-left p-4" // Adjust styling for list appearance
                onClick={() => handleSelect(widget.id)} // Call handler on click
              >
                <div className="flex items-center gap-4">
                  {/* Render icon if available */}
                  {IconComponent && <IconComponent className="h-6 w-6 text-muted-foreground flex-shrink-0" />}
                  <div className="flex flex-col">
                    <span className="font-medium">{widget.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {widget.description}
                    </span>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        <SheetFooter className="px-6 pb-6 border-t pt-4">
           {/* Use SheetClose to provide an explicit close button */}
           <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}