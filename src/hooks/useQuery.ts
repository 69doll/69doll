import useQueryFn from "./useQueryFn";

interface UseQueryOptions extends Omit<RequestInit, 'body'> {
  fetchOnMount?: boolean,
  body?: RequestInit['body'] | object,
}

export default function useQuery<D>(input: string | URL | Request, options?: UseQueryOptions) {
  const { fetchOnMount = true, ...otherOptions } = options || {}
  return useQueryFn<D>(async () => {
    const realOptions = otherOptions as RequestInit
    realOptions.body = typeof realOptions.body === 'object' ? JSON.stringify(realOptions.body) : realOptions.body
    realOptions.headers = { 'Content-Type': 'application/json', ...(realOptions.headers ?? {}) }
    return fetch(input, realOptions)
      .then((res) => res.json() as any)
  }, { fetchOnMount })
}
