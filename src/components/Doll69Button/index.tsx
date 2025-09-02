import type React from "react";
import css from './style.module.scss'
import Doll69Div, { type Doll69DivProps } from "../Doll69Div";

const Doll69Button: React.FC<Doll69DivProps> = ({ classNames = [], children, ...props }) => {
  return <Doll69Div
    classNames={[css.actionBtn, ...classNames]}
    {...props}
  >
    { children }
  </Doll69Div>
}

export default Doll69Button
