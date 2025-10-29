import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom'
import { lazy } from 'react'
import Root from './pages/Root/Root'
import { signOut } from './request/auth'

const ContentLayout = lazy(() => import('./pages/ContentLayout'))
const DashBoard = lazy(() => import('./pages/DashBoard/DashBoard'))
const SignIn = lazy(() => import('./pages/SignIn/SignIn'))
const Users = lazy(() => import('./pages/Users/Users'))
const Categories = lazy(() => import('./pages/Categories/Categories'))
const Brands = lazy(() => import('./pages/Brands/Brands'))
const Product = lazy(() => import('./pages/Product/Product'))
const ProductDetail = lazy(() => import('./pages/Product/ProductDetail'))
const Images = lazy(() => import('./pages/Images/Images'))
const Components = lazy(() => import('./pages/Components/Components'))
const Modules = lazy(() => import('./pages/Modules/Modules'))

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
