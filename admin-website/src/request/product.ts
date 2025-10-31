import type { Brand } from "./brand";
import type { Category } from "./category";
import { checkRes, redirectSignInPage } from "./common";
import type { ApiReqPage, ApiResBody, ApiResBodyPage } from "@/types/api.type";
import { API_BASE_URL } from "@/constant";
import { getAuthorization, hasAuthorization } from "@/store/authorization";
import type { ID } from "@/types/bean";

export interface SPU {
  brandId: Brand["id"],
  categoryId: Category["id"],
  createdAt: string,
  extra: string,
  id: number,
  mainImage: string,
  name: string,
  seoConfig: string,
  sn: string,
  updatedAt: string,
  status: boolean,
}

export interface SKU {
  attributesConfig: string,
  code: string,
  createdAt: string,
  customizationConfig: string,
  extra: string,
  id: number,
  images: string,
  name: string,
  originalPrice: number,
  price: number,
  spuId: SPU["id"],
  updatedAt: string,
}
// #region Product List

type ProductListOptions = ApiReqPage<{
  name: string,
}>

type ProductList = ApiResBodyPage<SPU[]>

export const getProductListCacheKeys = (options?: Partial<ProductListOptions>) => {
  const keys = ['product_list']
  options?.name && keys.push(`name=${options.name}`)
  options?.pageNum && keys.push(`pageNum=${options.pageNum}`)
  options?.pageSize && keys.push(`pageSize=${options.pageSize}`)
  return keys
}

export async function getProductList (options?: Partial<ProductListOptions>) {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL('/api/admin/product/page', API_BASE_URL)
  options?.name && url.searchParams.set('name', options.name)
  options?.pageNum && url.searchParams.set('pageNum', options.pageNum.toString())
  options?.pageSize && url.searchParams.set('pageSize', options.pageSize.toString())
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  await checkRes(res)
  return await res.json() as ProductList
}

// #endregion Product List

// #region Product Detail

type Product = {
  skus: SKU[],
  spu: SPU,
}

export const getProductDetailCacheKeys = (id: ID) => {
  const keys = ['product', `id=${id}`]
  return keys
}

export async function getProductDetail (id: ID) {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL(`/api/admin/product/detail/${id}`, API_BASE_URL)
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  await checkRes(res)
  return await res.json() as ApiResBody<{ data: Product }>
}

// #endregion Product Detail
