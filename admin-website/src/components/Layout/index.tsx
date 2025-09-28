import type React from "react";
import { Outlet } from "react-router-dom";
import css from './style.module.scss'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (<>
    <div className={css.layout}>
      { children }
      <Outlet />
    </div>
  </>)
}

export default Layout
