import { TextFieldFormElement } from "./fields/text-field";
import { LucideIcon } from "lucide-react";
import { TitleFieldFormElement } from "./fields/title-field";
import { NumberFieldFormElement } from "./fields/number-field";
import { CheckboxFieldFieldFormElement } from "./fields/checkbox-field.tsx";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "NumberField"
  | "CheckboxField";
export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: LucideIcon;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  NumberField: NumberFieldFormElement,
  CheckboxField: CheckboxFieldFieldFormElement,
};
