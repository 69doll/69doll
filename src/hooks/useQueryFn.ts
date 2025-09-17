import { useEffect, useMemo, useState } from "react";

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
  const haveData = useMemo(() => !!data, [data])
  const refetch = async () => {
    setLoading(true)
    setDone(false)
    return fn()
      .then((data) => {
        setData(data)
      })
      .catch((e) => {
        setData(undefined as any)
        setError(e)
      })
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
    haveData,
    isDone,
    refetch,
  }
}
