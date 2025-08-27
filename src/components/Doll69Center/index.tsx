import type React from "react"
import css from './style.module.scss'

const Doll69Center: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ children, ...props }) => {
  return (<>
    <div className={css.container} {...props}>
      { children }
    </div>
  </>)
}

export default Doll69Center
