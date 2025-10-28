import type React from "react";
import { Doll69If } from "shared";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { cn } from "@/lib/utils";

interface FormItemProps {
  className?: React.CSSProperties | string,
  label: React.ReactNode,
  description?: React.ReactNode,
  suffixDescription?: React.ReactNode,
  errors?: { message?: string }[],
}

const FormItem: React.FC<React.PropsWithChildren<FormItemProps>> = ({
  className,
  label,
  description,
  suffixDescription,
  children,
  errors = [],
}) => {
  return <>
    <Field className={cn("max-w-sm", className)}>
      <FieldLabel>{label}</FieldLabel>
      <Doll69If display={!!description}>
        <FieldDescription>{description}</FieldDescription>
      </Doll69If>
      {children}
      <Doll69If display={!!errors.length}>
        <FieldError errors={errors}></FieldError>
      </Doll69If>
      <Doll69If display={!errors.length && !!suffixDescription}>
        <FieldDescription>{suffixDescription}</FieldDescription>
      </Doll69If>
    </Field>
  </>
}

export default FormItem;
