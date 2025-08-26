import type React from "react"
import css from './menuItem.module.scss'
import classNames from "classnames"

interface IMenuItemProps {
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const MenuItem: React.FC<React.PropsWithChildren & IMenuItemProps> = ({ children, onClick, onMouseOver }) => {
  return (
    <div className={css.menuItem} onClick={onClick}>
      <div>{children}</div>
      { onMouseOver ? <div className={classNames('icon', css.next)}></div> : void 0 }
    </div>
  )
}

export default MenuItem
