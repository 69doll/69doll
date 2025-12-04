import type React from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Button } from "../../components/ui/button"
import TablePage from "../../components/Page/TablePage"
import TableDateCell from "../../components/Table/TableDateCell"
import tableCss from "../../styles/table.module.scss"
import DeleteButton from "../../components/Button/DeleteButton"
import {
  type Brand,
  deleteBrand,
  getBrandList,
  getBrandListCacheKeys,
} from "@/request/brand"
import PageName from "@/components/Page/PageName"
import { hasAuthorization } from "@/store/authorization"
import type { MappingTableOptions } from "@/components/Table/MappingTable"
import MappingTable from "@/components/Table/MappingTable"
import { useTablePageData } from "@/components/Page/TablePage.hook"

const SUPPORT_PAGE_SIZES = [15, 25, 50, 100]

const Brands: React.FC = () => {
  const navigate = useNavigate()
  const { pageNum, pageSize, useFooterData } = useTablePageData({ sizes: SUPPORT_PAGE_SIZES })
  const { data, isFetching, refetch: refetchList } = useQuery({
    queryKey: getBrandListCacheKeys({ pageSize, pageNum }),
    queryFn: () => getBrandList({ pageSize, pageNum }),
    enabled: hasAuthorization(),
  })
  const { list, footerProps } = useFooterData(data)

  const { mutateAsync: removeBrand } = useMutation({
    mutationFn: (brandInfo: Brand) => deleteBrand(brandInfo.id),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        await refetchList()
      }
    }
  })

  const tableOptions: MappingTableOptions<Brand> = [
    {
      name: '品牌名',
      index: 'name',
      render (_, __, data) {
        return `${data.name} (ID:${data.id})`
      },
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
      render (_, __, data) {
        return <>
          <Button size='sm' variant="outline" onClick={() => navigate(`/brands/${data.id}`, { state: { data: data } })}>修改</Button>
          <DeleteButton size='sm' onClick={() => removeBrand(data)} />
        </>
      }
    },
  ]

  return (<>
    <TablePage
      label={<PageName name='品牌管理' isLoading={isFetching} onRefresh={refetchList} />}
      header={
        <div className='w-full flex flex-row justify-end'>
          <Button variant="outline" onClick={() => navigate(`/brands/new`)}>新增品牌</Button>
        </div>
      }
      {...footerProps}
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

export default Brands
