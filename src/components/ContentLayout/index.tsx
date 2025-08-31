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
        <div className={css.layout} onScroll={isDisplaySider ? () => false : undefined}>
          <Doll69If display={isDisplaySider}>
            <aside className={css.sider}><Sider></Sider></aside>
          </Doll69If>
          <div className={css.container}>
            <header className={css.header}>
              <Header />
            </header>
            <main className={css.body}>
              { children }
            </main>
            <footer className={css.footer}>
              <Footer />
            </footer>
          </div>
        </div>
      </DisplayContext.Provider>
    </>
  )
}

export default ContentLayout
