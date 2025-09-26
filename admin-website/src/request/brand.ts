import { API_BASE_URL } from "@/constant"
import { getAuthorization } from "@/store/authorization"
import type { ApiReqPage, ApiResBody, ApiResBodyPage } from "@/types/api.type"

export interface Brand {
  createdAt: string,
  id: number,
  logo: string,
  name: string,
  updatedAt: string,
}

// #region Brand All List

type BrandAllListOptions = Pick<Brand, 'id' | 'name'>

type BrandAllList = ApiResBody<{
  data: Brand[],
}>

export const getBrandAllListCacheKeys = (options?: Partial<BrandAllListOptions>) => {
  const keys = ['brand_all_list']
  options?.id && keys.push(`id=${options.id.toString()}`)
  options?.name && keys.push(`name=${options.name}`)
  return keys
}

export const getBrandAllList = async (options?: Partial<BrandAllListOptions>) => {
  const url = new URL('/api/admin/brand/list', API_BASE_URL)
  options?.id && url.searchParams.set('id', options.id.toString())
  options?.name && url.searchParams.set('name', options.name)
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  return await res.json() as BrandAllList
}

// #endregion Brand All List

// #region Brand List

type BrandListOptions = Pick<Brand, 'id' | 'name'>

type BrandList = ApiResBodyPage<Brand[]>

export const getBrandListCacheKeys = (options?: Partial<ApiReqPage<BrandListOptions>>) => {
  const keys = ['brand_list']
  options?.pageNum && keys.push(`id=${options.pageNum.toString()}`)
  options?.pageSize && keys.push(`id=${options.pageSize.toString()}`)
  options?.id && keys.push(`id=${options.id.toString()}`)
  options?.name && keys.push(`name=${options.name}`)
  return keys
}

export const getBrandList = async (options?: Partial<ApiReqPage<BrandListOptions>>) => {
  const url = new URL('/api/admin/brand/page', API_BASE_URL)
  options?.pageNum && url.searchParams.set('pageNum', options.pageNum.toString())
  options?.pageSize && url.searchParams.set('pageSize', options.pageSize.toString())
  options?.id && url.searchParams.set('id', options.id.toString())
  options?.name && url.searchParams.set('name', options.name)
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  return await res.json() as BrandList
}

// #endregion Brand List

// #region Create Brand

type AddBrandInfo = Pick<Brand, 'name' | 'logo'>

export async function createBrand (body: AddBrandInfo) {
  const url = new URL('/api/admin/brand/create', API_BASE_URL)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
    body: JSON.stringify(body),
  })
  return await res.json() as ApiResBody
}

// #endregion Create Brand

// #region Update Brand

type UpdateBrand = Pick<Brand, 'name' | 'logo'>

export async function updateBrand (id: number, body: UpdateBrand) {
  const url = new URL('/api/admin/brand/update', API_BASE_URL)
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
    body: JSON.stringify({ ...body, id }),
  })
  return await res.json() as ApiResBody
}

// #endregion Update Brand

// #region Delete Brand

export async function deleteBrand (id: number) {
  const url = new URL('/api/admin/brand/delete', API_BASE_URL)
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
    body: JSON.stringify({ id }),
  })
  return await res.json() as ApiResBody
}

// #endregion Delete Brand
