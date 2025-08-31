import type React from "react"
import { useMemo, useState } from "react"
import classNames from "classnames"
import { mockDollsList } from "../../mock"
import useJumpPage from "../../hooks/useJumpPage"
import { useDisplaySider } from "./hook"
import css from './style.module.scss'
import Doll69Div from "../Doll69Div"
import Doll69If from "../Doll69If"
import MenuItem from "./components/MenuItem"
import SubMenuItem from "./components/SubMenuItem"

const Sider: React.FC = () => {
  const [_, setDisplaySider] = useDisplaySider()
  const [isDisplaySubSider, setDisplaySubSider] = useState(false)
  const [menuIndex, setMenuIndex] = useState(-1)
  const jumper = useJumpPage()
  const menuList = useMemo(() => [
    { title: 'FACES', onClick: (...opts: Parameters<typeof jumper['FACE_DETAIL']>) => jumper.FACE_DETAIL(...opts) },
    { title: 'DOLLS', onClick: (...opts: Parameters<typeof jumper['DOLL_DETAIL']>) => jumper.DOLL_DETAIL(...opts), list: mockDollsList },
    { title: 'TORSOS', onClick: (...opts: Parameters<typeof jumper['TORSO_DETAIL']>) => jumper.TORSO_DETAIL(...opts) },
    { title: 'ACCESSORIES', onClick: (...opts: Parameters<typeof jumper['ACCESSORY_DETAIL']>) => jumper.ACCESSORY_DETAIL(...opts) },
  ], [])
  const subMenuList = useMemo(() => menuList[menuIndex]?.list ?? [], [menuIndex])
  const switchMenu = (index: number) => {
    setDisplaySubSider(true)
    setMenuIndex(index)
  }
  return (<>
    <div className={css.container}>
      <div className={css.menu}>
        <div className={css.header}>
          <div className={classNames('icon', css.close)} onClick={() => setDisplaySider(false)}></div>
        </div>
        {
          menuList.map((menuObj, index) => {
            return <MenuItem
              key={index}
              onClick={() => switchMenu(index)}
              onMouseOver={() => switchMenu(index)}
            >
              { menuObj.title }
            </MenuItem>
          })
        }
      </div>
      <Doll69If display={isDisplaySubSider}>
        <Doll69Div classNames={[css.menu, css.submenu]}>
          <div className={css.header}>
            <div className={classNames('icon', css.close)} onClick={() => setDisplaySubSider(false)}></div>
          </div>
          <div>
            {
              subMenuList.map((menuObj) => {
                return <SubMenuItem
                  imageUrl={menuObj.imageUrl}
                  title={menuObj.title}
                  onClick={() => menuList[menuIndex].onClick?.({ id: menuObj.id })}
                />
              })
            }
          </div>
        </Doll69Div>
      </Doll69If>
      <div className={css.masking} onClick={() => setDisplaySider(false)}></div>
    </div>
  </>)
}

export default Sider
