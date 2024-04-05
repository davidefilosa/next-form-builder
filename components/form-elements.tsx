import { TextFieldFormElement } from "./fields/text-field";
import { LucideIcon } from "lucide-react";
import { TitleFieldFormElement } from "./fields/title-field";
import { NumberFieldFormElement } from "./fields/number-field";
import { CheckboxFieldFieldFormElement } from "./fields/checkbox-field.tsx";
import { DateFieldFormElement } from "./fields/date-field";
import { ParagprahFieldFormElement } from "./fields/paragraph-field";
import { SelectFieldFormElement } from "./fields/select-field";
import { SeparatorFieldFormElement } from "./fields/separator-field";
import { SpacerFieldFormElement } from "./fields/space-field";
import { SubTitleFieldFormElement } from "./fields/subtitle-field";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "NumberField"
  | "CheckboxField"
  | "DateField"
  | "ParagraphField"
  | "SelectField"
  | "SeparatorField"
  | "SpacerField"
  | "SubTitleField"
  | "TextAreaField";
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
  DateField: DateFieldFormElement,
  ParagraphField: ParagprahFieldFormElement,
  SelectField: SelectFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  TextAreaField: TextFieldFormElement,
};
