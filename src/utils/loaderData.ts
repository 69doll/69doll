const HEAD_KEY = Symbol('head')

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
    get: (key: string | symbol) => data[key],
    toObject: () => data,
  }
}

export default loaderData
