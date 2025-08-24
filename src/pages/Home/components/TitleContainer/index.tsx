import type React from "react";
import css from './style.module.scss'
import classNames from "classnames";

const TitleContainer: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => {
  return (<>
    <div className={classNames(className, css.titleContainer)}>
      { children }
    </div>
  </>)
}

export default TitleContainer
