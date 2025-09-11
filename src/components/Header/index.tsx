import type React from "react"
import classNames from "classnames"
import { ClientOnly } from "vite-react-ssg"
import { useOpenSider } from "../../context/SiderDisplay"
import useJumpPage from "../../hooks/useJumpPage"
import Doll69Div from "../Doll69Div"
import css from './style.module.scss'

const Header: React.FC = () => {
  const jumper = useJumpPage()
  const openSider = useOpenSider()
  return (<>
    <div className={css.container}>
      <ClientOnly>
        {
          () => (
            <Doll69Div classNames={['pointer', css.left]} onClick={() => openSider()}>
              <div className={classNames('icon', css.hamburger)}></div>
              <b>SHOP</b>
            </Doll69Div>
          )
        }
      </ClientOnly>
      <div className={css.center}>
        <b className='pointer' onClick={() => jumper.HOME()}>69Doll</b>
      </div>
      <ClientOnly>
        {
          () => (
            <div className={css.right}>
              <div className={classNames('icon', css.search)}></div>
              <div className={classNames('icon', css.account)} onClick={() => jumper.SIGNIN()}></div>
              <div className={classNames('icon', css.carts)} onClick={() => jumper.CARTS()}></div>
            </div>
          )
        }
      </ClientOnly>
    </div>
  </>)
}

export default Header
