import type SUPPORTED_LANGUAGE from "./constant/SUPPORTED_LANGUAGE"
import transformI18nKey from "./utils/transformI18nKey"

export interface I18n {
  [key: string]: string | I18n;
}

export type PreLoaderData<O> = {
  dataUrl?: string,
  systemName?: string,
  pageName?: string,
  title?: string,
  keywords?: string,
  description?: string,
  data?: O,
  i18n?: I18n,
}

type TransformByLanguage<O extends PreLoaderData<any>> = {
  [K in keyof O]: {
    [lang in SUPPORTED_LANGUAGE]?: O[K]
  }
}

export type LoaderData<O> = Pick<PreLoaderData<O>, 'dataUrl'>
  & TransformByLanguage<Omit<PreLoaderData<O>, 'dataUrl'>>

export function genLoaderData <O>(lang: string | undefined, data: PreLoaderData<O>) {
  const currentLanguage = transformI18nKey(lang)
  return {
    dataUrl: data.dataUrl,
    ...Object.fromEntries(Object.keys(data).filter(k => k !== 'dataUrl').map((k) => {
      return [k, { [currentLanguage]: data[k as keyof typeof data] }]
    })),
  } as LoaderData<O>
}
