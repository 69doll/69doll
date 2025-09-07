interface IGetImageUrlOptions {
  cdn?: boolean,
  resize?: {
    width: number,
  } | {
    height: number,
  } | {
    height: number,
    width: number,
  },
}

const CDN_DOMAIN = import.meta.env.VITE_API_CDN_DOMAIN
const IS_CF_CDN = import.meta.env.VITE_API_CDN_SERVICE === 'CF'

export default function getImageUrl (originUrl: string, opts: IGetImageUrlOptions = {}) {
  const isAbsUrl = /^(\w+:)?\/\//.test(originUrl)
  if (!CDN_DOMAIN || isAbsUrl || !opts.cdn) return originUrl
  const collection: string[] = []
  collection.push(CDN_DOMAIN)
  if (IS_CF_CDN && opts.resize) {
    const prefix = '/cdn-cgi/image/'
    const resizeOptions = Object.entries(opts.resize).map(([k, v]) => `${k}=${v}`).join(',')
    collection.push(`${prefix}${resizeOptions}`)
  }
  collection.push(originUrl)
  return collection.join('')
}
