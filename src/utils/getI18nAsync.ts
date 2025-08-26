import type LANGUAGE from '../constant/LANGUAGE';
import isPromise from './isPromise';
import transformI18nKey from './transformI18nKey';

interface I18nFnMap<T, FN = () => T | Promise<T | { default: T }>> {
  [key: string]: FN;
}

export default async function getI18nAsync<T extends object>(fnMap: I18nFnMap<T>, lang: LANGUAGE) {
  const fn = fnMap[transformI18nKey(lang)]
  const p = fn()
  let m: T | { default: T }
  let data: T
  if (isPromise(p)) {
    m = await p
    if (m && typeof m === 'object' && 'default' in m) {
      data = m.default as T
    } else {
      data = m as T
    }
  } else {
    m = p as T
    data = m as T
  }
  return data
}
