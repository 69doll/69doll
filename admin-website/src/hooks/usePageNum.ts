import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function usePageNum () {
  const [searchParams] = useSearchParams()
  const [pageNum, setPageNum] = useState<number>(1)
  useEffect(() => {
    const queryPageNum = searchParams.get('pageNum')
    if (queryPageNum && Number(queryPageNum)) setPageNum(Number(queryPageNum))
  }, [])
  const realPageNum = useMemo(() => {
    if (!pageNum || pageNum <= 0 || Math.abs(pageNum) !== pageNum) {
      return 1
    }
    return pageNum
  }, [pageNum])
  useEffect(() => {
    searchParams.set('pageNum', realPageNum.toString())
  }, [realPageNum])
  return [realPageNum, setPageNum] as ReturnType<typeof useState<number>>
}
