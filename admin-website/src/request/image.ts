import { castArray } from "es-toolkit/compat"
import { checkRes, redirectSignInPage } from "./common"
import { API_BASE_URL } from "@/constant"
import { getAuthorization, hasAuthorization } from "@/store/authorization"
import type { ApiReqPage, ApiResBody, ApiResBodyPage } from "@/types/api.type"
import type { ID } from "@/types/bean"

type ImageKey = string

export interface Image {
  createdAt: string,
  id: ID,
  key: ImageKey,
  updatedAt: string,
}

type UploadImage = ApiResBody<{
  data: {
    keys: [ImageKey],
  },
}>

export async function uploadImage (file: File) {
  const url = new URL('/api/admin/image/upload', API_BASE_URL)
  const formData = new FormData()
  formData.append('files', file)
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: getAuthorization()!,
    },
  })
  await checkRes(res)
  const data = await res.json() as UploadImage
  return data
}

// #region Image List

type ImageListOptions = ApiReqPage<{
  id: ID,
  key: ImageKey,
}>

type ImageList = ApiResBodyPage<Image[]>

export const getImageListCacheKeys = (options?: Partial<ImageListOptions>) => {
  const keys = ['image_list']
  options?.pageNum && keys.push(`pageNum=${options.pageNum}`)
  options?.pageSize && keys.push(`pageSize=${options.pageSize}`)
  options?.id && keys.push(`id=${options.id}`)
  options?.key && keys.push(`key=${options.key}`)
  return keys
}

export async function getImageList (options?: Partial<ImageListOptions>) {
  if (!hasAuthorization()) redirectSignInPage(true)
  const url = new URL('/api/admin/image/page', API_BASE_URL)
  options?.pageNum && url.searchParams.set('pageNum', options.pageNum.toString())
  options?.pageSize && url.searchParams.set('pageSize', options.pageSize.toString())
  options?.id && url.searchParams.set('id', options.id.toString())
  options?.key && url.searchParams.set('key', options.key.toString())
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
  })
  await checkRes(res)
  return await res.json() as ImageList
}

// #endregion Image List

// #region Delete Image

export async function deleteImages (keyOrKeys: ImageKey) {
  const url = new URL('/api/admin/image/batch_delete', API_BASE_URL)
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthorization()!,
    },
    body: JSON.stringify({ keys: castArray(keyOrKeys) }),
  })
  await checkRes(res)
  return await res.json() as ApiResBody
}

// #endregion Delete Image
