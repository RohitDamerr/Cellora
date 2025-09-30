'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, GripVertical } from 'lucide-react'; 
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

interface WidgetWrapperProps {
  children: React.ReactNode; 
  widgetId: string;        
  title?: string;          
  className?: string;      
  attributes?: Record<string, any>;
 listeners?: Record<string, any>;
   style?: React.CSSProperties;
   onConfigure?: (widgetId: string) => void;
}
export function WidgetWrapper({
  children,
  widgetId,
  title = 'Widget',
  className = '', 
   attributes,
   listeners,
   style,
  onConfigure
}: WidgetWrapperProps) {

    const {
    attributes: sortableAtrributes,     
    listeners: sortableListeners,      
    setNodeRef,     
    transform,     
    transition,     
    isDragging,     
  } = useSortable({
    id: widgetId
  });

  const dndstyle: React.CSSProperties={
 transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 100 : 'auto',
    //cursor: isDragging ? 'grabbing' : 'grab',
  };

  const handleSettingsClick = () => {
    console.log(`Configure widget: ${widgetId}`);
  
    if (onConfigure) {
            console.log(`Settings clicked for widget: ${widgetId}. Calling onConfigure.`);

      onConfigure(widgetId);
    } else {
        console.warn(`onConfigure handler not provided for widget: ${widgetId}`);
    }
  };

  return (
    <Card
    ref= {setNodeRef}
    style= {{...dndstyle, ...style}}
      className={`flex flex-col h-full touch-none ${className}`} 
       {...sortableAtrributes} 
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 px-4 border-b">\
         <div className="flex items-center gap-2 min-w-0">
          <div
            className="cursor-grab text-muted-foreground hover:text-foreground flex-shrink-0 p-1"
             {...sortableListeners}
            aria-label="Drag widget handle"
          >
            <GripVertical className="h-5 w-5" />
          </div>
          <CardTitle className="text-base font-medium truncate" title={title}>
            {title}
          </CardTitle>
        </div>

        <div className="flex items-center flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSettingsClick}
            aria-label={`Settings for ${title} widget`}
             onPointerDown={(e) => e.stopPropagation()}
          //  onKeyDown={(e) => e.stopPropagation()}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow overflow-auto">
        {children}
      </CardContent>

    </Card>
  );
}