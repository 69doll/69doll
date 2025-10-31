import { checkRes, redirectSignInPage } from "./common"
import { API_BASE_URL } from "@/constant"
import { getAuthorization, hasAuthorization } from "@/store/authorization"
import type { ApiResBody } from "@/types/api.type"
import type { ID } from "@/types/bean"

export interface Category {
  createdAt: string,
  id: ID,
  level: number,
  name: string,
  parentId: ID,
  path: string,
  updatedAt: string,
}

// #region Category All List

type CategoryListOptions = Pick<Category, 'name' | 'parentId'>

type CategoryList = ApiResBody<{
  data: Category[],
}>

export const getCategoryAllListCacheKeys = (options?: Partial<CategoryListOptions>) => {
  const keys = ['category_all_list']
  options?.name && keys.push(`name=${options.name}`)
  options?.parentId && keys.push(`parentId=${options.parentId.toString()}`)
  return keys
}

export const getCategoryAllList = async (options?: Partial<CategoryListOptions>) => {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL('/api/admin/category/list', API_BASE_URL)
  options?.name && url.searchParams.set('name', options.name)
  options?.parentId && url.searchParams.set('parentId', options.parentId.toString())
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  await checkRes(res)
  return await res.json() as CategoryList
}

// #endregion Category All List

// #region Create Category

type AddCategoryInfo = Pick<Category, 'name' | 'parentId'>

export async function createCategory (body: AddCategoryInfo) {
  const url = new URL('/api/admin/category/create', API_BASE_URL)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
    body: JSON.stringify(body),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Create Category

// #region Update Category

type UpdateCategory = Pick<Category, 'name'>

export async function updateCategory (id: number, body: UpdateCategory) {
  const url = new URL('/api/admin/category/update', API_BASE_URL)
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
    body: JSON.stringify({ ...body, id }),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Update Category

// #region Delete Category

export async function deleteCategory (id: number) {
  const url = new URL('/api/admin/category/delete', API_BASE_URL)
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

// #endregion Delete Category
