import { getFormById } from "@/actions/form-actions";
import { FormBuilder } from "@/components/form-builder";
import React from "react";

const BuilderIdPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const form = await getFormById(id);
  if (!form) {
    throw new Error("Form not found");
  }
  return <FormBuilder form={form} />;
};

export default BuilderIdPage;
