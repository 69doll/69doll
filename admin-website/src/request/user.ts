import type { ApiReqPage, ApiResBody, ApiResBodyPage } from '@/types/api.type'
import SHA1 from 'crypto-js/sha1'

export interface User {
  createdAt: string,
  email: string,
  id: number,
  nickname: string,
  status: boolean,
  updatedAt: string,
}

interface CurrentUser {
  code: number,
  message: string,
  data: User,
}

// #region Current User

export const getCurrentUserCacheKeys = () => ['current_user']

export async function getCurrentUser () {
  const url = new URL('/api/admin/user/current_user', location.origin)
  const res = await fetch(url)
  return await res.json() as CurrentUser
}

// #endregion Current User

export const UserType = {
  ADMIN: 'ADMIN',
  APP: 'APP',
} as const

export type UserType = typeof UserType[keyof typeof UserType]

// #region User List

type UserListOptions = ApiReqPage<{
  type: UserType,
}>

type UserList = ApiResBodyPage<User[]>

export const getUserListCacheKeys = (options?: Partial<UserListOptions>) => {
  const keys = ['user_list']
  options?.type && keys.push(`type=${options.type}`)
  options?.pageNum && keys.push(`pageNum=${options.pageNum}`)
  options?.pageSize && keys.push(`pageSize=${options.pageSize}`)
  return keys
}

export async function getUserList (options?: Partial<UserListOptions>) {
  const url = new URL('/api/admin/user/page', location.origin)
  options?.type && url.searchParams.set('type', options.type)
  options?.pageNum && url.searchParams.set('pageNum', options.pageNum.toString())
  options?.pageSize && url.searchParams.set('pageSize', options.pageSize.toString())
  const res = await fetch(url)
  return await res.json() as UserList
}

// #endregion User List

// #region Create User

type AddUserInfo = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
  type: UserType,
  rawPassword: string,
}

export async function createUser (userInfo: AddUserInfo) {
  const url = new URL('/api/admin/user/create', location.origin)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...userInfo,
      rawPassword: SHA1(userInfo.rawPassword).toString(),
    }),
  })
  return await res.json() as ApiResBody
}

// #endregion Create User

// #region Update User

type UpdateUserInfo = Omit<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>

export async function updateUser (id: number, userInfo: UpdateUserInfo) {
  const url = new URL('/api/admin/user/update', location.origin)
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...userInfo, id }),
  })
  return await res.json() as ApiResBody
}

// #endregion Update User
