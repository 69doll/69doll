import React from 'react'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom'
import Root from './pages/Root'
import ContentLayout from './pages/ContentLayout'
import { signOut } from './request/auth'

const DashBoard = React.lazy(() => import('./pages/DashBoard'))
const SignIn = React.lazy(() => import('./pages/SignIn'))
const Users = React.lazy(() => import('./pages/Users'))
const Categories = React.lazy(() => import('./pages/Categories'))
const Brands = React.lazy(() => import('./pages/Brands'))
const Product = React.lazy(() => import('./pages/Product'))
const Images = React.lazy(() => import('./pages/Images'))
const Components = React.lazy(() => import('./pages/Components'))

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
            path: '/components',
            Component: Components,
          },
          {
            path: '/images',
            Component: Images,
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
