import type React from "react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Doll69If } from "shared";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import tableCss from "../../styles/table.module.scss"
import TablePage from "@/components/Page/TablePage";
import { getComponentList, getComponentListCacheKeys } from "@/request/component";
import PageName from "@/components/Page/PageName";
import type { TablePageOnValueChange } from "@/components/Page/TablePage";
import TableDateCell from "@/components/Table/TableDateCell";
// import { Button } from "@/components/ui/button";
// import DeleteButton from "@/components/Button/DeleteButton";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "@/components/Image";
import { hasAuthorization } from "@/store/authorization";

const SUPPORT_PAGE_SIZE = [15, 25, 50, 100]

const Components: React.FC = () => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(SUPPORT_PAGE_SIZE[0])
  const { data, isFetching, isSuccess, refetch: refetchList } = useQuery({
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={tableCss.icon}>配件图</TableHead>
            <TableHead>配件名</TableHead>
            <TableHead>品牌</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>SN</TableHead>
            <TableHead className={tableCss.date}>创建时间</TableHead>
            <TableHead className={tableCss.actions}>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Doll69If display={isFetching}>
            {
              Array(15).fill(undefined).map(() => <TableRow>
                <TableCell className={tableCss.icon}><Skeleton /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell className={tableCss.date}><Skeleton /></TableCell>
                <TableCell className={tableCss.actions}></TableCell>
              </TableRow>)
            }
          </Doll69If>
          <Doll69If display={!isFetching && isSuccess}>
            {
              list.map((item, index) => {
                return <TableRow key={index}>
                  <TableCell className={tableCss.icon}>
                    <Image src={item.picture} />
                  </TableCell>
                  <TableCell>{item.name}&nbsp;(ID:{item.id})</TableCell>
                  <TableCell>{item.brandId}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.price / 100}</TableCell>
                  <TableCell>{item.sn}</TableCell>
                  <TableCell className={tableCss.date}>
                    <TableDateCell date={item.createdAt} />
                  </TableCell>
                  <TableCell className={tableCss.actions}>
                    {/* <Button size='sm' variant="outline" onClick={() => setEditBrand(item)}>修改</Button>
                    <DeleteButton size='sm' onClick={() => removeBrand(item)} /> */}
                  </TableCell>
                </TableRow>
              })
            }
          </Doll69If>
        </TableBody>
      </Table>
    </TablePage>
  </>)
}

export default Components
