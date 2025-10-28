import React from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom'
import Root from './pages/Root/Root'
import { signOut } from './request/auth'

const ContentLayout = React.lazy(() => import('./pages/ContentLayout'))
const DashBoard = React.lazy(() => import('./pages/DashBoard/DashBoard'))
const SignIn = React.lazy(() => import('./pages/SignIn/SignIn'))
const Users = React.lazy(() => import('./pages/Users/Users'))
const Categories = React.lazy(() => import('./pages/Categories/Categories'))
const Brands = React.lazy(() => import('./pages/Brands/Brands'))
const Product = React.lazy(() => import('./pages/Product/Product'))
const ProductDetail = React.lazy(() => import('./pages/Product/ProductDetail'))
const Images = React.lazy(() => import('./pages/Images/Images'))
const Components = React.lazy(() => import('./pages/Components/Components'))
const Modules = React.lazy(() => import('./pages/Modules/Modules'))

const routes = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Root,
    children: [
      {
        path: '/',
        Component: ContentLayout,
        children: [
          {
            path: '/',
            Component: DashBoard,
          },
          {
            path: '/dashboard',
            Component: DashBoard,
          },
          {
            path: '/users',
            Component: Users,
          },
          {
            path: '/categories',
            Component: Categories,
          },
          {
            path: '/brands',
            Component: Brands,
          },
          {
            path: '/products',
            Component: Product,
          },
          {
            path: '/products/:productId',
            Component: ProductDetail,
          },
          {
            path: '/components',
            Component: Components,
          },
          {
            path: '/images',
            Component: Images,
          },
          {
            path: '/modules',
            Component: Modules,
          },
        ],
      },
      {
        path: '/signin',
        Component: SignIn,
      },
      {
        path: '/signout',
        async action () {
          await signOut()
          return redirect('/signin')
        },
      },
    ],
  }
])

export default function Router() {
  return <RouterProvider
    router={routes}
  />
}
