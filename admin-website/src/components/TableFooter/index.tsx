import type React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Doll69If } from "shared";
import { Select, SelectItem } from "@radix-ui/react-select";
import { SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { useMemo } from "react";
import css from './style.module.scss'

export type TableFooterOnValueChange = (params: { pageNum: number, pageSize?: number }) => any

interface TableFooterProps {
  pageNum?: number,
  totalPageNum?: number,
  pageSize?: number,
  pageSizes?: number[],
  onValueChange?: TableFooterOnValueChange,
}

const TableFooter: React.FC<TableFooterProps> = ({ pageNum, totalPageNum, pageSize, pageSizes, onValueChange }) => {
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
    <Doll69If display={totalPageNum !== 1}>
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => pageNum !== 1 && setPageNum(pageNum - 1)} />
          </PaginationItem>
          <Doll69If display={pageNum === 1}>
            <PaginationItem>
              <div className="size-9" />
            </PaginationItem>
          </Doll69If>
          {
            Array(totalPageNum).fill(undefined).map((_, index) => {
              const currentPageNum = index + 1
              const isDisplay = [pageNum - 1, pageNum, pageNum + 1].includes(currentPageNum)
              if (!isDisplay) return <></>
              return <>
                <PaginationItem>
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
            <PaginationNext href="#" onClick={() => pageNum < totalPageNum && setPageNum(pageNum + 1)}/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Doll69If>
    <Doll69If display={!!pageSize && pageSizeList?.length >= 1}>
      <Select defaultValue={defaultPageSize} onValueChange={(v) => changePageSize(v)}>
        <SelectTrigger>
          每页<SelectValue>{pageSize}</SelectValue>条
        </SelectTrigger>
        <SelectContent>
          {
            pageSizeList.map((ps, index) => <SelectItem key={index} value={ps}>{ps}</SelectItem>)
          }
        </SelectContent>
      </Select>
    </Doll69If>
  </div>
}

export default TableFooter
