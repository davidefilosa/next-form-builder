"use client";

import { cn } from "@/lib/utils";
import { DesignerSidebar } from "./designer-sidebar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  FormElements,
} from "./form-elements";
import { useState } from "react";
import { useDesigner } from "./hooks/use-designer";
import { idGenerator } from "@/lib/idGenerator";
import { DesignerElementWrapper } from "./designer-element-wrapper";
import { AiButton } from "./ai-button";

export const Designer = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: { isDesignerDropArea: true },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesigerBtnElement;
      const isDroppingOverDesigner = over.data?.current?.isDesignerDropArea;
      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;
      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const isDraggingDesignElement = active.data?.current?.isDesignerElement;
      const draggingDesignElementOverAnotherDesignElement =
        isDroppingOverDesignerElement && isDraggingDesignElement;

      if (isDesignerBtnElement && isDroppingOverDesigner) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(elements.length, newElement);
        return;
      }

      if (isDroppingOverDesignerElement && !isDraggingDesignElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        const overElementIndex = elements.findIndex(
          (el) => el.id === over.data?.current?.elementId
        );

        if (overElementIndex === -1) {
          throw new Error("Element not found");
        }

        let indexForNewElement = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      if (draggingDesignElementOverAnotherDesignElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (overElementIndex === -1 || activeElementIndex === -1) {
          throw new Error("Element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex;

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <div className="flex flex-col gap-4 justify-center items-center absolute top-1/2">
              <AiButton />
              <span className="text-sm text-muted-foreground">or</span>
              <p className="text-sm text-muted-foreground flex flex-grow items-center font-bold">
                Drop an element to create the form manually
              </p>
            </div>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};
