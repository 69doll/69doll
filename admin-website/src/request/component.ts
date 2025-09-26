import { API_BASE_URL } from "@/constant"
import type { ApiReqPage, ApiResBody, ApiResBodyPage } from "@/types/api.type"
import type { ID } from "./bean.d"
import { getAuthorization } from "@/store/authorization"

export interface Component {
  brandId: ID,
  createdAt: string,
  extra: string,
  id: ID,
  name: string,
  picture: string,
  price: number,
  sn: string,
  type: number,
  updatedAt: string,
}

// #region Component All List

type ComponentAllListOptions = Pick<Component, 'brandId' | 'id' | 'name' | 'type'>

type ComponentAllList = ApiResBody<{
  data: Component[],
}>

export const getComponentAllListCacheKeys = (options?: Partial<ComponentAllListOptions>) => {
  const keys = ['component_all_list']
  options?.brandId && keys.push(`brandId=${options.brandId}`)
  options?.id && keys.push(`id=${options.id}`)
  options?.name && keys.push(`name=${options.name}`)
  options?.type && keys.push(`type=${options.type}`)
  return keys
}

export const getComponentAllList = async (options?: Partial<ComponentAllListOptions>) => {
  const url = new URL('/api/admin/doll_component/list', API_BASE_URL)
  options?.brandId && url.searchParams.set('brandId', options.brandId.toString())
  options?.id && url.searchParams.set('id', options.id.toString())
  options?.name && url.searchParams.set('name', options.name)
  options?.type && url.searchParams.set('type', options.type.toString())
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  return await res.json() as ComponentAllList
}

// #endregion Component All List

// #region Component List

type ComponentListOptions = Pick<Component, 'brandId' | 'id' | 'name' | 'type'>

type ComponentList = ApiResBodyPage<Component[]>

export const getComponentListCacheKeys = (options?: Partial<ApiReqPage<ComponentListOptions>>) => {
  const keys = ['component_list']
  options?.brandId && keys.push(`brandId=${options.brandId}`)
  options?.id && keys.push(`id=${options.id}`)
  options?.name && keys.push(`name=${options.name}`)
  options?.type && keys.push(`type=${options.type}`)
  return keys
}

export const getComponentList = async (options?: Partial<ApiReqPage<ComponentListOptions>>) => {
  const url = new URL('/api/admin/doll_component/page', API_BASE_URL)
  options?.pageNum && url.searchParams.set('pageNum', options.pageNum.toString())
  options?.pageSize && url.searchParams.set('pageSize', options.pageSize.toString())
  options?.brandId && url.searchParams.set('brandId', options.brandId.toString())
  options?.id && url.searchParams.set('id', options.id.toString())
  options?.name && url.searchParams.set('name', options.name)
  options?.type && url.searchParams.set('type', options.type.toString())
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  return await res.json() as ComponentList
}

// #endregion Component List

// #region Create Component

type AddComponentInfo = Omit<Component, 'id' | 'createdAt' | 'updatedAt'>

export async function createComponent (body: AddComponentInfo) {
  const url = new URL('/api/admin/doll_component/create', API_BASE_URL)
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

// #endregion Create Component

// #region Update Component

type UpdateComponent = Omit<Component, 'id' | 'createdAt' | 'updatedAt'>

export async function updateComponent (id: ID, body: UpdateComponent) {
  const url = new URL('/api/admin/doll_component/update', API_BASE_URL)
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

// #endregion Update Component

// #region Delete Component

export async function deleteComponent (id: ID) {
  const url = new URL('/api/admin/doll_component/delete', API_BASE_URL)
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

// #endregion Delete Component
