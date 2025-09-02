import type React from "react"
import css from './style.module.scss'
import Doll69Div, { type Doll69DivProps } from "../Doll69Div"

const Doll69Center: React.FC<Doll69DivProps> = ({ children, classNames = [], ...props }) => {
  return (<>
    <Doll69Div classNames={[css.container, ...classNames]} {...props}>
      { children }
    </Doll69Div>
  </>)
}

export default Doll69Center
