import { useEffect, useMemo, useState } from "react";

interface UseQueryFnOptions<D>  {
  fetchOnMount?: boolean,
  defaultData?: D,
}

export function useQueryFn<D>(fn: () => Promise<D>, options?: UseQueryFnOptions<D>) {
  const { fetchOnMount = true, defaultData } = options || {}
  const [data, setData] = useState<D>(defaultData as any)
  const [error, setError] = useState(undefined)
  const [isLoading, setLoading] = useState(false)
  const [isDone, setDone] = useState(false)
  const haveData = useMemo(() => !!data, [data])
  const realFn = useMemo(() => fn, [fn])
  async function refetch () {
    setLoading(true)
    setDone(false)
    return realFn()
      .then((data) => {
        setData(data)
      })
      .catch((e) => {
        setData(undefined!)
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
  function reset () {
    setData(defaultData as any)
    setError(undefined)
    setLoading(false)
    setDone(false)
  }
  return {
    data,
    error,
    isLoading,
    haveData,
    isDone,
    refetch,
    reset,
  }
}
