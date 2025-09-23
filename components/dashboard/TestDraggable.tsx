// components/dashboard/TestDraggable.tsx
'use client'; // This component needs hooks and interacts with the DOM

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'; // Utility for easy transform CSS

// Props for the test component, accepting a unique ID
interface TestDraggableProps {
  id: string;
  label?: string; // Optional label for the box
}

/**
 * TestDraggable Component (Client Component)
 *
 * A very basic component that uses `useDraggable` to test
 * the DndContext setup.
 */
export function TestDraggable({ id, label = 'Drag Me' }: TestDraggableProps) {
  // Use the useDraggable hook, passing the unique ID
  const {
    attributes, // ARIA attributes
    listeners,  // Event listeners for starting drag (pointer, keyboard)
    setNodeRef, // Ref callback for the DOM node
    transform,  // {x, y} transform values during drag
    isDragging, // Boolean indicating if this item is being dragged
  } = useDraggable({
    id: id, // Unique identifier for this draggable item
    // data: { /* You can attach custom data here if needed */ }
  });

  // Create the style object for CSS transform
  // CSS.Transform.toString simplifies applying the transform object
  const style = transform ? {
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 100 : 'auto', // Bring to front while dragging
    cursor: 'grab',                    // Indicate draggability
  } : {
    cursor: 'grab',                    // Indicate draggability even when not transforming
  };

  // Add visual feedback when dragging
  const draggingClasses = isDragging ? 'opacity-75 shadow-lg scale-105' : 'shadow';

  return (
    // Attach the ref, listeners, attributes, and style to the main element
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} // Attach listeners to the whole div to make it draggable
      className={`bg-blue-500 text-white p-4 rounded-md h-24 w-32 flex items-center justify-center transition-all ${draggingClasses}`}
      aria-label={`${label} draggable item`} // More specific label for accessibility
    >
      {label} (ID: {id}) {isDragging ? '(Dragging)' : ''}
    </div>
  );
}