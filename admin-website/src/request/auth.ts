import type { ApiResBody } from "@/types/api.type"
import SHA1 from "crypto-js/sha1"

export async function signIn (formData: FormData) {
  const body = Object.fromEntries([...formData.entries()])
  body.password = SHA1(body.password as string).toString()

  const url = new URL('/api/admin/auth/login', import.meta.env.VITE_API_BASE_ADMIN_URL || location.origin)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json() as ApiResBody<{ data: { expireTime: number, tokenValue: string } }>
  if (data.code === 200) {
    sessionStorage.setItem('authorization', res.headers.get('authorization')!)
  }
  return data
}
