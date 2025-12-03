import { checkRes, getDefaultHeaders, redirectSignInPage, setUrlSearchParams } from "./common"
import { API_BASE_URL } from "@/constant"
import { hasAuthorization } from "@/store/authorization"
import type { ApiResBody } from "@/types/api.type"
import type { ID } from "@/types/bean"

export interface CategoryAttribute {
  categoryId: ID,
  createdAt: string,
  customizable: boolean,
  id: ID,
  name: string,
  salable: boolean,
  searchable: boolean,
  updatedAt: string,
  valuesJson: string
}

// #region Category Attribute Detail

export type CategoryAttributeDetailOptions = Pick<CategoryAttribute, 'categoryId'>

export type CategoryAttributeDetail = ApiResBody<{ data: CategoryAttribute[] }>

export async function getCategoryAttribute (options: CategoryAttributeDetailOptions) {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL('/api/admin/category_attribute/list_by_category_id', API_BASE_URL)
  setUrlSearchParams(url, { categoryId: options.categoryId })
  const res = await fetch(url, {
    headers: getDefaultHeaders(),
  })
  await checkRes(res)
  return await res.json() as ApiResBody<{ data: CategoryAttribute[] }>
}

// #endregion Category Attribute Detail

// #region Update Category Attribute

export async function updateCategoryAttribute (id: ID, body: Partial<Omit<CategoryAttribute, 'createdAt' | 'id' | ' updatedAt'>>) {
  const url = new URL('/api/admin/category_attribute/update', API_BASE_URL)
  const res = await fetch(url, {
    method: 'PUT',
    headers: getDefaultHeaders(),
    body: JSON.stringify({
      id: id,
      ...body,
    }),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Update Category Attribute

// #region Delete Category Attribute

export async function deleteCategoryAttribute (id: number) {
  const url = new URL('/api/admin/category_attribute/delete', API_BASE_URL)
  const res = await fetch(url, {
    method: 'DELETE',
    headers: getDefaultHeaders(),
    body: JSON.stringify({ id }),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Delete Category Attribute
