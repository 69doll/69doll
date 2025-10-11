import { useMemo } from "react";
import type { TableFooterOnValueChange } from "./TableFooter";
import usePageNum from "@/hooks/usePageNum";
import usePageSize from "@/hooks/usePageSize";
import type { ApiResBodyPage } from "@/types/api.type";

export interface UseTableFooterDataOptions {
  defaultSize?: number,
  sizes?: number[],
}

export const useTableFooterData = (opts: UseTableFooterDataOptions = {}) => {
  const { defaultSize, sizes = [] } = opts
  const [pageNum, setPageNum] = usePageNum()
  const [pageSize, setPageSize] = usePageSize(defaultSize ?? sizes[0])

  return {
    pageNum,
    pageSize,
    setPageNum,
    setPageSize,
    useFooterData: <D extends ApiResBodyPage<any[]>>(data?: D) => {
      const list = useMemo<D['data']['list']>(() => {
        return data?.data?.list ?? []
      }, [data])
      const totalNum = useMemo(() => {
        return data?.data?.total ?? list.length
      }, [data])
      const totalPageNum = useMemo(() => {
        return data?.data?.totalPage ?? 1
      }, [data])
      const onPageChange: TableFooterOnValueChange = useMemo(() => ({ pageNum: nextPageNum, pageSize: nextPageSize }) => {
        if (nextPageSize && nextPageSize !== pageSize) {
          setPageNum(1)
          setPageSize(nextPageSize)
        } else {
          setPageNum(nextPageNum)
        }
      }, [pageSize])
      const footerProps = useMemo(() => ({
        pageNum: pageNum,
        totalNum: totalNum,
        totalPageNum: totalPageNum,
        pageSize: pageSize,
        pageSizes: sizes,
        onValueChange: onPageChange,
      }), [pageNum, totalNum, totalPageNum, pageSize, sizes, onPageChange])
      return {
        list,
        footerProps,
      }
    },
  }
}
