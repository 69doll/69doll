import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.ts'
import '@unocss/reset/normalize.css'
import './root.scss'

export const createRoot = ViteReactSSG(
  { routes },
  () => {
    // do something.
  },
)
