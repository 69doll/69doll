import { lazy } from "react"
import { Outlet } from "react-router-dom"
import { Doll69If } from "shared"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarSeparator,
} from "../../components/ui/sidebar"
import Logo from "../../components/Logo"
import './root.scss'
import css from './style.module.scss'
import useCurrentUser from "@/Context/CurrentUser/useCurrentUser"
import ModuleLoading from "@/components/Loading/ModuleLoading"

const ImagePreviewProvider = lazy(() => import("@/Context/ImagePreview/ImagePreviewProvider"))
const SideContent = lazy(() => import('./components/SideContent'))
const SideFooterContent = lazy(() => import('./components/SideFooterContent'))

const ContentLayout = () => {
  const currentUser = useCurrentUser()
  return <>
    <ImagePreviewProvider>
    <SidebarProvider>
      <Sidebar className="overflow-hidden">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarSeparator />
        <Doll69If display={!!currentUser}>
          <ModuleLoading>
            <SidebarContent>
              <SideContent />
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
              <SideFooterContent />
            </SidebarFooter>
          </ModuleLoading>
        </Doll69If>
      </Sidebar>
      <Doll69If display={!!currentUser}>
        <ModuleLoading className="h-dvh">
          <main className={css.contentLayout}>
            <Outlet />
          </main>
        </ModuleLoading>
      </Doll69If>
    </SidebarProvider>
    </ImagePreviewProvider>
  </>
}

export default ContentLayout
