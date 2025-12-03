import type { Brand } from "./brand";
import type { Category } from "./category";
import { checkRes, getDefaultHeaders, redirectSignInPage, setUrlSearchParams } from "./common";
import type { ApiReqPage, ApiResBody, ApiResBodyPage } from "@/types/api.type";
import { API_BASE_URL } from "@/constant";
import { hasAuthorization } from "@/store/authorization";
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
  const keys = [
    'product',
    'list',
    { name: options?.name, pageNum: options?.pageNum, pageSize: options?.pageSize },
  ]
  return keys
}

export async function getProductList (options?: Partial<ProductListOptions>) {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL('/api/admin/product/page', API_BASE_URL)
  setUrlSearchParams(url, options)
  const res = await fetch(url, {
    headers: getDefaultHeaders(),
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
  const keys = ['product', 'detail', { id }]
  return keys
}

export async function getProductDetail (id: ID) {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL(`/api/admin/product/detail/${id}`, API_BASE_URL)
  const res = await fetch(url, {
    headers: getDefaultHeaders(),
  })
  await checkRes(res)
  return await res.json() as ApiResBody<{ data: Product }>
}

// #endregion Product Detail

export interface SpuParam {
  brandId?: Brand["id"];
  categoryId?: Category["id"];
  description?: string;
  extra?: string;
  id?: ID;
  images?: string;
  mainImage?: string;
  name?: string;
  saleAttributesConfig?: string;
  seoConfig?: string;
  sn?: string;
  specificationsConfig?: string;
  status?: number;
}

export interface SkuParam {
  attributesConfig?: string;
  code?: string;
  customizationConfig?: string;
  extra?: string;
  id?: ID;
  images?: string;
  name?: string;
  originalPrice?: number;
  price?: number;
  spuId?: SPU["id"];
}

// #region Create Product

type CreateProductBody = {
  spu: SpuParam,
  skus: SkuParam[],
}

export async function createProduct (body: CreateProductBody) {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL('/api/admin/product/create', API_BASE_URL)
  const res = await fetch(url, {
    method: 'POST',
    headers: getDefaultHeaders(),
    body: JSON.stringify(body),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Create Product

// #region Update Product

type UpdateProductBody = {
  spu: SpuParam,
  skus: SkuParam[],
}

export async function updateProduct (body: UpdateProductBody) {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL('/api/admin/product/update', API_BASE_URL)
  const res = await fetch(url, {
    method: 'PUT',
    headers: getDefaultHeaders(),
    body: JSON.stringify(body),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Update Product

// #region Delete Product

export async function deleteProduct (id: ID) {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL('/api/admin/product/delete', API_BASE_URL)
  const res = await fetch(url, {
    method: 'DELETE',
    headers: getDefaultHeaders(),
    body: JSON.stringify({ id }),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Delete Product
