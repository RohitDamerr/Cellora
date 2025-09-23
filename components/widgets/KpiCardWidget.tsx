// components/widgets/KpiCardWidget.tsx

import React from 'react';
// Import the specific configuration type if you defined it
// For example, if you have lib/types/widget.ts
import { KpiWidgetConfig as KpiConfig } from '@/lib/types/widget';
// Let's assume the configuration object for this widget looks like this.
// In a real scenario, this interface might live in a shared types file (e.g., lib/types/widget.ts)
// and would be used when saving/fetching the widget's 'configuration' JSON field.
interface KpiWidgetConfig {
  metricValue?: number | string; // The main value to display
  metricLabel?: string;         // A label or description for the metric (e.g., "Total Sales")
  prefix?: string;              // e.g., "$"
  suffix?: string;              // e.g., "%"
  dataUrl?: string;             // URL to fetch data from (for future enhancement)
  // Add other potential config fields: trend, comparisonValue, etc.
}

// --- Define Component Props ---
interface KpiCardWidgetProps {
  // The component receives the specific configuration for this widget instance
  // This comes from the 'configuration' field of the Widget model in your database.
  config: KpiWidgetConfig;
  widgetId?: string;
}

/**
 * KpiCardWidget (Server Component)
 *
 * Displays a single Key Performance Indicator (KPI).
 * Designed to be rendered within a WidgetWrapper.
 * It's a Server Component, allowing for potential server-side data fetching later.
 */
export async function KpiCardWidget({ config }: KpiCardWidgetProps) {

  // --- Placeholder for Future Data Fetching ---
  // If config.dataUrl is provided, you could fetch data here:
  let fetchedValue = config.metricValue; // Use config value as default/placeholder
  // if (config.dataUrl) {
  //   try {
  //     const response = await fetch(config.dataUrl, { next: { revalidate: 3600 } }); // Example fetch with revalidation
  //     if (response.ok) {
  //       const data = await response.json();
  //       // Assuming the API returns data in a specific format, e.g., { value: 123.45 }
  //       fetchedValue = data.value;
  //     } else {
  //       console.error(`Failed to fetch KPI data from ${config.dataUrl}: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error(`Error fetching KPI data from ${config.dataUrl}:`, error);
  //     // Handle error state - maybe display N/A or keep placeholder
  //   }
  // }
  // --- End Placeholder ---

  // Extract values from config with defaults for display
  const displayValue = fetchedValue ?? 'N/A'; // Use fetched or configured value, default to 'N/A'
  const label = config.metricLabel || 'Metric Label'; // Default label
  const prefix = config.prefix || '';
  const suffix = config.suffix || '';

  return (
    <div className="flex flex-col justify-center items-center h-full text-center p-2">
      {/* Display the main metric value */}
      <div className="text-4xl font-bold tracking-tight mb-1">
        {prefix}{typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}{suffix}
      </div>

      {/* Display the label/description */}
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      {/* Optional: Placeholder for trend indicator or comparison */}
      {/*
      <div className="text-xs text-green-600 mt-2">
        +5.2% vs last month
      </div>
      */}
    </div>
  );
}

// Note: No 'use client' directive means this is a Server Component by default.