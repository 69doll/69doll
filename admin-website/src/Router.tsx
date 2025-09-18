import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Layout from './components/Layout'
import React from 'react'
import ContentLayout from './components/ContentLayout'

const Home = React.lazy(() => import('./components/Home'))
const SignIn = React.lazy(() => import('./components/SignIn'))
const Users = React.lazy(() => import('./components/Users'))
const Categories = React.lazy(() => import('./components/Categories'))
const Brands = React.lazy(() => import('./components/Brands'))

const routes = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader () {
      return { }
    },
    Component: Layout,
    children: [
      {
        path: '/',
        Component: ContentLayout,
        children: [
          {
            path: '/',
            Component: Home,
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
        ],
      },
      {
        path: '/signin',
        Component: SignIn,
      },
    ],
  }
])

export default function Router() {
  return <RouterProvider
    router={routes}
  />
}
