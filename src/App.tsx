import type { RouteRecord } from 'vite-react-ssg'
import Layout from './Layout.tsx'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/Layout.tsx',
  },
]
