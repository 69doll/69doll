import type React from "react";
import { Outlet } from "react-router-dom";
import ModuleLoading from "../Loading/ModuleLoading";
import css from './style.module.scss'

const Layout: React.FC = () => {
  return (<>
    <div className={css.layout}>
      <ModuleLoading>
        <Outlet />
      </ModuleLoading>
    </div>
  </>)
}

export default Layout
