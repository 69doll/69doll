import SHA1 from 'crypto-js/sha1'
import { checkRes } from './common'
import { API_BASE_URL } from '@/constant'
import { getAuthorization } from '@/store/authorization'
import type { ApiReqPage, ApiResBody, ApiResBodyPage } from '@/types/api.type'
import type { ID } from '@/types/bean'

export interface User {
  createdAt: string,
  email: string,
  id: ID,
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
  const url = new URL('/api/admin/user/current_user', API_BASE_URL)
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  await checkRes(res)
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
  const url = new URL('/api/admin/user/page', API_BASE_URL)
  options?.type && url.searchParams.set('type', options.type)
  options?.pageNum && url.searchParams.set('pageNum', options.pageNum.toString())
  options?.pageSize && url.searchParams.set('pageSize', options.pageSize.toString())
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  await checkRes(res)
  return await res.json() as UserList
}

// #endregion User List

// #region Create User

type AddUserInfo = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
  type: UserType,
  rawPassword: string,
}

export async function createUser (userInfo: AddUserInfo) {
  const url = new URL('/api/admin/user/create', API_BASE_URL)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
    body: JSON.stringify({
      ...userInfo,
      rawPassword: SHA1(userInfo.rawPassword).toString(),
    }),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Create User

// #region Update User

type UpdateUserInfo = Omit<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>

export async function updateUser (id: number, userInfo: UpdateUserInfo) {
  const url = new URL('/api/admin/user/update', API_BASE_URL)
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
    body: JSON.stringify({ ...userInfo, id }),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Update User

// #region Delete User

export async function deleteUser (id: number) {
  const url = new URL('/api/admin/user/delete', API_BASE_URL)
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
    body: JSON.stringify({ id }),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Delete User

// #region Reset User Password

export async function resetUserPassword (id: number, passwordObj: { oldRawPassword: string, newRawPassword: string, doubleConfirmNewRawPassword: string }) {
  const url = new URL('/api/admin/user/reset_password', API_BASE_URL)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
    body: JSON.stringify({
      oldRawPassword: SHA1(passwordObj.oldRawPassword).toString(),
      newRawPassword: SHA1(passwordObj.newRawPassword).toString(),
      doubleConfirmNewRawPassword: SHA1(passwordObj.doubleConfirmNewRawPassword).toString(),
      id,
    }),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Reset User Password
