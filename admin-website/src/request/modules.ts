import { getAuthorization } from '@/store/authorization'

export const MODULE_ENV = {
  PRODUCTION: 'production',
  STAGING: 'staging',
  DRAFT: 'draft',
} as const

export type MODULE_ENV = typeof MODULE_ENV[keyof typeof MODULE_ENV]

const dataDomain = import.meta.env.VITE_API_DATA_DOMAIN

// #region Get Page Data

export interface PageModuleData<O = unknown> {
  data: O,
  description: string,
  keywords: string,
  title: string,
}

export const getPageModuleDataCacheKeys = (page: string, env: MODULE_ENV, lang: string = 'en-us') => {
  const keys = ['module', 'data', env, lang, page]
  return keys
}

export const getPageModuleData = async <O = unknown>(page: string, env: MODULE_ENV, lang: string = 'en-us') => {
  const url = new URL(`/${env}/${lang}/${page}`, dataDomain)
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  const content = await res.json() as PageModuleData<O>
  return content
}

// #endregion Get Page Data
