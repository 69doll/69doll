import type React from "react"
import { useMemo, useState } from "react"
import classNames from "classnames"
import { mockAccessoriesList, mockDollsList, mockFacesList, mockTorsosList } from "../../mock"
import useJumpPage from "../../hooks/useJumpPage"
import { useDisplaySider } from "./hook"
import css from './style.module.scss'
import Doll69Div from "../Doll69Div"
import Doll69If from "../Doll69If"
import MenuItem from "./components/MenuItem"
import SubMenuItem from "./components/SubMenuItem"

const Sider: React.FC = () => {
  const [isDisplaySider, setDisplaySider] = useDisplaySider()
  const [isDisplaySubSider, setDisplaySubSider] = useState(false)
  const [menuIndex, setMenuIndex] = useState(-1)
  const jumper = useJumpPage()
  const menuList = useMemo(() => [
    {
      title: 'FACES',
      onItemClick: (...opts: Parameters<typeof jumper['FACE_DETAIL']>) => jumper.FACE_DETAIL(...opts),
      onClick: () => jumper.FACES(),
      list: mockFacesList,
    },
    {
      title: 'DOLLS',
      onItemClick: (...opts: Parameters<typeof jumper['DOLL_DETAIL']>) => jumper.DOLL_DETAIL(...opts),
      onClick: () => jumper.DOLLS(),
      list: mockDollsList,
    },
    {
      title: 'TORSOS',
      onItemClick: (...opts: Parameters<typeof jumper['TORSO_DETAIL']>) => jumper.TORSO_DETAIL(...opts),
      onClick: () => jumper.TORSOS(),
      list: mockTorsosList,
    },
    {
      title: 'ACCESSORIES',
      onItemClick: (...opts: Parameters<typeof jumper['ACCESSORY_DETAIL']>) => jumper.ACCESSORY_DETAIL(...opts),
      onClick: () => jumper.ACCESSORIES(),
      list: mockAccessoriesList,
    },
  ], [])
  const menuItem = useMemo(() => menuList[menuIndex], [menuIndex])
  const subMenuList = useMemo(() => menuItem?.list ?? [], [menuIndex])
  const switchMenu = (index: number) => {
    if (!!menuList[index].onItemClick) {
      setDisplaySubSider(true)
      setMenuIndex(index)
    } else {
      setDisplaySubSider(false)
      menuItem.onClick?.()
    }
  }
  const toggleSider = (cb?: Function) => {
    setDisplaySider(!isDisplaySider)
    cb?.()
  }
  return (<>
    <div className={css.container}>
      <div className={css.menu}>
        <div className={css.header}>
          <div className={classNames('icon', css.close)} onClick={() => toggleSider()}></div>
        </div>
        {
          menuList.map((menuObj, index) => {
            return <MenuItem
              key={index}
              onClick={() => switchMenu(index)}
              onMouseOver={() => switchMenu(index)}
              active={ index === menuIndex }
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
                  onClick={() => toggleSider(() => menuItem?.onItemClick?.({ id: menuObj.id }))}
                />
              })
            }
          </div>
          <div>
            <div className={css.actionBtn} onClick={() => menuItem?.onClick?.()}>View all</div>
          </div>
        </Doll69Div>
      </Doll69If>
      <div className={css.masking} onClick={() => toggleSider()}></div>
    </div>
  </>)
}

export default Sider
