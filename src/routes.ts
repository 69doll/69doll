import type { RouteRecord } from 'vite-react-ssg'
import { compile } from 'path-to-regexp'
import getSupportedLanguages from './utils/getSupporttedLanguages.ts'

export const NavigatePath = {
  get INDEX() { return '/' },
  get NOT_FOUND() { return '/404' },
  get HOME() { return `{/:lang}/home` },
  get FORGOT() { return `{/:lang}/forgot` },
  get SIGNIN() { return `{/:lang}/signin` },
  get SIGNUP() { return `{/:lang}/signup` },
  get CARTS() { return `{/:lang}/carts` },
  get DOLLS() { return `{/:lang}/dolls` },
  get DOLL_DETAIL() { return `${NavigatePath.DOLLS}/:id` },
  get FACES() { return `{/:lang}/faces` },
  get FACE_DETAIL() { return `${NavigatePath.FACES}/:id` },
  get TORSOS() { return `{/:lang}/torsos` },
  get TORSO_DETAIL() { return `${NavigatePath.TORSOS}/:id` },
  get ACCESSORIES() { return `{/:lang}/accessories` },
  get ACCESSORY_DETAIL() { return `${NavigatePath.ACCESSORIES}/:id` },
}

export const NavigateRealPath = {
  INDEX: () => NavigatePath.INDEX,
  NOT_FOUND: () => NavigatePath.NOT_FOUND,
  HOME: (opts?: { lang?: string }) => compile(NavigatePath.HOME)({ ...(opts ?? {}) }),
  FORGOT: (opts?: { lang?: string }) => compile(NavigatePath.FORGOT)({ ...(opts ?? {}) }),
  SIGNIN: (opts?: { lang?: string }) => compile(NavigatePath.SIGNIN)({ ...(opts ?? {}) }),
  SIGNUP: (opts?: { lang?: string }) => compile(NavigatePath.SIGNUP)({ ...(opts ?? {}) }),
  CARTS: (opts?: { lang?: string }) => compile(NavigatePath.CARTS)({ ...(opts ?? {}) }),
  DOLLS: (opts?: { lang?: string }) => compile(NavigatePath.DOLLS)({ ...(opts ?? {}) }),
  DOLL_DETAIL: (id: string, opts?: { lang?: string }): string => compile(NavigatePath.DOLL_DETAIL)({ id, ...(opts ?? {}) }),
  FACES: (opts?: { lang?: string }) => compile(NavigatePath.FACES)({ ...(opts ?? {}) }),
  FACE_DETAIL: (id: string, opts?: { lang?: string }): string => compile(NavigatePath.FACE_DETAIL)({ id, ...(opts ?? {}) }),
  TORSOS: (opts?: { lang?: string }) => compile(NavigatePath.TORSOS)({ ...(opts ?? {}) }),
  TORSO_DETAIL: (id: string, opts?: { lang?: string }): string => compile(NavigatePath.TORSO_DETAIL)({ id, ...(opts ?? {}) }),
  ACCESSORIES: (opts?: { lang?: string }) => compile(NavigatePath.ACCESSORIES)({ ...(opts ?? {}) }),
  ACCESSORY_DETAIL: (id: string, opts?: { lang?: string }): string => compile(NavigatePath.ACCESSORY_DETAIL)({ id, ...(opts ?? {}) }),
}

export const routes: RouteRecord[] = [
  {
    path: NavigatePath.INDEX,
    lazy: () => import('./pages/SignInUp/index.tsx'),
    // lazy: () => import('./pages/Home/index.tsx'),
  },
  {
    path: NavigatePath.HOME,
    lazy: () => import('./pages/Home/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigateRealPath.HOME({ lang })).concat([NavigateRealPath.HOME()]),
  },
  {
    path: NavigatePath.FORGOT,
    lazy: () => import('./pages/Forgot/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigateRealPath.FORGOT({ lang })).concat([NavigateRealPath.FORGOT()]),
  },
  {
    path: NavigatePath.SIGNIN,
    lazy: () => import('./pages/SignInUp/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigateRealPath.SIGNIN({ lang })).concat([NavigateRealPath.SIGNIN()]),
  },
  {
    path: NavigatePath.SIGNUP,
    lazy: () => import('./pages/SignInUp/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigateRealPath.SIGNUP({ lang })).concat([NavigateRealPath.SIGNUP()]),
  },
  {
    path: NavigatePath.CARTS,
    lazy: () => import('./pages/Carts/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigateRealPath.CARTS({ lang })).concat([NavigateRealPath.CARTS()]),
  },
  {
    path: NavigatePath.DOLLS,
    lazy: () => import('./pages/Dolls/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigateRealPath.DOLLS({ lang })).concat([NavigateRealPath.DOLLS()]),
  },
  {
    path: NavigatePath.DOLL_DETAIL,
    lazy: () => import('./pages/DollDetail/index.tsx'),
  },
  {
    path: NavigatePath.FACES,
    lazy: () => import('./pages/Faces/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigateRealPath.FACES({ lang })).concat([NavigateRealPath.FACES()]),
  },
  {
    path: NavigatePath.FACE_DETAIL,
    lazy: () => import('./pages/FaceDetail/index.tsx'),
  },
  {
    path: NavigatePath.TORSOS,
    lazy: () => import('./pages/Torsos/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigateRealPath.TORSOS({ lang })).concat([NavigateRealPath.TORSOS()]),
  },
  {
    path: NavigatePath.TORSO_DETAIL,
    lazy: () => import('./pages/TorsoDetail/index.tsx'),
  },
  {
    path: NavigatePath.ACCESSORIES,
    lazy: () => import('./pages/Accessories/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigateRealPath.ACCESSORIES({ lang })).concat([NavigateRealPath.ACCESSORIES()]),
  },
  {
    path: NavigatePath.ACCESSORY_DETAIL,
    lazy: () => import('./pages/AccessoryDetail/index.tsx'),
  },
  {
    path: NavigatePath.NOT_FOUND,
    lazy: () => import('./pages/404/index.tsx'),
  },
]
