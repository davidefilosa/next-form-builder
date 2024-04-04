import React, { useState } from "react";
import {
  FormElement,
  FormElementInstance,
  FormElements,
} from "./form-elements";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useDesigner } from "./hooks/use-designer";

export const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });
  const dragabble = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  console.log(selectedElement);

  if (dragabble.isDragging) return null;
  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={dragabble.setNodeRef}
      {...dragabble.listeners}
      {...dragabble.attributes}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      className="relative h-[120px] flex flex-col text-foreground cursor-pointer rounded-md ring-1 ring-accent ring-inset"
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-b-md bottom-0"
      ></div>

      {mouseIsOver && (
        <>
          <div className="absolute h-full right-0">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
              variant={"outline"}
              className="z-10 h-full flex justify-center items-center border rounded-md rounded-l-none bg-red-500"
            >
              <Trash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 left-0 w-full h-[7px] bg-foreground rounded-md rounded-b-none" />
      )}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 left-0 w-full h-[7px] bg-foreground rounded-md rounded-t-none" />
      )}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
};
