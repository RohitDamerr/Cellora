// components/widgets/ChartPlaceholderWidget.tsx
'use client';
import React from 'react';
import { BarChart3, LineChart, PieChart, AreaChart, HelpCircle } from 'lucide-react'; // Icons for chart types
import { ChartWidgetConfig as ChartWidgetConfigType, ChartType as ChartTypeEnum } from '@/lib/types/widget';


// --- Define Expected Configuration Structure ---
type ChartType = 'line' | 'bar' | 'pie' | 'area';

interface ChartWidgetConfig {
  title?: string;
  chartType?: ChartType;
  dataUrl?: string;
}

// --- Define Component Props ---
interface ChartPlaceholderWidgetProps {
  config: ChartWidgetConfig;
}

// Helper function to get an icon based on chart type
function getChartIcon(chartType?: ChartType): React.ReactNode {
  const iconProps = { size: 48, strokeWidth: 1.5, className: "text-muted-foreground/80" };
  switch (chartType) {
    case 'line':
      return <LineChart {...iconProps} />;
    case 'bar':
      return <BarChart3 {...iconProps} />;
    case 'pie':
      return <PieChart {...iconProps} />;
    case 'area':
        return <AreaChart {...iconProps} />;
    default:
      // Return a default or generic icon if type is unknown or not set
      return <HelpCircle {...iconProps} />;
  }
}

/**
 * ChartPlaceholderWidget (Server Component)
 *
 * Displays a placeholder indicating where a chart will be rendered.
 * Shows an icon based on the configured chart type.
 * Designed to be rendered within a WidgetWrapper.
 * Can be refactored or incorporate client components later for actual chart rendering.
 */
export default function ChartPlaceholderWidget({ config }: ChartPlaceholderWidgetProps) {
  // Extract config values
  const chartType = config.chartType || 'unknown'; // Default to 'unknown' if not set
  const displayTitle = config.title || 'Chart'; // Use config title or default

  // --- Placeholder for Future Data Fetching ---
  // Similar to KpiCardWidget, data fetching from config.dataUrl could happen here
  // if the chart needs server-processed data before rendering.
  // Example:
  // let chartData = null;
  // if (config.dataUrl) {
  //   try {
  //     const response = await fetch(config.dataUrl);
  //     if (response.ok) chartData = await response.json();
  //     else console.error("Failed to fetch chart data");
  //   } catch (error) { console.error("Error fetching chart data:", error); }
  // }
  // --- End Placeholder ---

  return (
    <div className="flex flex-col justify-center items-center h-full text-center p-4 bg-muted/30 rounded-md">
      {/* Display the appropriate chart icon */}
      <div className="mb-3">
        {getChartIcon(config.chartType)}
      </div>

      {/* Display placeholder text indicating chart type */}
      <p className="text-sm font-medium text-muted-foreground mb-1">
        {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart Area
      </p>
      <p className="text-xs text-muted-foreground/80">
        ({displayTitle})
      </p>

      {/* Add a note about future implementation */}
      <p className="text-xs text-muted-foreground/60 mt-4 italic">
        Chart rendering will be implemented here.
        {config.dataUrl && ` (Data source: ${config.dataUrl})`}
      </p>

      {/* Example of how chartData could be used later (remove/replace) */}
      {/* {chartData && <pre className="text-xs mt-2 overflow-auto max-h-20">{JSON.stringify(chartData, null, 2)}</pre>} */}
    </div>
  );
}

// No 'use client' directive = Server Component