import type { ApiResBody } from "@/api.type"

export interface Category {
  createdAt: string,
  id: number,
  level: number,
  name: string,
  parentId: number,
  path: string,
  updatedAt: string,
}

// #region Category List

type CategoryListOptions = Pick<Category, 'name' | 'parentId'>

type CategoryList = ApiResBody<{
  data: Category[],
}>

export const getCategoryListCacheKeys = (options?: Partial<CategoryListOptions>) => {
  const keys = ['category_list']
  options?.name && keys.push(`name=${options.name}`)
  options?.parentId && keys.push(`parentId=${options.parentId.toString()}`)
  return keys
}

export const getCategoryList = async (options?: Partial<CategoryListOptions>) => {
  const url = new URL('/api/admin/category/list', location.origin)
  options?.name && url.searchParams.set('name', options.name)
  options?.parentId && url.searchParams.set('parentId', options.parentId.toString())
  const res = await fetch(url)
  return await res.json() as CategoryList
}

// #endregion Category List

// #region Create User

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

// #endregion Create User

// #region Update User

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

// #endregion Update User

