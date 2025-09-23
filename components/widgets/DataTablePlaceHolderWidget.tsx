// components/widgets/DataTablePlaceholderWidget.tsx

import React from 'react';
import { Table2 } from 'lucide-react'; // Icon for data table
import { DataTableWidgetConfig as DataTableWidgetConfigType, TableColumnConfig as TableColumnConfigType } from '@/lib/types/widget';

// --- Define Expected Configuration Structure ---
interface TableColumnConfig {
  key: string;
  header: string;
}

interface DataTableWidgetConfig {
  title?: string;
  dataUrl?: string;
  columns?: TableColumnConfig[];
}

// --- Define Component Props ---
interface DataTablePlaceholderWidgetProps {
  config: DataTableWidgetConfig;
}

/**
 * DataTablePlaceholderWidget (Server Component)
 *
 * Displays a placeholder indicating where a data table will be rendered.
 * Shows a basic table structure or icon based on configuration.
 * Designed to be rendered within a WidgetWrapper.
 * Can be enhanced later with actual data rendering and client-side features.
 */
export async function DataTablePlaceholderWidget({
  config,
}: DataTablePlaceholderWidgetProps) {
  // Extract config values
  const columns = config.columns || []; // Default to empty array if not set
  const displayTitle = config.title || 'Data Table'; // Use config title or default

  // --- Placeholder for Future Data Fetching ---
  // Data for the table could be fetched here from config.dataUrl
  // Example:
  // let tableData = [];
  // if (config.dataUrl) {
  //   try {
  //     const response = await fetch(config.dataUrl);
  //     if (response.ok) tableData = await response.json(); // Assuming API returns an array of objects
  //     else console.error("Failed to fetch table data");
  //   } catch (error) { console.error("Error fetching table data:", error); }
  // }
  // --- End Placeholder ---

  return (
    <div className="flex flex-col justify-center items-center h-full text-center p-4 bg-muted/30 rounded-md overflow-hidden">
      {/* Icon and Title */}
      <div className="mb-3 flex flex-col items-center">
        <Table2
          size={40}
          strokeWidth={1.5}
          className="text-muted-foreground/80 mb-2"
        />
        <p className="text-sm font-medium text-muted-foreground">
          Data Table Area
        </p>
        <p className="text-xs text-muted-foreground/80">({displayTitle})</p>
      </div>

      {/* Simple visual representation of a table structure */}
      <div className="w-full max-w-xs border border-dashed border-muted-foreground/30 rounded p-2 mt-2 text-left text-xs">
        <div className="flex border-b border-dashed border-muted-foreground/30 pb-1 mb-1 font-medium text-muted-foreground">
          {columns.length > 0 ? (
            columns.slice(0,3).map((col) => (
              <div key={col.key} className="flex-1 px-1 truncate">
                {col.header}
              </div>
            ))
          ) : (
            <div className="flex-1 px-1 text-muted-foreground/70 italic">
              Column 1
            </div>
          )}
          {(columns.length > 3 || columns.length === 0) && (
            <div className="flex-1 px-1 text-muted-foreground/70 italic">
              ...
            </div>
          )}
        </div>
        <div className="flex text-muted-foreground/60">
          {columns.length > 0 ? (
            columns.slice(0.3).map((col) => (
              <div key={col.key} className="flex-1 px-1 truncate italic">
                data...
              </div>
            ))
          ) : (
            <div className="flex-1 px-1 italic">data...</div>
          )}
          {(columns.length > 3 || columns.length === 0) && (
            <div className="flex-1 px-1 italic">...</div>
          )}
        </div>
        <div className="flex text-muted-foreground/40">
          {/* Placeholder for more rows */}
          ...
        </div>
      </div>

      {/* Note about future implementation */}
      <p className="text-xs text-muted-foreground/60 mt-4 italic">
        Table rendering with data will be implemented here.
        {config.dataUrl && ` (Data source: ${config.dataUrl})`}
      </p>
    </div>
  );
}

// No 'use client' directive = Server Component
