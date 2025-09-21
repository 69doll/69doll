import type { ApiResBody } from "@/types/api.type"

export interface Category {
  createdAt: string,
  id: number,
  level: number,
  name: string,
  parentId: number,
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
  const url = new URL('/api/admin/category/list', location.origin)
  options?.name && url.searchParams.set('name', options.name)
  options?.parentId && url.searchParams.set('parentId', options.parentId.toString())
  const res = await fetch(url)
  return await res.json() as CategoryList
}

// #endregion Category All List

// #region Create Category

type AddCategoryInfo = Pick<Category, 'name' | 'parentId'>

export async function createCategory (body: AddCategoryInfo) {
  const url = new URL('/api/admin/category/create', location.origin)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return await res.json() as ApiResBody
}

// #endregion Create Category

// #region Update Category

type UpdateCategory = Pick<Category, 'name'>

export async function updateCategory (id: number, body: UpdateCategory) {
  const url = new URL('/api/admin/category/update', location.origin)
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...body, id }),
  })
  return await res.json() as ApiResBody
}

// #endregion Update Category

// #region Delete Category

export async function deleteCategory (id: number) {
  const url = new URL('/api/admin/category/delete', location.origin)
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
  return await res.json() as ApiResBody
}

// #endregion Delete Category
