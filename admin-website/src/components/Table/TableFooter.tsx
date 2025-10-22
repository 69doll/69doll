import type React from "react";
import { Doll69If } from "shared";
import { Select, SelectItem } from "@radix-ui/react-select";
import { useMemo } from "react";
import { SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import css from './TableFooter.module.scss'

export type TableFooterOnValueChange = (params: { pageNum: number, pageSize?: number }) => any

export type TableFooterProps = {
  pageNum?: number,
  totalNum?: number,
  totalPageNum?: number,
  pageSize?: number,
  pageSizes?: number[],
  onValueChange?: TableFooterOnValueChange,
  disabled?: boolean,
}

const TableFooter: React.FC<TableFooterProps> = ({
  pageNum,
  totalNum,
  totalPageNum,
  pageSize,
  pageSizes,
  onValueChange,
  disabled,
}) => {
  const defaultPageSize = useMemo(() => pageSize?.toString(), [pageSize])
  const pageSizeList = useMemo(() => pageSizes?.map((ps) => ps.toString()) ?? [], [pageSizes])
  const changePageSize = (ps: string) => {
    onValueChange?.({
      pageNum: 1,
      pageSize: Number(ps),
    })
  }
  const setPageNum = (v: number) => {
    onValueChange?.({
      pageSize,
      pageNum: v,
    })
  }
  return <div className={css.tableFooter}>
    <div className={css.left}>
      <Doll69If display={!!totalNum}>
        <div className={css.tableCount}>
          <span>共</span>
          <span>{totalNum}</span>
          <span>条</span>
        </div>
      </Doll69If>
      <Doll69If display={!!pageSize && pageSizeList?.length >= 1}>
        <Select
          defaultValue={defaultPageSize}
          onValueChange={(v) => changePageSize(v)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue>{pageSize}</SelectValue>条/页
          </SelectTrigger>
          <SelectContent>
            {
              pageSizeList.map((ps, index) => <SelectItem key={index} value={ps}>{ps}条/页</SelectItem>)
            }
          </SelectContent>
        </Select>
      </Doll69If>
    </div>
    <div className={css.right}>
      <Doll69If display={typeof totalPageNum === 'number' && totalPageNum > 1}>
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => pageNum && pageNum !== 1 && setPageNum(pageNum - 1)} />
            </PaginationItem>
            <Doll69If display={pageNum === 1}>
              <PaginationItem>
                <div className="size-9" />
              </PaginationItem>
            </Doll69If>
            {
              Array(totalPageNum).fill(undefined).map((_, index) => {
                const currentPageNum = index + 1
                const isDisplay = pageNum && [pageNum - 1, pageNum, pageNum + 1].includes(currentPageNum)
                if (!isDisplay) return <></>
                return <>
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => setPageNum(currentPageNum)}
                      isActive={pageNum === currentPageNum}
                    >{currentPageNum}</PaginationLink>
                  </PaginationItem>
                </>
              })
            }
            <Doll69If display={pageNum === totalPageNum}>
              <PaginationItem>
                <div className="size-9" />
              </PaginationItem>
            </Doll69If>
            <PaginationItem>
              <PaginationNext href="#" onClick={() => pageNum && totalPageNum && pageNum < totalPageNum && setPageNum(pageNum + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Doll69If>
    </div>
  </div>
}

export default TableFooter
