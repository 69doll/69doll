import { useEffect, useState } from "react";

interface UseQueryFnOptions<D>  {
  fetchOnMount?: boolean,
  defaultData?: D,
}

export default function useQueryFn<D>(fn: () => Promise<D>, options?: UseQueryFnOptions<D>) {
  const { fetchOnMount = true, defaultData } = options || {}
  const [data, setData] = useState<D>(defaultData as any)
  const [error, setError] = useState(undefined)
  const [isLoading, setLoading] = useState(false)
  const [isDone, setDone] = useState(false)
  const refetch = async () => {
    setLoading(true)
    setDone(false)
    setData(defaultData as any)
    return fn()
      .then((data) => { setData(data) })
      .catch((e) => { setError(e) })
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
