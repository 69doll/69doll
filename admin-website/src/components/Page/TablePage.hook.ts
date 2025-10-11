import { useTableFooterData, type UseTableFooterDataOptions } from "../Table/TableFooter.hook"

export type UseTablePageDataOptions = UseTableFooterDataOptions

export const useTablePageData = (opts?: UseTablePageDataOptions) => {
  return useTableFooterData(opts)
}
