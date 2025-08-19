import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.ts'

export const createRoot = ViteReactSSG(
  { routes },
  () => {
    // do something.
  },
)
