import { useEffect, useState } from "react";

interface UseQueryOptions extends Omit<RequestInit, 'body'> {
  fetchOnMount?: boolean,
  body?: RequestInit['body'] | object,
}

export default function useQuery<D>(input: string | URL | Request, options?: UseQueryOptions) {
  const { fetchOnMount = true, ...otherOptions } = options || {}
  const [data, setData] = useState<D>()
  const [error, setError] = useState(undefined)
  const [isLoading, setLoading] = useState(false)
  const [isDone, setDone] = useState(false)
  const refetch = async () => {
    setLoading(true)
    setDone(false)
    const realOptions = otherOptions as RequestInit
    realOptions.body = typeof realOptions.body === 'object' ? JSON.stringify(realOptions.body) : realOptions.body
    realOptions.headers = { 'Content-Type': 'application/json', ...(realOptions.headers ?? {}) }
    return fetch(input, realOptions)
      .then((res) => setData(res.json() as any))
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false)
        setDone(true)
      })
  }
  useEffect(() => {
    fetchOnMount && refetch()
  }, [])
  return {
    data,
    error,
    isLoading,
    isDone,
    refetch,
  }
}
