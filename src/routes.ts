import type { RouteRecord } from 'vite-react-ssg'

export const NavigatePath = {
  INDEX: () => '/',
  HOME: (lang?: string) => `/${lang ?? ':lang'}/home`,
  SIGNIN: (lang?: string) => `/${lang ?? ':lang'}/signin`,
  SIGNUP: (lang?: string) => `/${lang ?? ':lang'}/signup`,
  CARTS: (lang?: string) => `/${lang ?? ':lang'}/carts`,
  DOLLS: (lang?: string) => `/${lang ?? ':lang'}/dolls`,
  DOLL_DETAIL: (lang?: string, id?: string | number): string => `${NavigatePath.DOLLS(lang)}/${id ? id.toString() : ':id'}`,
  FACES: (lang?: string) => `/${lang ?? ':lang'}/faces`,
  FACE_DETAIL: (lang?: string, id?: string | number): string => `${NavigatePath.FACES(lang)}/${id ? id.toString() : ':id'}`,
  TORSOS: (lang?: string) => `/${lang ?? ':lang'}/torsos`,
  TORSO_DETAIL: (lang?: string, id?: string | number): string => `${NavigatePath.TORSOS(lang)}/${id ? id.toString() : ':id'}`,
  ACCESSORIES: (lang?: string) => `/${lang ?? ':lang'}/accessories`,
  ACCESSORY_DETAIL: (lang?: string, id?: string | number): string => `${NavigatePath.ACCESSORIES(lang)}/${id ? id.toString() : ':id'}`,
  NOT_FOUND: () => '/404',
}

export const routes: RouteRecord[] = [
  {
    path: NavigatePath.INDEX(),
    lazy: () => import('./pages/Home/index.tsx'),
  },
  {
    path: NavigatePath.HOME(),
    lazy: () => import('./pages/Home/index.tsx'),
  },
  {
    path: NavigatePath.SIGNIN(),
    lazy: () => import('./pages/SignIn/index.tsx'),
  },
  {
    path: NavigatePath.SIGNUP(),
    lazy: () => import('./pages/SignUp/index.tsx'),
  },
  {
    path: NavigatePath.CARTS(),
    lazy: () => import('./pages/Carts/index.tsx'),
  },
  {
    path: NavigatePath.DOLLS(),
    lazy: () => import('./pages/Dolls/index.tsx'),
  },
  {
    path: NavigatePath.DOLL_DETAIL(),
    lazy: () => import('./pages/DollDetail/index.tsx'),
  },
  {
    path: NavigatePath.FACES(),
    lazy: () => import('./pages/Faces/index.tsx'),
  },
  {
    path: NavigatePath.FACE_DETAIL(),
    lazy: () => import('./pages/FaceDetail/index.tsx'),
  },
  {
    path: NavigatePath.TORSOS(),
    lazy: () => import('./pages/Torsos/index.tsx'),
  },
  {
    path: NavigatePath.TORSO_DETAIL(),
    lazy: () => import('./pages/TorsoDetail/index.tsx'),
  },
  {
    path: NavigatePath.ACCESSORIES(),
    lazy: () => import('./pages/Accessories/index.tsx'),
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
