import type React from "react"
import css from './style.module.scss'
import { useDisplaySider } from "./hook"
import { useState } from "react"
import MenuItem from "./MenuItem"
import classNames from "classnames"
import Doll69If from "../Doll69If"

const Sider: React.FC = () => {
  const [_, __, toggleSider] = useDisplaySider()
  const [isDisplaySubSider, setDisplaySubSider] = useState(false)
  return (<>
    <div className={css.container}>
      <div className={css.menu}>
        <div className={css.header}>
          <div className={classNames('icon', css.close)} onClick={() => toggleSider()}></div>
        </div>
        <MenuItem onClick={() => setDisplaySubSider(true)} onMouseOver={() => setDisplaySubSider(true)}>FACES</MenuItem>
        <MenuItem onClick={() => setDisplaySubSider(true)} onMouseOver={() => setDisplaySubSider(true)}>DOLLS</MenuItem>
        <MenuItem onClick={() => setDisplaySubSider(true)} onMouseOver={() => setDisplaySubSider(true)}>TORSOS</MenuItem>
        <MenuItem onClick={() => setDisplaySubSider(true)} onMouseOver={() => setDisplaySubSider(true)}>ACCESSORIES</MenuItem>
      </div>
      <Doll69If display={isDisplaySubSider}>
        <div className={css.menu}>
          <div className={css.header}>
            <div className={classNames('icon', css.close)} onClick={() => setDisplaySubSider(false)}></div>
          </div>
        </div>
      </Doll69If>
      <div className={css.masking} onClick={() => toggleSider()}></div>
    </div>
  </>)
}

export default Sider
