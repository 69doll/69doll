import { redirect } from "react-router-dom"
import type { ApiResBody } from "@/types/api.type"

export async function checkRes (res: Response) {
  if (res.status >= 400) return false
  const content = await res.text()
  if (!(
    (content.startsWith('[') && content.endsWith(']')) ||
    (content.startsWith('{') && content.endsWith('}'))
  )) {
    throw new Error('Body is not a JSON value')
  }
  const obj = await res.json() as ApiResBody
  if (obj.code === 409) {
    redirect('/signin')
    return false
  }
  return true
}
