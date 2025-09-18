import { useMemo } from "react";
import { useQueryFn } from "./useQueryFn";

interface UseQueryOptions extends Omit<RequestInit, 'body'> {
  fetchOnMount?: boolean,
  body?: RequestInit['body'] | object,
}

export function useQuery<D>(input: string | URL | Request, options?: UseQueryOptions) {
  const fetchOnMount = useMemo(() => options?.fetchOnMount ?? true, [options])
  const realInput = useMemo(() => input, [input])
  const realOptions = useMemo(() => {
    const { fetchOnMount, ...otherOptions } = options ?? {}
    const realOptions = otherOptions as RequestInit
    realOptions.credentials = 'include'
    realOptions.body = typeof realOptions.body === 'object' ? JSON.stringify(realOptions.body) : realOptions.body
    realOptions.headers = Object.assign(
      {},
      realOptions.method && realOptions.method.toUpperCase() !== 'GET' && { 'Content-Type': 'application/json' },
      realOptions.headers ?? {}
    )
    return realOptions
  }, [options])
  const realFn = useMemo(() => {
    return async () => {
      return fetch(realInput, realOptions).then((res) => res.json() as any)
    }
  }, [realInput, realOptions])
  return useQueryFn<D>(realFn, { fetchOnMount })
}
