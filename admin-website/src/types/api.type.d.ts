export type ApiReqPage<O extends object = object> = {
  pageNum: number,
  pageSize: number,
} & O

export type ApiResBody<O extends object = object> = {
  code: number,
  msg: string,
} & O

export type ApiResBodyPage<O extends unknown[] = []> = ApiResBody<{
  data: {
    list: O,
    page: number,
    pageSize: number,
    total: number,
    totalPage: number,
  },
}>
