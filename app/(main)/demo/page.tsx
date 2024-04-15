import {
  getDemoForm,
  getFormById,
  resetDemoForm,
} from "@/actions/form-actions";
import { FormBuilder } from "@/components/form-builder";
import React, { useEffect } from "react";

const BuilderIdPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const form = await getDemoForm("661cd9afb3c419ddd45bc4bc");
  if (!form) {
    throw new Error("Form not found");
  }
  return <FormBuilder form={form} />;
};

export default BuilderIdPage;
