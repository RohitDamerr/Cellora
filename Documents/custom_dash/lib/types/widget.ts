// lib/types/widget.ts

// Define the possible types for your widgets. Match these with the 'type' string stored in the DB.
export type WidgetType = 'KPI' | 'Notes' | 'Chart' | 'DataTable';
// Define the base structure (optional, if common fields exist)
interface BaseWidgetConfig {
  title?: string; // Often handled by Wrapper, but can be part of config
}

// --- Specific Configuration Interfaces ---
export interface KpiWidgetConfig extends BaseWidgetConfig {
  metricValue?: number | string;
  metricLabel?: string;
  prefix?: string;
  suffix?: string;
    value: number | null;  

  dataUrl?: string;
}

export interface NotesWidgetConfig extends BaseWidgetConfig {
  content?: string;
}

export type ChartType = 'line' | 'bar' | 'pie' | 'area';
export interface ChartWidgetConfig extends BaseWidgetConfig {
  chartType?: ChartType;
  dataUrl?: string;
  // Add more chart-specific options: xAxisLabel, yAxisLabel, colorScheme etc.
}

export interface TableColumnConfig {
  key: string;
  header: string;
}
export interface DataTableWidgetConfig extends BaseWidgetConfig {
  columns?: TableColumnConfig[];
  dataUrl?: string;
   // Add more table-specific options: defaultSort, pageSize etc.
}

// --- Discriminated Union for Widget Configuration ---
// This ties the configuration shape to the widget type using the 'type' property.
export type WidgetConfig =
  | ({ type: 'KPI' } & KpiWidgetConfig)
  | ({ type: 'Notes' } & NotesWidgetConfig)
  | ({ type: 'Chart' } & ChartWidgetConfig)
  | ({ type: 'DataTable' } & DataTableWidgetConfig);

// --- Extending Prisma Type for Application Use ---
// Often useful to have a type representing the widget data fetched from Prisma,
// but with the 'configuration' field strongly typed using our discriminated union.
import { Widget as PrismaWidget } from '@prisma/client'; // Import the generated Prisma type

export interface AppWidget extends Omit<PrismaWidget, 'configuration'> {
  // Override the 'configuration' field type from Prisma's default 'JsonValue'
  // This assumes you fetch 'type' along with 'configuration'
  configuration: WidgetConfig & { type: WidgetType }; // Ensure 'type' is present
}

// You might refine AppWidget further based on exactly what you fetch
// e.g., ensure required fields from PrismaWidget are present.