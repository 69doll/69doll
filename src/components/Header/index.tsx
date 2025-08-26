import type React from "react"
import css from './style.module.scss'
import { useDisplaySider } from "../Sider/hook"
import useJumpPage from "../../hooks/useJumpPage"
import classNames from "classnames"
import { ClientOnly } from "vite-react-ssg"

const Header: React.FC = () => {
  const [_, __, toggleSider] = useDisplaySider()
  const jump = useJumpPage()
  return (<>
    <div className={css.container}>
      <ClientOnly>
        {
          () => (
            <div className={css.left}>
              <div className={classNames('icon', css.hamburger)} onClick={() => toggleSider()}></div>
              <b>SHOP</b>
            </div>
          )
        }
      </ClientOnly>
      <div className={css.center}><b onClick={() => jump.HOME()}>69Doll</b></div>
      <ClientOnly>
        {
          () => (
            <div className={css.right}>
              <div className={classNames('icon', css.search)}></div>
              <div className={classNames('icon', css.account)}></div>
              <div className={classNames('icon', css.carts)}></div>
            </div>
          )
        }
      </ClientOnly>
    </div>
  </>)
}

export default Header
