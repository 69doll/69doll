import type React from "react";
import css from './style.module.scss'
import Doll69Div, { type Doll69DivProps } from "../Doll69Div";

interface Doll69ButtonProps {
  loading?: boolean,
  disabled?: boolean,
}

const Doll69Button: React.FC<Doll69DivProps & Doll69ButtonProps> = ({
  classNames = [],
  children,
  loading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const realOnClick = loading || disabled ? (() => {}) : onClick
  return <Doll69Div
    classNames={[
      css.actionBtn,
      { loading: loading, disabled: disabled },
      ...classNames,
    ]}
    onClick={realOnClick}
    {...props}
  >
    { children }
  </Doll69Div>
}

export default Doll69Button
