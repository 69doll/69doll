export type ApiResBody<O extends object = {}> = {
  code: number,
  msg: string,
} & O
