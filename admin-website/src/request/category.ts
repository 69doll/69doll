import { checkRes, getDefaultHeaders, redirectSignInPage, setUrlSearchParams } from "./common"
import { API_BASE_URL } from "@/constant"
import { hasAuthorization } from "@/store/authorization"
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

export type CategoryAllListOptions = Pick<Category, 'name' | 'parentId'>

export type CategoryAllList = ApiResBody<{
  data: Category[],
}>

export const getCategoryAllList = async (options?: Partial<CategoryAllListOptions>) => {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL('/api/admin/category/list', API_BASE_URL)
  setUrlSearchParams(url, options)
  const res = await fetch(url, {
    headers: getDefaultHeaders(),
  })
  await checkRes(res)
  return await res.json() as CategoryAllList
}

// #endregion Category All List

// #region Create Category

export type AddCategoryInfo = Pick<Category, 'name' | 'parentId'>

export async function createCategory (body: AddCategoryInfo) {
  const url = new URL('/api/admin/category/create', API_BASE_URL)
  const res = await fetch(url, {
    method: 'POST',
    headers: getDefaultHeaders(),
    body: JSON.stringify(body),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Create Category

// #region Update Category

export type UpdateCategory = Pick<Category, 'name'>

export async function updateCategory (id: ID, body: UpdateCategory) {
  const url = new URL('/api/admin/category/update', API_BASE_URL)
  const res = await fetch(url, {
    method: 'PUT',
    headers: getDefaultHeaders(),
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
    headers: getDefaultHeaders(),
    body: JSON.stringify({ id }),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Delete Category
