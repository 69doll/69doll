import type React from "react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import tableCss from "../../styles/table.module.scss"
import TablePage from "@/components/Page/TablePage";
import { getComponentList, getComponentListCacheKeys, type Component } from "@/request/component";
import PageName from "@/components/Page/PageName";
import type { TablePageOnValueChange } from "@/components/Page/TablePage";
import TableDateCell from "@/components/Table/TableDateCell";
// import { Button } from "@/components/ui/button";
// import DeleteButton from "@/components/Button/DeleteButton";
import Image from "@/components/Image";
import { hasAuthorization } from "@/store/authorization";
import type { MappingTableOptions } from "@/components/Table/MappingTable";
import MappingTable from "@/components/Table/MappingTable";
import BrandName from "./components/BrandName";

const SUPPORT_PAGE_SIZE = [15, 25, 50, 100]

const Components: React.FC = () => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(SUPPORT_PAGE_SIZE[0])
  const { data, isFetching, refetch: refetchList } = useQuery({
    queryKey: getComponentListCacheKeys({ pageSize, pageNum }),
    queryFn: () => getComponentList({ pageSize, pageNum }),
    enabled: hasAuthorization(),
  })
  const list = useMemo(() => data?.data?.list ?? [], [data])
  const totalPageNum = useMemo(() => data?.data?.totalPage ?? 1, [data])
  const onPageChange: TablePageOnValueChange = ({ pageNum: nextPageNum, pageSize: nextPageSize }) => {
    if (nextPageSize && nextPageSize !== pageSize) {
      setPageNum(1)
      setPageSize(nextPageSize)
    } else {
      setPageNum(nextPageNum)
    }
  }

  const tableOptions: MappingTableOptions<Component> = [
    {
      name: '配件图',
      index: 'picture',
      className: tableCss.icon,
      render(value) {
        return <Image src={value} />
      },
    },
    {
      name: '配件名',
      index: 'name',
      render (_, __, data) {
        return `${data.name} (ID:${data.id})`
      },
    },
    {
      name: '品牌',
      index: 'brandId',
      render (value) {
        return <BrandName id={value} />
      },
    },
    {
      name: '类型',
      index: 'type',
    },
    {
      name: '价格',
      index: 'price',
      render (value) {
        return value / 100
      },
    },
    {
      name: 'SN',
      index: 'sn',
    },
    {
      name: '创建时间',
      index: 'createdAt',
      className: tableCss.date,
      render (value) {
        return <TableDateCell date={value} />
      },
    },
    {
      name: '操作',
      index: 'id',
      className: tableCss.actions,
      render () {
        return <></>
      },
    },
  ]

  return (<>
    <TablePage
      label={<PageName name='配件管理' isLoading={isFetching} onRefresh={refetchList} />}
      pageNum={pageNum}
      totalNum={list.length}
      totalPageNum={totalPageNum}
      pageSize={pageSize}
      pageSizes={SUPPORT_PAGE_SIZE}
      onValueChange={onPageChange}
    >
      <MappingTable
        options={tableOptions}
        sourceData={list}
        isLoading={isFetching}
        pageSize={pageSize}
      />
    </TablePage>
  </>)
}

export default Components
