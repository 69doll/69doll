import type { URL } from "url"
import { redirect } from "react-router-dom"
import type { ApiResBody } from "@/types/api.type"
import { getAuthorization, setAuthorization } from "@/store/authorization"

export function getDefaultHeaders () {
  return {
    'Content-Type': 'application/json',
    Authorization: getAuthorization()!,
  }
}

export function setUrlSearchParams (url: URL, search: Record<string, string | number> = {}) {
  Object.entries(search).forEach(([key, value]) => {
    typeof value !== 'undefined' && url.searchParams.set(key, String(value))
  })
}

export function redirectSignInPage (throwErr = false) {
  setAuthorization()
  redirect('/signin')
  if (throwErr) {
    throw new Error('Invalid Error')
  }
}

export async function checkRes (res: Response) {
  if (res.status === 401) {
    redirectSignInPage()
    return false
  }
  if (res.status >= 400) return false

  const content = await res.text()
  if (!(
    (content.startsWith('[') && content.endsWith(']')) ||
    (content.startsWith('{') && content.endsWith('}'))
  )) {
    throw new Error('Body is not a JSON value')
  }
  res.text = () => Promise.resolve(content)

  const obj = JSON.parse(content) as ApiResBody
  if (obj.code === 401) {
    redirectSignInPage()
    return false
  }
  res.json = () => Promise.resolve(obj)

  return true
}
