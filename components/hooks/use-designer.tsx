"use client";

import React, { useContext } from "react";
import { DesignerContext } from "../context/designer-context";

export const useDesigner = () => {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("useDesigner must be used inside a DesignerContext");
  }

  return context;
};
