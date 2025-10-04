import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function usePageSize (defaultValue?: number) {
  const [searchParams] = useSearchParams()
  const [pageSize, setPageSize] = useState<number>(defaultValue ?? 15)
  useEffect(() => {
    const queryPageSize = searchParams.get('pageSize')
    if (queryPageSize && Number(queryPageSize)) setPageSize(Number(queryPageSize))
  }, [])
  const realPageSize = useMemo(() => {
    if (!pageSize || pageSize <= 0 || Math.abs(pageSize) !== pageSize) {
      return 1
    }
    return pageSize
  }, [pageSize])
  useEffect(() => {
    searchParams.set('pageSize', realPageSize.toString())
  }, [realPageSize])
  return [realPageSize, setPageSize] as ReturnType<typeof useState<number>>
}
