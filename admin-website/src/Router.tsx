import React from 'react'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom'
import Root from './pages/Root'
import { AuthProvider } from './provider/auth'

const ContentLayout = React.lazy(() => import('./pages/ContentLayout'))
const DashBoard = React.lazy(() => import('./pages/DashBoard'))
const SignIn = React.lazy(() => import('./pages/SignIn'))
const Users = React.lazy(() => import('./pages/Users'))
const Categories = React.lazy(() => import('./pages/Categories'))
const Brands = React.lazy(() => import('./pages/Brands'))
const Product = React.lazy(() => import('./pages/Product'))

const routes = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Root,
    children: [
      {
        path: '/',
        Component: ContentLayout,
        async loader () {
          if (AuthProvider.isAuthenticated) {
            return { user: AuthProvider.user }
          }
          return {}
        },
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
        ],
      },
      {
        path: '/signin',
        Component: SignIn,
      },
      {
        path: '/signout',
        async action () {
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
