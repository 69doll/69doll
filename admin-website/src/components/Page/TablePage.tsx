import type React from "react";
import { useMemo } from "react";
import type { TableFooterOnValueChange, TableFooterProps } from "../Table/TableFooter";
import TableFooter from "../Table/TableFooter";
import type { PageProps } from "./Page";
import Page from "./Page";

export type TablePageOnValueChange = TableFooterOnValueChange;

type TablePageProps = TableFooterProps & Omit<PageProps, 'footer'>

const TablePage: React.FC<React.PropsWithChildren<TablePageProps>> = ({
  children,
  pageNum,
  totalNum,
  totalPageNum,
  pageSize,
  pageSizes,
  onValueChange,
  ...props
}) => {
  const footer = useMemo(() => {
    const tableFooterProps = {
      pageNum,
      totalNum,
      totalPageNum,
      pageSize,
      pageSizes,
      onValueChange,
    }
    return <TableFooter {...tableFooterProps} />
  }, [pageNum, totalNum, totalPageNum, pageSize, pageSizes, onValueChange])
  return (<>
    <Page
      {...props}
      footer={footer}
    >
      {children}
    </Page>
  </>)
}

export default TablePage
