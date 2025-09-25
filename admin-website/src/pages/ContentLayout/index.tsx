import { Link, Outlet } from "react-router-dom"
import { useCurrentUser } from "@/Context/CurrentUser"
import { Doll69If } from "shared"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../../components/ui/sidebar"
import Logo from "../../components/Logo"
import SidebarFooterContent from "./components/SideFooterContent"
import './root.scss'
import css from './style.module.scss'

const menuList = [
  {
    name: '总览',
    list: [
      {
        path: '/dashboard',
        name: '仪表盘',
      },
    ],
  },
  {
    name: '数据管理',
    list: [
      {
        path: 'products',
        name: '产品管理',
      },
      {
        path: 'brands',
        name: '品牌管理',
      },
      {
        path: 'categories',
        name: '分类管理',
      },
      {
        path: 'images',
        name: '图片管理',
      },
    ],
  },
  {
    name: '系统管理',
    list: [
      {
        path: 'users',
        name: '用户管理',
      }
    ],
  },
]

const ContentLayout = () => {
  const currentUser = useCurrentUser()
  return <>
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <Doll69If display={!!currentUser}>
        <SidebarContent>
          {
            menuList.map((group, gIndex) => {
              return <SidebarGroup key={`group-${gIndex}`}>
                <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
                <SidebarGroupContent>
                  {
                    group.list.map((item, index) => <SidebarMenu key={index}>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link to={item.path}>
                            { item.name }
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>)
                  }
                </SidebarGroupContent>
              </SidebarGroup>
            })
          }
        </SidebarContent>
        </Doll69If>
        <SidebarFooter>
          <SidebarFooterContent />
        </SidebarFooter>
      </Sidebar>
      <main className={css.contentLayout}>
        <Doll69If display={!!currentUser}>
          <Outlet />
        </Doll69If>
      </main>
    </SidebarProvider>
  </>
}

export default ContentLayout
