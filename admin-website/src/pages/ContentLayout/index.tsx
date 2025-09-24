import { Outlet } from "react-router-dom"
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

const ContentLayout = () => {
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
  return <>
    <Doll69If display={true}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
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
                            <a href={item.path}>
                              { item.name }
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>)
                    }
                  </SidebarGroupContent>
                </SidebarGroup>
              })
            }
          </SidebarContent>
          <SidebarFooter>
            <SidebarFooterContent />
          </SidebarFooter>
        </Sidebar>
        <main className={css.body}>
          <Outlet />
        </main>
      </SidebarProvider>
    </Doll69If>
  </>
}

export default ContentLayout
