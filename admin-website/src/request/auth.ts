import { API_BASE_URL } from "@/constant"
import { setAuthorization } from "@/store/authorization"
import type { ApiResBody } from "@/types/api.type"
import SHA1 from "crypto-js/sha1"

export async function signIn (formData: FormData) {
  const body = Object.fromEntries([...formData.entries()])
  body.password = SHA1(body.password as string).toString()

  const url = new URL('/api/admin/auth/login', API_BASE_URL)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json() as ApiResBody<{ data: { expireTime: number, tokenValue: string } }>
  if (data.code === 200) {
    const token = res.headers.get('authorization')
    if (token) {
      setAuthorization(token)
      return data
    }
    console.error('Get Token Fail', token)
  }
  setAuthorization()
  return data
}

export async function signOut () {
  sessionStorage.removeItem('authorization')
}
