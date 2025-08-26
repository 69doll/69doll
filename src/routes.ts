import type { RouteRecord } from 'vite-react-ssg'
import getSupportedLanguages from './utils/getSupporttedLanguages.ts'

export const NavigatePath = {
  INDEX: () => '/',
  NOT_FOUND: () => '/404',
  HOME: (lang?: string) => `/${lang ?? ':lang'}/home`,
  FORGOT: (lang?: string) => `/${lang ?? ':lang'}/forgot`,
  SIGNIN: (lang?: string) => `/${lang ?? ':lang'}/signin`,
  SIGNUP: (lang?: string) => `/${lang ?? ':lang'}/signup`,
  CARTS: (lang?: string) => `/${lang ?? ':lang'}/carts`,
  DOLLS: (lang?: string) => `/${lang ?? ':lang'}/dolls`,
  DOLL_DETAIL: (lang?: string, id?: string): string => `${NavigatePath.DOLLS(lang)}/${id ?? ':id'}`,
  FACES: (lang?: string) => `/${lang ?? ':lang'}/faces`,
  FACE_DETAIL: (lang?: string, id?: string): string => `${NavigatePath.FACES(lang)}/${id ?? ':id'}`,
  TORSOS: (lang?: string) => `/${lang ?? ':lang'}/torsos`,
  TORSO_DETAIL: (lang?: string, id?: string): string => `${NavigatePath.TORSOS(lang)}/${id ?? ':id'}`,
  ACCESSORIES: (lang?: string) => `/${lang ?? ':lang'}/accessories`,
  ACCESSORY_DETAIL: (lang?: string, id?: string): string => `${NavigatePath.ACCESSORIES(lang)}/${id ?? ':id'}`,
}

export const routes: RouteRecord[] = [
  {
    path: NavigatePath.INDEX(),
    lazy: () => import('./pages/Home/index.tsx'),
  },
  {
    path: NavigatePath.HOME(),
    lazy: () => import('./pages/Home/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigatePath.HOME(lang)),
  },
  {
    path: NavigatePath.FORGOT(),
    lazy: () => import('./pages/Forgot/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigatePath.FORGOT(lang)),
  },
  {
    path: NavigatePath.SIGNIN(),
    lazy: () => import('./pages/SignIn/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigatePath.SIGNIN(lang)),
  },
  {
    path: NavigatePath.SIGNUP(),
    lazy: () => import('./pages/SignUp/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigatePath.SIGNUP(lang)),
  },
  {
    path: NavigatePath.CARTS(),
    lazy: () => import('./pages/Carts/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigatePath.CARTS(lang)),
  },
  {
    path: NavigatePath.DOLLS(),
    lazy: () => import('./pages/Dolls/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigatePath.DOLLS(lang)),
  },
  {
    path: NavigatePath.DOLL_DETAIL(),
    lazy: () => import('./pages/DollDetail/index.tsx'),
  },
  {
    path: NavigatePath.FACES(),
    lazy: () => import('./pages/Faces/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigatePath.FACES(lang)),
  },
  {
    path: NavigatePath.FACE_DETAIL(),
    lazy: () => import('./pages/FaceDetail/index.tsx'),
  },
  {
    path: NavigatePath.TORSOS(),
    lazy: () => import('./pages/Torsos/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigatePath.TORSOS(lang)),
  },
  {
    path: NavigatePath.TORSO_DETAIL(),
    lazy: () => import('./pages/TorsoDetail/index.tsx'),
  },
  {
    path: NavigatePath.ACCESSORIES(),
    lazy: () => import('./pages/Accessories/index.tsx'),
    getStaticPaths: () => getSupportedLanguages().map((lang) => NavigatePath.ACCESSORIES(lang)),
  },
  {
    path: NavigatePath.ACCESSORY_DETAIL(),
    lazy: () => import('./pages/AccessoryDetail/index.tsx'),
  },
  {
    path: NavigatePath.NOT_FOUND(),
    lazy: () => import('./pages/404/index.tsx'),
  },
]
