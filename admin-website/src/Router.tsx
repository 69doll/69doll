import React from 'react'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom'
import Root from './components/Root'
import { AuthProvider } from './provider/auth'

const ContentLayout = React.lazy(() => import('./components/ContentLayout'))
const Home = React.lazy(() => import('./components/Home'))
const SignIn = React.lazy(() => import('./components/SignIn'))
const Users = React.lazy(() => import('./components/Users'))
const Categories = React.lazy(() => import('./components/Categories'))
const Brands = React.lazy(() => import('./components/Brands'))

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
