// components/widgets/WidgetWrapper.tsx
'use client'; // Mark this component as a Client Component

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, GripVertical } from 'lucide-react'; // Icons for settings and drag handle

// Define the props the WidgetWrapper will accept
interface WidgetWrapperProps {
  children: React.ReactNode; // Content of the specific widget type
  widgetId: string;         // Unique ID of the widget instance
  title?: string;           // Optional title to display in the header
  className?: string;       // To pass down grid positioning classes (col-span, row-span)
  // --- Props for dnd-kit (to be added/used in later steps) ---
  attributes?: Record<string, any>;
 listeners?: Record<string, any>;
   style?: React.CSSProperties;
  // --- Props for configuration (to be added/used in later steps) ---
   onConfigure?: (widgetId: string) => void;
}

/**
 * WidgetWrapper Component (Client Component)
 *
 * Provides a consistent container for all dashboard widgets.
 * Includes common elements like a header (with title, drag handle, settings button)
 * and uses ShadCN Card for base styling.
 * Designed to integrate with dnd-kit for drag and drop (props added later).
 */
export function WidgetWrapper({
  children,
  widgetId,
  title = 'Widget', // Default title if none provided
  className = '', // Default to empty string
  // dnd-kit props (unused for now)
   attributes,
   listeners,
   style,
  // Config props (unused for now)
  onConfigure
}: WidgetWrapperProps) {

  // Handler for the settings button click (to be implemented later)
  const handleSettingsClick = () => {
    console.log(`Configure widget: ${widgetId}`);
  
    if (onConfigure) {
      onConfigure(widgetId);
    } else {
        console.warn(`onConfigure handler not provided for widget: ${widgetId}`);
    }
  };

  return (
    // Use ShadCN Card as the base container
    // Apply passed-in className for grid positioning (col-span/row-span)
    // Apply dnd-kit style prop later for drag transformations
    <Card
      className={`flex flex-col h-full ${className}`} // Ensure card takes full height of grid cell, apply layout classes
      style={style} // Apply dnd-kit styles here later
       {...attributes} // Spread dnd-kit attributes here later (for accessibility etc.)
    >
      {/* Card Header: Contains title, drag handle, and settings button */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 px-4 border-b">
        {/* Left side: Optional Drag Handle and Title */}
         <div className="flex items-center gap-2 min-w-0">
          {/* Drag Handle Placeholder (integrates with dnd-kit listeners later) */}
          <div
            className="cursor-grab text-muted-foreground hover:text-foreground flex-shrink-0"
             {...listeners} // Spread dnd-kit listeners here later
            aria-label="Drag widget handle"
          >
            <GripVertical className="h-5 w-5" />
          </div>
          {/* Display the widget title */}
          <CardTitle className="text-base font-medium truncate" title={title}>
            {title}
          </CardTitle>
        </div>

        {/* Right side: Settings Button Placeholder */}
        <div className="flex items-center flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSettingsClick}
            aria-label={`Settings for ${title} widget`}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Card Content: Renders the actual widget content passed as children */}
      {/* 'flex-grow' makes content area fill available vertical space */}
      {/* 'overflow-auto' allows scrolling if content exceeds widget size */}
      <CardContent className="p-4 flex-grow overflow-auto">
        {children}
      </CardContent>

      {/* Card Footer: Optional area for actions or status (can be removed if not needed) */}
      {/*
      <CardFooter className=\"p-2 border-t text-xs text-muted-foreground\">
        Footer Placeholder (ID: {widgetId})
      </CardFooter>
      */}
    </Card>
  );
}