import type React from "react"
import classNames from "classnames"
import { ClientOnly } from "vite-react-ssg"
import css from './style.module.scss'
import { useDisplaySider } from "../Sider/hook"
import useJumpPage from "../../hooks/useJumpPage"
import Doll69Div from "../Doll69Div"

const Header: React.FC = () => {
  const [_, setDisplaySider] = useDisplaySider()
  const jumper = useJumpPage()
  return (<>
    <div className={css.container}>
      <ClientOnly>
        {
          () => (
            <Doll69Div classNames={['pointer', css.left]} onClick={() => setDisplaySider(true)}>
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
