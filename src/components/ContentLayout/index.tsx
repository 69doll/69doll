import type React from "react"
import { Outlet } from "react-router-dom"
import { useIsDisplaySider } from "../../context/SiderDisplay"
import Doll69If from "../Doll69If"
import Footer from "../Footer"
import Header from "../Header"
import MetaData from "../MetaData"
import Sider from "../Sider"
import css from './style.module.scss'
import ImageBg from "../ImageBg"
import { backgroundImage } from "../../mock"

const ContentLayout: React.FC = () => {
  const isDisplaySider = useIsDisplaySider()
  return (
    <>
      <MetaData />
      <div className={css.layout}>
        <Doll69If display={isDisplaySider}>
          <aside className={css.sider}><Sider /></aside>
        </Doll69If>
        <ImageBg
          className={css.container}
          imageUrl={backgroundImage}
          noAnimation={true}
        >
          <header className={css.header}>
            <Header />
          </header>
          <main className={css.body}>
            <Outlet />
          </main>
          <footer className={css.footer}>
            <Footer />
          </footer>
        </ImageBg>
      </div>
    </>
  )
}

export default ContentLayout
