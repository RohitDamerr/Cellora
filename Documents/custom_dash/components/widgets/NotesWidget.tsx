// components/widgets/NotesWidget.tsx
'use client'; // Mark this as a Client Component

import React, { useState, useEffect, useCallback } from 'react';
import { Textarea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/button'; 
import { NotesWidgetConfig as WidgetConfig } from '@/lib/types/widget';
// Optional: For an explicit save button
//import { useDebounce } from 'react-use'; // Example for debouncing auto-save

// --- Define Expected Configuration Structure ---
interface NotesWidgetConfig {
  content?: string;
}

// --- Define Component Props ---
interface NotesWidgetProps {
  config: NotesWidgetConfig;
  widgetId: string;
  // Placeholder for saving mechanism (will be implemented properly later)
  onConfigChange?: (widgetId: string, newConfig: NotesWidgetConfig) => void;
}

/**
 * NotesWidget (Client Component)
 *
 * Allows users to input and view simple text notes.
 * Uses internal state to manage the textarea content.
 * Designed to be rendered within a WidgetWrapper.
 */
export function NotesWidget({ config, widgetId, onConfigChange }: NotesWidgetProps) {
  // --- State Management ---
  // useState hook to manage the current text content in the textarea.
  // Initialize the state with the content passed via the config prop, or empty string.
  const [noteContent, setNoteContent] = useState<string>(config.content || '');

  // --- Effect for Prop Updates (Optional but good practice) ---
  // If the config prop could somehow change *after* initial render due to parent state changes
  // (less common when data is fetched server-side initially), this ensures the state reflects it.
  useEffect(() => {
    setNoteContent(config.content || '');
  }, [config.content]);

  // --- Saving Logic Placeholder ---
  // TODO: Implement robust saving mechanism in later steps (Persistence Layer)
  // Option 1: Explicit Save Button
  const handleSave = () => {
    console.log(`Saving notes for widget ${widgetId}:`, noteContent);
    if (onConfigChange) {
      onConfigChange(widgetId, { ...config, content: noteContent });
    }
    // Indicate save status (e.g., show a temporary message or checkmark)
  }; 

   //Option 2: Auto-save with Debouncing (more complex)
 /* const [,] = useDebounce(
    () => {
      if (noteContent !== config.content && onConfigChange) {
        console.log(`Auto-saving notes for widget ${widgetId}:`, noteContent);
        onConfigChange(widgetId, { ...config, content: noteContent });
      }
    },
    1500, // Debounce delay in ms (e.g., 1.5 seconds)
   [noteContent, config.content, widgetId, onConfigChange]
  ); */

  // Handler for textarea changes
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
   const newContent = event.target.value;
    setNoteContent(newContent);
onConfigChange?.(widgetId, { ...config, content: newContent });
  
  };

  return (
    <div className="flex flex-col h-full">
      {/* ShadCN Textarea for note input */}
      <Textarea
        placeholder="Type your notes here..."
        value={noteContent}
        onChange={handleContentChange}
        className="flex-grow resize-none border rounded-md p-2 text-sm" // flex-grow makes it fill space, resize-none common for notes
        aria-label="Note content"
      />
      {/* Optional: Add an explicit save button */}
      {/*
      <div className="mt-2 flex justify-end">
        <Button size="sm" onClick={handleSave}>
          Save Note
        </Button>
      </div>
      */}
    </div>
  );
}