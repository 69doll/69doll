import React from "react"
import classNamesFn from "classnames";
import castArray from "../../utils/castArray";

type ElementClassNamesAttributes = {
  classNames?: string | classNamesFn.ArgumentArray,
  ref?: React.Ref<HTMLDivElement>,
}
export type Doll69DivAttributes = React.HTMLAttributes<HTMLDivElement> & ElementClassNamesAttributes
export type Doll69DivProps = React.PropsWithChildren<Doll69DivAttributes>

const Doll69Div: React.FC<Doll69DivProps> = ({ children, className, classNames = [], ref, ...props }) => {
  return <div ref={ref}
    className={classNamesFn(...castArray(classNames), className)}
    {...props}
  >{ children }</div>
}

export default Doll69Div
