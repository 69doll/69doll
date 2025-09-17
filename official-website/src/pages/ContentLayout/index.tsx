import type React from "react"
import { Outlet, type LoaderFunctionArgs } from "react-router-dom"
import { useIsDisplaySider } from "../../context/SiderDisplay"
import Doll69If from "../../components/Doll69If"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MetaData from "../../components/MetaData"
import Sider from "../../components/Sider"
import css from './style.module.scss'
import ImageBg from "../../components/ImageBg"
import { backgroundImage } from "../../mock"
import getDataAsync from "../../utils/getDataAsync"

const ContentLayout: React.FC = () => {
  const isDisplaySider = useIsDisplaySider()
  return (
    <>
      <MetaData />
      <div className={css.layout}>
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
        <Doll69If display={isDisplaySider}>
          <aside className={css.sider}><Sider /></aside>
        </Doll69If>
      </div>
    </>
  )
}

export const Component = ContentLayout

export async function loader ({ params, request }: LoaderFunctionArgs) {
  const pathname = new URL(request.url).pathname
  return {
    pathname,
    pageData: await getDataAsync(params.lang, pathname)
  }
}
