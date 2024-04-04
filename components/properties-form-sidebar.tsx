import React from "react";
import { useDesigner } from "./hooks/use-designer";
import { FormElements } from "./form-elements";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground/70">Element properties</p>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};
