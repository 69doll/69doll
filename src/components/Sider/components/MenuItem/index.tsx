import type React from "react"
import classNames from "classnames"
import Doll69If from "../../../Doll69If"
import css from './style.module.scss'

interface IMenuItemProps {
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const MenuItem: React.FC<React.PropsWithChildren & IMenuItemProps> = ({ children, onClick, onMouseOver }) => {
  return (
    <div className={css.menuItem} onClick={onClick}>
      <div>{children}</div>
      <Doll69If display={!!onMouseOver}>
        <div className={classNames('icon', css.next)}></div>
      </Doll69If>
    </div>
  )
}

export default MenuItem
