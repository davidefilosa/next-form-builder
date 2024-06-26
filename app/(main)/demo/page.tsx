import {
  getDemoForm,
  getFormById,
  resetDemoForm,
} from "@/actions/form-actions";
import { FormBuilder } from "@/components/form-builder";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const BuilderDemoPage = async () => {
  const { userId } = auth();

  const form = await getDemoForm("661cd9afb3c419ddd45bc4bc");
  if (!form) {
    throw new Error("Form not found");
  }

  if (userId) return redirect("/dashboard");
  return <FormBuilder form={form} />;
};

export default BuilderDemoPage;
