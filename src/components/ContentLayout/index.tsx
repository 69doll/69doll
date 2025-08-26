import type React from "react"
import css from './style.module.scss'
import Header from "../Header"
import Footer from "../Footer"
import MetaData from "../MetaData"
import { useDisplaySider } from "../Sider/hook"
import Sider from "../Sider"

const ContentLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isDisplaySider] = useDisplaySider()
  return (
    <>
      <MetaData />
      <div className={css.layout}>
        { isDisplaySider ? <div className={css.sider}><Sider></Sider></div> : void 0 }
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
    </>
  )
}

export default ContentLayout
