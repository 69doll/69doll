import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'
import Router from './Router.tsx'
import { CurrentUserProvider } from './Context/CurrentUser.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrentUserProvider>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
    </CurrentUserProvider>
  </StrictMode>,
)
