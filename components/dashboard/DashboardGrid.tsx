// components/dashboard/DashboardGrid.tsx
'use client'; // Mark this as a Client Component

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from '@dnd-kit/core';
// Import types (assuming you have centralized types)
import type { AppWidget, WidgetConfig } from '@/lib/types/widget';

// Import the wrapper component
import { WidgetWrapper } from '@/components/widgets/WidgetWrapper';
import { KpiCardWidget } from '../widgets/KpiCardWidget';
import { NotesWidget } from '../widgets/NotesWidget';
import { ChartPlaceholderWidget } from '../widgets/ChartPlaceHolderWidget';
import { DataTablePlaceholderWidget } from '../widgets/DataTablePlaceHolderWidget';

import { TestDraggable } from './TestDraggable';

interface DashboardGridProps {
  initialWidgets: AppWidget[]; // The list of widgets fetched by the Server Component
  dashboardId: string;
}

function getWidgetComponent(widgetType: string) {
  switch (widgetType) {
    case 'KPI': return KpiCardWidget;
    case 'Notes': return NotesWidget;
    case 'Chart': return ChartPlaceholderWidget;
    case 'DataTable': return DataTablePlaceholderWidget;
    default: return () => <div>Unknown Widget Type: {widgetType}</div>;
  }
}

const handleNotesConfigChange = (widgetId: string, newConfig: any) => { // Use specific type later
    console.log("Notes config changed (placeholder):", widgetId, newConfig);
};
export function DashboardGrid({ initialWidgets, dashboardId }: DashboardGridProps) {
  const [widgets, setWidgets] = useState<AppWidget[]>(initialWidgets);
  useEffect(() => {
    setWidgets(initialWidgets);
  }, [initialWidgets]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // User must drag for 10px before dragging starts
        // delay: 250, // Or require pointer down for 250ms
        // tolerance: 5, // Or allow 5px tolerance on delay
      },
    }),
    useSensor(KeyboardSensor, {
    })
  );
  // --- End Sensor Configuration ---

    const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // --- This console log is key for verification ---
    console.log('✅ Drag ended:', `Active ID: ${active.id}`, `Over ID: ${over?.id}`);
    // ---
  };

  const handleDragStart = (event: any) => {
      const { active } = event;
      // --- This console log is key for verification ---
      console.log('✅ Drag started:', `Active ID: ${active.id}`);
      // ---
  }

  const handleDragOver = (event: any) => {
  }
  // --- End DndContext Event Handlers ---

  return (
    // --- DndContext Setup ---
    
    // This provider wraps the entire draggable area.
    <DndContext
    sensors = {sensors}
    collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} // Function called when a drag operation ends
    >
      {/* The actual CSS Grid container (same as defined in the page previously) */}
      <div
        className="
          grid
          grid-cols-12    /* 12-column grid */
          gap-4          /* Gap between widgets */
          auto-rows-min  /* Rows size based on content */
          min-h-[600px]  /* Ensure area has height */
          rounded-lg
          border
          p-4
          bg-muted/20
        "
      >
        <div className="col-span-3 row-span-1 p-2 border border-dashed border-yellow-500"> {/* Simple container */}
          <TestDraggable id="test-draggable-1" label="Test Box 1"/>
        </div>
         <div className="col-span-3 row-span-1 p-2 border border-dashed border-yellow-500"> {/* Simple container */}
          <TestDraggable id="test-draggable-2" label="Test Box 2"/>
        </div>
        {/* Render the widgets based on the current state */ }
        {widgets.length > 0 ? (
           widgets.map((widget) => {
             const SpecificWidgetComponent = getWidgetComponent(widget.type);
             // TODO: Refine grid class logic based on actual grid properties (x, y, w, h)
             const gridClassName = `col-start-${widget.gridX + 1} col-span-${widget.gridWidth} row-start-${widget.gridY + 1} row-span-${widget.gridHeight}`; // Example

             return (
                // WidgetWrapper now rendered here inside DndContext
               <WidgetWrapper
                 key={widget.id}
                 widgetId={widget.id}
                 title={widget.configuration?.title || widget.type}
                 className={gridClassName}
                 // Pass dnd-kit props from useSortable hook later
                 // Pass interaction handlers later (onConfigure, onDelete)
               >
                 <SpecificWidgetComponent
                   widgetId={widget.id}
                   config={widget.configuration}
                   // Conditionally pass necessary handlers like onConfigChange
                   {...(widget.type === 'Notes' && { onConfigChange: handleNotesConfigChange })}
                 />
               </WidgetWrapper>
             );
           })
         ) : (
            // Placeholder if no widgets exist
            <div className="col-span-12 row-start-1 flex items-center justify-center h-full min-h-[200px]">
               <p className="text-muted-foreground text-center">
                    Dashboard is empty. Add widgets using the palette. (Palette to be implemented later)
                </p>
            </div>
         )}
      </div> {/* End of CSS Grid container */}

      {/* TODO: Add DragOverlay later for smoother visual dragging */}

    </DndContext> // --- End DndContext ---
  );
}
