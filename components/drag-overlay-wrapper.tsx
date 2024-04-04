import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarBtnElementDragOverlay } from "./sidebar-btn-element";
import { ElementsType, FormElements } from "./form-elements";
import { useDesigner } from "./hooks/use-designer";

export const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesigner();
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  if (!draggedItem) return null;
  let node = <div>No drag overlay</div>;
  const isSidebarBtnElement = draggedItem.data?.current?.isDesigerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) {
      node = <div>Element not found</div>;
    } else {
      const DesignerEelementComponent =
        FormElements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent rounded-md h-[120px] w-full py-2 px-4 opacity-60 pointer-events-none">
          <DesignerEelementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};
