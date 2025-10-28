import type React from "react";
import { FieldGroup, FieldSet } from "../ui/field";

interface FormItemProps {
  className?: React.CSSProperties | string,
}

const FormWrapper: React.FC<React.PropsWithChildren<FormItemProps>> = ({
  children
}) => {
  return <>
    <FieldGroup>
      <FieldSet>
        <FieldGroup>
          {children}
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  </>
}

export default FormWrapper;
