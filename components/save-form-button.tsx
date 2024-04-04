"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader, Save } from "lucide-react";
import { useDesigner } from "./hooks/use-designer";
import { updateFormContent } from "@/actions/form-actions";
import { toast } from "./ui/use-toast";

export const SaveFormButton = ({ id }: { id: string }) => {
  const [loading, startTransition] = useTransition();
  const { elements } = useDesigner();

  const onUpdateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await updateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(onUpdateFormContent);
      }}
    >
      <Save className="h-4 w-4" />
      Save
      {loading && <Loader className="animate-spin" />}
    </Button>
  );
};
