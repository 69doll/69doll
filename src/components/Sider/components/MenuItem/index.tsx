import type React from "react"
import Doll69Div from "../../../Doll69Div"
import type { Doll69DivAttributes } from "../../../Doll69Div"
import Doll69If from "../../../Doll69If"
import css from './style.module.scss'

interface IMenuItemProps {
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
  active?: boolean,
}

const MenuItem: React.FC<React.PropsWithChildren<Doll69DivAttributes & IMenuItemProps>> = ({ children, onClick, onMouseOver, classNames = [], active = false }) => {
  return (
    <Doll69Div classNames={[css.menuItem, { [css.active]: active} ]} onClick={onClick}>
      <div>{children}</div>
      <Doll69If display={!!onMouseOver}>
        <Doll69Div classNames={['icon', css.next]}></Doll69Div>
      </Doll69If>
    </Doll69Div>
  )
}

export default MenuItem
