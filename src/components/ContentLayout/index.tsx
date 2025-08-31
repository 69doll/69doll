import { useState } from "react"
import type React from "react"
import { context as DisplayContext } from "../../context/SiderDisplay"
import css from './style.module.scss'
import Footer from "../Footer"
import Header from "../Header"
import MetaData from "../MetaData"
import Sider from "../Sider"
import Doll69If from "../Doll69If"

const ContentLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isDisplaySider, setDisplaySider] = useState(false)
  return (
    <>
      <DisplayContext.Provider value={[isDisplaySider, setDisplaySider as any]}>
        <MetaData />
        <div className={css.layout}>
          <Doll69If display={isDisplaySider}>
            <div className={css.sider}><Sider></Sider></div>
          </Doll69If>
          <div className={css.container}>
            <div className={css.header}>
              <Header />
            </div>
            <div className={css.body}>
              { children }
            </div>
            <div className={css.footer}>
              <Footer />
            </div>
          </div>
        </div>
      </DisplayContext.Provider>
    </>
  )
}

export default ContentLayout
