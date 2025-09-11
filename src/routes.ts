import { compile } from 'path-to-regexp'
import type { RouteRecord } from 'vite-react-ssg'
import ContentLayout from './components/ContentLayout/index.tsx'
import Provider from './components/Provider/index.tsx'
import SUPPORTED_LANGUAGE from './constant/SUPPORTED_LANGUAGE'
import { mockAccessoriesList, mockDollsList, mockFacesList, mockTorsosList } from './mock.ts'
import getSupportedLanguages from './utils/getSupportedLanguages'

const langOptional = '{/:lang}'

export const NavigatePath = {
  get INDEX() { return '/' as const },
  get NOT_FOUND() { return `${langOptional}/404` as const },
  get HOME() { return `${langOptional}/home` as const },
  get FORGOT() { return `${langOptional}/forgot` as const },
  get SIGNIN() { return `${langOptional}/signin` as const },
  get SIGNUP() { return `${langOptional}/signup` as const },
  get SIGNOUT() { return `${langOptional}/signout` as const },
  get CARTS() { return `${langOptional}/carts` as const },
  get DOLLS() { return `${langOptional}/dolls` as const },
  get DOLL_DETAIL() { return `${NavigatePath.DOLLS}/:id` as const },
  get FACES() { return `${langOptional}/faces` as const },
  get FACE_DETAIL() { return `${NavigatePath.FACES}/:id` as const },
  get TORSOS() { return `${langOptional}/torsos` as const },
  get TORSO_DETAIL() { return `${NavigatePath.TORSOS}/:id` as const },
  get ACCESSORIES() { return `${langOptional}/accessories` as const },
  get ACCESSORY_DETAIL() { return `${NavigatePath.ACCESSORIES}/:id` as const },
}

export const NavigateRealPath = {
  INDEX: () => NavigatePath.INDEX,
  NOT_FOUND: (opts?: { lang?: string }) => compile(NavigatePath.NOT_FOUND)({ ...(opts ?? {}) }),
  HOME: (opts?: { lang?: string }) => compile(NavigatePath.HOME)({ ...(opts ?? {}) }),
  FORGOT: (opts?: { lang?: string }) => compile(NavigatePath.FORGOT)({ ...(opts ?? {}) }),
  SIGNIN: (opts?: { lang?: string }) => compile(NavigatePath.SIGNIN)({ ...(opts ?? {}) }),
  SIGNUP: (opts?: { lang?: string }) => compile(NavigatePath.SIGNUP)({ ...(opts ?? {}) }),
  SIGNOUT: (opts?: { lang?: string }) => compile(NavigatePath.SIGNOUT)({ ...(opts ?? {}) }),
  CARTS: (opts?: { lang?: string }) => compile(NavigatePath.CARTS)({ ...(opts ?? {}) }),
  DOLLS: (opts?: { lang?: string }) => compile(NavigatePath.DOLLS)({ ...(opts ?? {}) }),
  DOLL_DETAIL: (opts: { id: string, lang?: string }) => compile(NavigatePath.DOLL_DETAIL)({ ...opts }),
  FACES: (opts?: { lang?: string }) => compile(NavigatePath.FACES)({ ...(opts ?? {}) }),
  FACE_DETAIL: (opts: { id: string, lang?: string }) => compile(NavigatePath.FACE_DETAIL)({ ...opts }),
  TORSOS: (opts?: { lang?: string }) => compile(NavigatePath.TORSOS)({ ...(opts ?? {}) }),
  TORSO_DETAIL: (opts: { id: string, lang?: string }) => compile(NavigatePath.TORSO_DETAIL)({ ...opts }),
  ACCESSORIES: (opts?: { lang?: string }) => compile(NavigatePath.ACCESSORIES)({ ...(opts ?? {}) }),
  ACCESSORY_DETAIL: (opts: { id: string, lang?: string }) => compile(NavigatePath.ACCESSORY_DETAIL)({ ...opts }),
}

const flatLanguageRoutes = <O extends Record<any, any>>(key: keyof typeof NavigatePath, routeOptions = {} as O, paramOptions: any[] = []) => {
  return [[SUPPORTED_LANGUAGE.AUTO], getSupportedLanguages()].map((langs) => {
    const isAutoLang = langs[0] === SUPPORTED_LANGUAGE.AUTO
    return {
      path: NavigatePath[key].replace(langOptional, isAutoLang ? '' : `/:lang`),
      getStaticPaths: () => langs.map((lang) => {
        if (paramOptions.length === 0) return [NavigateRealPath[key]({ lang: isAutoLang ? undefined : lang } as any)]
        return paramOptions.map((paramOption) => NavigateRealPath[key]({ lang: isAutoLang ? undefined : lang, ...paramOption } as any))
      }).flat(),
      ...routeOptions,
    }
  })
}

export const routes: RouteRecord[] = [
  {
    path: NavigatePath.INDEX,
    Component: Provider,
    children: [{
      path: NavigatePath.INDEX,
      Component: ContentLayout,
      children: [
        {
          index: true,
          lazy: () => import('./pages/Home/index.tsx'),
        },
        ...flatLanguageRoutes('HOME', {
          lazy: () => import('./pages/Home/index.tsx'),
        }),
        ...flatLanguageRoutes('FORGOT', {
          lazy: () => import('./pages/Forgot/index.tsx'),
        }),
        ...flatLanguageRoutes('SIGNIN', {
          lazy: () => import('./pages/SignIn/index.tsx'),
        }),
        ...flatLanguageRoutes('SIGNUP', {
          lazy: () => import('./pages/SignUp/index.tsx'),
        }),
        ...flatLanguageRoutes('SIGNOUT', {
          lazy: () => import('./pages/SignUp/index.tsx'),
        }),
        ...flatLanguageRoutes('CARTS', {
          lazy: () => import('./pages/Carts/index.tsx'),
        }),
        ...flatLanguageRoutes('DOLLS', {
          lazy: () => import('./pages/Dolls/index.tsx'),
        }),
        ...flatLanguageRoutes('DOLL_DETAIL', {
          lazy: () => import('./pages/DollDetail/index.tsx'),
        }, mockDollsList.map((item) => ({ id: item.id }))),
        ...flatLanguageRoutes('FACES', {
          lazy: () => import('./pages/Faces/index.tsx'),
        }),
        ...flatLanguageRoutes('FACE_DETAIL', {
          lazy: () => import('./pages/FaceDetail/index.tsx'),
        }, mockFacesList.map((item) => ({ id: item.id }))),
        ...flatLanguageRoutes('TORSOS', {
          lazy: () => import('./pages/Torsos/index.tsx'),
        }),
        ...flatLanguageRoutes('TORSO_DETAIL', {
          lazy: () => import('./pages/FaceDetail/index.tsx'),
        }, mockTorsosList.map((item) => ({ id: item.id }))),
        ...flatLanguageRoutes('ACCESSORIES', {
          lazy: () => import('./pages/Accessories/index.tsx'),
        }),
        ...flatLanguageRoutes('ACCESSORY_DETAIL', {
          lazy: () => import('./pages/AccessoryDetail/index.tsx'),
        }, mockAccessoriesList.map((item) => ({ id: item.id }))),
        ...flatLanguageRoutes('NOT_FOUND', {
          lazy: () => import('./pages/404/index.tsx'),
        }),
      ],
    }],
  },
]
