import type React from "react";
import { Link } from "react-router-dom";
import { Doll69If } from "shared";
import useCurrentUser from "@/Context/CurrentUser/useCurrentUser";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

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
    name: '物料管理',
    list: [
      {
        path: 'orders',
        name: '订单管理',
      },
      {
        path: 'products',
        name: '产品管理',
      },
      {
        path: 'components',
        name: '配件管理',
      },
      {
        path: 'brands',
        name: '品牌管理',
      },
      {
        path: 'categories',
        name: '分类管理',
      },
    ],
  },
  {
    name: '数据管理',
    list: [
      {
        path: 'modules',
        name: '页面管理',
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

const SideContent: React.FC = () => {
  const currentUser = useCurrentUser()
  return <>
    <Doll69If display={!!currentUser}>
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
    </Doll69If>
  </>
}

export default SideContent
