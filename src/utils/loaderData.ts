const HEAD_KEY = '__head__'
const DATA_URL_KEY = '__dataUrl__'
const I18N_KEY = '__i18n__'

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
    setI18n(content: object) {
      data[I18N_KEY] = content
      return this
    },
    getI18n: () => data[I18N_KEY] ?? {},
  }
}

export default loaderData
