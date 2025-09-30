// components/dashboard/WidgetConfigModal.tsx
'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose, // Useful for adding explicit close buttons
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { AppWidget, WidgetConfig } from '@/lib/types/widget'; 

interface WidgetConfigModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void; 
    widget: AppWidget | null;
    onSave: (widgetId: string, newConfig: WidgetConfig) => void; 
}
const KpiConfigPlaceholder = ({ config }: { config: WidgetConfig }) => {
    if (config.type !== 'KPI') return null; // Type guard
    return (
        <div className="p-4 border rounded-md bg-muted/30 space-y-2">
            <h4 className="font-semibold">KPI Configuration</h4>
            <p className="text-sm text-muted-foreground">Current Title: {config.title}</p>
            <p className="text-sm text-muted-foreground">Current Data URL: {config.dataUrl || '(Not set)'}</p>
            <p className="text-xs italic">(Actual form inputs will go here)</p>
        </div>
    );
};
const NotesConfigPlaceholder = ({ config }: { config: WidgetConfig }) => {
    if (config.type !== 'Notes') return null; // Type guard
    return (
        <div className="p-4 border rounded-md bg-muted/30 space-y-2">
            <h4 className="font-semibold">Notes Configuration</h4>
            <p className="text-sm text-muted-foreground">Current Title: {config.title}</p>
             {/* Displaying long content might be too much, just acknowledge it */}
            <p className="text-sm text-muted-foreground">Content: (Text area will appear here)</p>
            <p className="text-xs italic">(Actual form inputs will go here)</p>
        </div>
    );
};
const ChartConfigPlaceholder = ({ config }: { config: WidgetConfig }) => {
     if (config.type !== 'Chart') return null; // Type guard
    return (
        <div className="p-4 border rounded-md bg-muted/30 space-y-2">
            <h4 className="font-semibold">Chart Configuration</h4>
            <p className="text-sm text-muted-foreground">Current Title: {config.title}</p>
            <p className="text-sm text-muted-foreground">Current Data URL: {config.dataUrl || '(Not set)'}</p>
            <p className="text-sm text-muted-foreground">Current Chart Type: {config.chartType}</p>
            <p className="text-xs italic">(Actual form inputs will go here)</p>
        </div>
    );
};
const DataTableConfigPlaceholder = ({ config }: { config: WidgetConfig }) => {
     if (config.type !== 'DataTable') return null; // Type guard
    return (
        <div className="p-4 border rounded-md bg-muted/30 space-y-2">
            <h4 className="font-semibold">Data Table Configuration</h4>
            <p className="text-sm text-muted-foreground">Current Title: {config.title}</p>
            <p className="text-sm text-muted-foreground">Current Data URL: {config.dataUrl || '(Not set)'}</p>
            <p className="text-xs italic">(Actual form inputs will go here)</p>
        </div>
    );
};
/**
 * WidgetConfigModal Component (Client Component)
 */
export function WidgetConfigModal({
    isOpen,
    onOpenChange,
    widget, // Receive the widget object
    onSave,
}: WidgetConfigModalProps) {
    const handleSave = () => {
        if (!widget) return; // Should not happen if modal is open with a widget

        console.log(`Save clicked for widget: ${widget.id}. Current config:`, widget.configuration);
        const currentConfig = widget.configuration; 
        onSave(widget.id, currentConfig); 
       // onOpenChange(false); 
    };

    const modalTitle = widget ? `Configure ${widget.configuration?.title || widget.type}` : 'Configure Widget';
    const widgetType = widget?.type;

    const renderConfigForm = () => {
        if (!widget) {
            return <p className="text-muted-foreground">No widget selected.</p>;
        }

        // Use a switch statement on the widget type
        switch (widget.type) {
            case 'KPI':
                // Pass the specific configuration part down
                return <KpiConfigPlaceholder config={widget.configuration} />;
            case 'Notes':
                return <NotesConfigPlaceholder config={widget.configuration} />;
            case 'Chart':
                return <ChartConfigPlaceholder config={widget.configuration} />;
            case 'DataTable':
                return <DataTableConfigPlaceholder config={widget.configuration} />;
            default:
                // Handle unknown or unconfigurable widget types gracefully
                return <p>No specific configuration available for widget type: {widget.type}</p>;
        }
    };
    return (
        // The root Dialog component manages the open state
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {/* DialogTrigger is typically not needed here if controlled externally */}
            {/* <DialogTrigger asChild><Button>Open Dialog</Button></DialogTrigger> */}

            {/* DialogContent renders the actual modal box */}
            <DialogContent
                className="sm:max-w-[425px] md:max-w-[600px]" 
            >
                <DialogHeader>
                    <DialogTitle>{modalTitle}</DialogTitle>
                    <DialogDescription>
                        {widget ? `Modify the settings for your ${widget.type} widget below. Click save when done.` : ''}
                    </DialogDescription>
                </DialogHeader>

               <div className="py-4 space-y-4">
                     {/* Display basic info */}
                     {widget && (
                        <div className="text-xs text-muted-foreground border-b pb-2 mb-4">
                            <span>ID: {widget.id}</span> | <span>Type: {widget.type}</span>
                        </div>
                     )}
                    {/* Call the function to render the correct form */}
                    {renderConfigForm()}
                </div>
                <DialogFooter>
                    {/* Optional: Explicit close button */}
                     <DialogClose asChild>
                       <Button variant="outline">Cancel</Button>
                     </DialogClose>
                    {/* Save button */}
                    <Button
                        type="submit" // Might associate with a form later
                        onClick={handleSave} // Call the save handler
                        disabled={!widget} // Disable if no widget is loaded
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
