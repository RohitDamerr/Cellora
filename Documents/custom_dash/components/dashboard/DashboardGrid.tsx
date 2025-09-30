// components/dashboard/DashboardGrid.tsx
'use client'; // Mark this as a Client Component

import React, { useState, useEffect, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from '@dnd-kit/core';

import {
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';

// Import types (assuming you have centralized types)
import type { AppWidget, WidgetConfig } from '@/lib/types/widget';

// Import the wrapper component
import { WidgetWrapper } from '@/components/widgets/WidgetWrapper';
import  KpiCardWidget from '../widgets/KpiCardWidget';
import { NotesWidget } from '../widgets/NotesWidget';
import  ChartPlaceholderWidget  from '../widgets/ChartPlaceHolderWidget';
import  DataTablePlaceholderWidget  from '../widgets/DataTablePlaceHolderWidget';
import { TestDraggable } from './TestDraggable';
import { WidgetConfigModal } from '@/components/dashboard/WidgetConfigModal';
import { Button } from '@/components/ui/button';
import { WidgetPalette, WidgetTypeId } from '@/components/dashboard/WidgetPallete';
import { PlusCircle } from 'lucide-react';

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

function getDefaultWidgetConfig(type: WidgetTypeId): WidgetConfig {
  switch (type) {
    case 'KPI':
      return { type: 'KPI', title: 'New KPI', value: null, dataUrl: '' };
    case 'Notes':
      // Ensure this matches your NotesWidgetConfig type definition
      return { type: 'Notes', title: 'New Note', content: '' };
    case 'Chart':
      return { type: 'Chart', title: 'New Chart', dataUrl: '', chartType: 'bar' };
    case 'DataTable':
      return { type: 'DataTable', title: 'New Table', dataUrl: '' };
    default:
      // Fallback for unknown types, though TypeScript should help prevent this
      console.warn(`Unknown widget type provided for default config: ${type}`);
      // Return a minimal config, ensuring the 'type' field matches the requested type
      // You might need a more specific base type or throw an error
      return { type: type as WidgetTypeId } as WidgetConfig;
  }
}

export function DashboardGrid({ initialWidgets, dashboardId }: DashboardGridProps) {
  const [widgets, setWidgets] = useState<AppWidget[]>(initialWidgets);
  const widgetIds = useMemo(() => widgets.map((widget) => widget.id), [widgets]);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [configuringWidget, setConfiguringWidget] = useState<AppWidget | null>(null);

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
    if (over && active.id !== over.id) {
      console.log(`Attempting to reorder: Move ${active.id} over ${over.id}`);
      setWidgets((currentWidgets) => {
        const oldIndex = currentWidgets.findIndex((w) => w.id === active.id);
        const newIndex = currentWidgets.findIndex((w) => w.id === over.id);

        if (oldIndex === -1 || newIndex === -1) {
          console.error(`Could not find indices for active (${active.id}) or over (${over.id}). Aborting reorder.`);
          return currentWidgets; // Return current state if indices are invalid
        }
        console.log(`Found indices: oldIndex=${oldIndex}, newIndex=${newIndex}`);

        const reorderedWidgets = arrayMove(currentWidgets, oldIndex, newIndex);
        console.log('New widget order:', reorderedWidgets.map(w => ({ id: w.id, title: w.configuration?.title || w.type })));
        return reorderedWidgets;
      });
      console.log("Local state updated. Persistence to DB needed later.");
    } else {
      if (!over) {
        console.log(`Drag ended outside a valid drop target. No reorder.`);
      } else if (active.id === over.id) {
        console.log(`Item ${active.id} dropped back onto itself. No reorder needed.`);
      } else {
        console.log(`Drag ended without meeting reorder conditions. Active: ${active.id}, Over: ${over?.id}`);
      }
    }
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    // --- This console log is key for verification ---
    console.log('✅ Drag started:', `Active ID: ${active.id}`);
    // ---
  }

  const handleDragOver = (event: any) => {
  }

  const handleSelectWidgetType = (widgetTypeId: WidgetTypeId) => {
    console.log(`Adding widget of type: ${widgetTypeId}`);

    // 1. Generate a unique temporary ID
    const newWidgetId = `temp-${uuidv4()}`;
    console.log(`Generated temporary widget ID: ${newWidgetId}`);
    // Prefix to indicate it's temporary

    // 2. Define default grid properties
    const defaultGridWidth = 4; // Example: 4 columns wide
    const defaultGridHeight = 2; // Example: 2 rows high (adjust based on your auto-rows value)

    // 3. Create the new widget object
    const newWidget: AppWidget = {
      id: newWidgetId,
      type: widgetTypeId,
      // Add default grid position and size
      // These might not be immediately used for rendering placement if just appending,
      // but are needed for the data structure and persistence later.
      // Placing at (0, very large Y) can encourage user to move it.
      gridX: 0,
      gridY: 999, // Assign a high Y value to visually place at the bottom initially
      gridWidth: defaultGridWidth,
      gridHeight: defaultGridHeight,
      // 4. Get the default configuration for this widget type
      configuration: getDefaultWidgetConfig(widgetTypeId),
      dashboardId: dashboardId, // Assuming you have access to the current dashboardId
       createdAt: new Date(),
  updatedAt: new Date(),
    };

    console.log("Creating new widget object:", newWidget);
    setWidgets((prevWidgets) => {
      const updatedWidgets = [...prevWidgets, newWidget];
      console.log("Updated widgets state:", updatedWidgets);
      return updatedWidgets;
    });
  };

  const handleModalOpenChange = (open: boolean) => {
     setIsConfigModalOpen(open);
     if (!open) {
         // Clear the configuring widget when the modal closes
         setConfiguringWidget(null);
     }
    };
  const handleConfigureWidget = (widgetId: string) => {
        console.log(`Request to configure widget with ID: ${widgetId}`);
        const widgetToConfigure = widgets.find(w => w.id === widgetId);

        if (widgetToConfigure) {
            console.log('Found widget to configure:', widgetToConfigure);
            setConfiguringWidget(widgetToConfigure);
            setIsConfigModalOpen(true);
        } else {
            console.error(`Could not find widget with ID ${widgetId} in state.`);
            setConfiguringWidget(null); // Ensure state is reset
            setIsConfigModalOpen(false);
        }
    };
    const handleSaveChanges = (widgetId: string, newConfig: WidgetConfig) => {
        console.log(`Placeholder: Save changes for widget ${widgetId}`, newConfig);
        setIsConfigModalOpen(false);
        setConfiguringWidget(null); 
    };
  // --- End DndContext Event Handlers ---

  return (
    // --- DndContext Setup ---
    <>
      {/* --- Add Widget Button --- */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setIsPaletteOpen(true)} // Set state to true on click
          variant="default" // Or choose another variant
        >
          <PlusCircle className="mr-2 h-4 w-4" /> {/* Optional icon */}
          Add Widget
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd} // Function called when a drag operation ends
      >
        <SortableContext
          items={widgetIds} // Pass the array of widget IDs
          strategy={rectSortingStrategy} // Use the grid sorting strategy
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
            <div className="col-span-3 row-span-1 p-2 border border-dashed border-yellow-500">
              {/* Simple container */}
              <TestDraggable id="test-draggable-1" label="Test Box 1" />
            </div>
            <div className="col-span-3 row-span-1 p-2 border border-dashed border-yellow-500">
              {/* Simple container */}
              <TestDraggable id="test-draggable-2" label="Test Box 2" />
            </div>
            {/* Render the widgets based on the current state */}
            {widgets.length > 0 ? (
              widgets.map((widget) => {
                const SpecificWidgetComponent = getWidgetComponent(widget.type);
                const gridClassName = `col-span-${widget.gridWidth} row-span-${widget.gridHeight}`;

                return (
                  // WidgetWrapper now rendered here inside DndContext
                  <WidgetWrapper
                    key={widget.id}
                    widgetId={widget.id}
                    title={widget.configuration?.title || widget.type}
                    className={gridClassName}
                                                            onConfigure={handleConfigureWidget}

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
        </SortableContext>
      </DndContext>

      <WidgetPalette
        open={isPaletteOpen}
        onOpenChange={setIsPaletteOpen} // Pass the state setter directly
        onSelectWidget={handleSelectWidgetType} // Pass the handler function
      />
      <WidgetConfigModal
                isOpen={isConfigModalOpen}
  onOpenChange={handleModalOpenChange} 
                widget={configuringWidget}
                onSave={handleSaveChanges}
            />
    </>
    // --- End DndContext ---
  );
}
