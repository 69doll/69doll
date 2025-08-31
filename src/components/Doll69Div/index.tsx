import React from "react"
import classNamesFn from "classnames";

type ElementClassNamesAttributes = {
  classNames?: string | classNamesFn.ArgumentArray,
  ref?: React.Ref<HTMLDivElement>,
}
export type Doll69DivAttributes = React.HTMLAttributes<HTMLDivElement> & ElementClassNamesAttributes
export type Doll69DivProps = React.PropsWithChildren<Doll69DivAttributes>

const castArray = function <T>(arrayLike: T | T[]) {
  return Array.isArray(arrayLike) ? arrayLike : [arrayLike]
}

const Doll69Div: React.FC<Doll69DivProps> = ({ children, className, classNames = [], ref, ...props }) => {
  return <div ref={ref}
    className={classNamesFn(className, ...castArray(classNames))}
    {...props}
  >{ children }</div>
}

export default Doll69Div
