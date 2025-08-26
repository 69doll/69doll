const HEAD_KEY = 'head'
const DATA_URL_KEY = 'dataUrl'

const loaderData = (oldData: Record<string|number|symbol, any> = {}) => {
  const data = oldData
  return {
    setTitle(title: string) {
      data[HEAD_KEY] ??= {}
      data[HEAD_KEY].title = title
      return this
    },
    getTitle: () => data[HEAD_KEY]?.title as string | undefined,
    setMetaData(object: object) {
      data[HEAD_KEY] ??= {}
      data[HEAD_KEY].metaData ??= []
      data[HEAD_KEY].metaData.push(object)
      return this
    },
    getMetaData: () => data[HEAD_KEY]?.metaData ?? [],
    set(key: string | symbol, value: any) {
      data[key] = value
      return this
    },
    get: <V = any>(key: string | symbol) => data[key] as V,
    setDataUrl: (url: string) => data[DATA_URL_KEY] = url,
    geDataUrl: () => data[DATA_URL_KEY] as string | undefined,
  }
}

export default loaderData
