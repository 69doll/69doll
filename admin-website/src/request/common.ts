import { redirect } from "react-router-dom"
import type { ApiResBody } from "@/types/api.type"
import { setAuthorization } from "@/store/authorization"

export function redirectSignInPage () {
  setAuthorization()
  redirect('/signin')
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
