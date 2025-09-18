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

  const list = [
    {
      name: '数据管理',
      list: [
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
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          {
            list.map((group, gIndex) => {
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
