import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useTableFooterData, type UseTableFooterDataOptions } from "../Table/TableFooter.hook"

export type UseTablePageDataOptions = UseTableFooterDataOptions

export const useTablePageData = (opts: UseTablePageDataOptions = {}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryPageNum = searchParams.get('pageNum')
  const queryPageSize = searchParams.get('pageSize')
  const {
    pageNum,
    setPageNum,
    pageSize,
    setPageSize,
    ...originOpts
  } = useTableFooterData({
    ...opts,
    defaultNum: queryPageNum ? Number(queryPageNum) : undefined,
    defaultSize: queryPageSize ? Number(queryPageSize) : undefined,
  })
  useEffect(() => {
    searchParams.set('pageNum', pageNum.toString())
    searchParams.set('pageSize', pageSize.toString())
    setSearchParams(searchParams)
  }, [pageNum, pageSize])
  return {
    pageNum,
    setPageNum,
    pageSize,
    setPageSize,
    ...originOpts,
  } as ReturnType<typeof useTableFooterData>
}
