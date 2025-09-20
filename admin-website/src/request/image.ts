import type { ApiResBody } from "@/types/api.type"

type UploadImage = ApiResBody<{
  data: {
    keys: [string],
  },
}>

export async function uploadImage (file: File) {
  const formData = new FormData()
  formData.append('files', file)
  const res = await fetch('/api/admin/aws/s3/upload', {
    method: 'POST',
    body: formData,
  })
  const data = await res.json() as UploadImage
  return data
}
