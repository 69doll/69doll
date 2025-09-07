import { useEffect, useState } from "react";

export default function useQuery<D>(input: string | URL | Request, options?: RequestInit & { fetchOnMount: boolean }) {
  const { fetchOnMount = true } = options || {}
  const [data, setData] = useState<D>()
  const [error, setError] = useState(undefined)
  const [isLoading, setLoading] = useState(false)
  const [isDone, setDone] = useState(false)
  const refetch = async () => {
    setLoading(true)
    setDone(false)
    return fetch(input, options)
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
