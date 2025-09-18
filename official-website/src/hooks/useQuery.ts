import { useEffect, useMemo } from "react";
import useQueryFn from "./useQueryFn";

interface UseQueryOptions extends Omit<RequestInit, 'body'> {
  fetchOnMount?: boolean,
  body?: RequestInit['body'] | object,
}

export default function useQuery<D>(input: string | URL | Request, options?: UseQueryOptions) {
  const { fetchOnMount = true, ...otherOptions } = options || {}
  const abortContainer = useMemo(() => new AbortController(), [])
  useEffect(() => {
    return () => {
      abortContainer.abort()
    }
  })
  return useQueryFn<D>(async () => {
    const realOptions = otherOptions as RequestInit
    realOptions.signal = abortContainer.signal
    realOptions.credentials = 'include'
    realOptions.body = typeof realOptions.body === 'object' ? JSON.stringify(realOptions.body) : realOptions.body
    realOptions.headers = { 'Content-Type': 'application/json', ...(realOptions.headers ?? {}) }
    return fetch(input, realOptions)
      .then((res) => res.json() as any)
  }, { fetchOnMount })
}
