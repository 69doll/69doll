import { Outlet } from "react-router-dom"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarGroupLabel } from "../ui/sidebar"
import { useMemo } from "react"
import './root.scss'
import css from './style.module.scss'
import { useQuery } from "shared"
import Logo from "../Logo"

const ContentLayout = () => {
  const { data } = useQuery<any>('/api/admin/user/current_user')
  const nickname = useMemo(() => {
    return data?.data?.nickname
  }, [data])
  return <>
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>数据管理</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="images">
                      图片管理
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>系统管理</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="users">
                      用户管理
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div>{nickname}</div>
        </SidebarFooter>
      </Sidebar>
      <main className={css.body}>
        <Outlet />
      </main>
    </SidebarProvider>
  </>
}

export default ContentLayout
