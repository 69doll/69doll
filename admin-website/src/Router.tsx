import React from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom'
import Root from './pages/Root/Root'
import ContentLayout from './pages/ContentLayout'
import { signOut } from './request/auth'
import ModuleLoading from './components/Loading/ModuleLoading'

const DashBoard = React.lazy(() => import('./pages/DashBoard/DashBoard'))
const SignIn = React.lazy(() => import('./pages/SignIn/SignIn'))
const Users = React.lazy(() => import('./pages/Users/Users'))
const Categories = React.lazy(() => import('./pages/Categories/Categories'))
const Brands = React.lazy(() => import('./pages/Brands/Brands'))
const Product = React.lazy(() => import('./pages/Product/Product'))
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
            element: <ModuleLoading><DashBoard /></ModuleLoading>,
          },
          {
            path: '/dashboard',
            element: <ModuleLoading><DashBoard /></ModuleLoading>,
          },
          {
            path: '/users',
            element: <ModuleLoading><Users /></ModuleLoading>,
          },
          {
            path: '/categories',
            element: <ModuleLoading><Categories /></ModuleLoading>,
          },
          {
            path: '/brands',
            element: <ModuleLoading><Brands /></ModuleLoading>,
          },
          {
            path: '/products',
            element: <ModuleLoading><Product /></ModuleLoading>,
          },
          {
            path: '/components',
            element: <ModuleLoading><Components /></ModuleLoading>,
          },
          {
            path: '/images',
            element: <ModuleLoading><Images /></ModuleLoading>,
          },
          {
            path: '/modules',
            element: <ModuleLoading><Modules /></ModuleLoading>,
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
