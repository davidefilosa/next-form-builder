import {
  getDemoForm,
  getFormById,
  resetDemoForm,
} from "@/actions/form-actions";
import { FormBuilder } from "@/components/form-builder";
import React, { useEffect } from "react";

const BuilderIdPage = async ({ params }: { params: { id: string } }) => {
  await resetDemoForm("660fde584e2e12f6cd7164c3");
  const { id } = params;
  const form = await getDemoForm("660fde584e2e12f6cd7164c3");
  if (!form) {
    throw new Error("Form not found");
  }
  return <FormBuilder form={form} />;
};

export default BuilderIdPage;
