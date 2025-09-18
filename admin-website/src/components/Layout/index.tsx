import type React from "react";
import css from './style.module.scss'
import { Outlet } from "react-router-dom";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (<>
    <div className={css.layout}>
      { children }
      <Outlet />
    </div>
  </>)
}

export default Layout
