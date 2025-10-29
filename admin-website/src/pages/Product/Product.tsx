import type React from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BrandName from "../../components/Brand/BrandName";
import CategoryName from "../../components/Category/CategoryName";
import tableCss from "../../styles/table.module.scss"
import TablePage from "@/components/Page/TablePage";
import { getProductList, getProductListCacheKeys, type SPU } from "@/request/product";
import { useTablePageData } from "@/components/Page/TablePage.hook";
import MappingTable, { type MappingTableOptions } from "@/components/Table/MappingTable";
import PageName from "@/components/Page/PageName";
import ImageActions from "@/components/Image/ImageActions";
import TableDateCell from "@/components/Table/TableDateCell";
import useImagePreview from "@/Context/ImagePreview/useImagePreview";
import { Button } from "@/components/ui/button";

const SUPPORT_PAGE_SIZES = [25, 50, 100]

const Product: React.FC = () => {
  const navigate = useNavigate()
  const imagePreview = useImagePreview()
  const { pageNum, pageSize, useFooterData } = useTablePageData({ sizes: SUPPORT_PAGE_SIZES })
  const { data, isFetching, refetch: refetchList } = useQuery({
    queryKey: getProductListCacheKeys({ pageSize, pageNum}),
    queryFn: () => getProductList({ pageSize, pageNum}),
  })
  const { list, footerProps } = useFooterData(data)
  const tableOptions: MappingTableOptions<SPU> = [
    {
      name: '产品主图',
      index: 'mainImage',
      className: tableCss.icon,
      render (value) {
        return <ImageActions
          className="size-[130px]"
          src={value}
          actionBody={<Eye />}
          onActionBody={() => imagePreview(value)}
        />
      },
    },
    {
      name: '产品名',
      index: 'name',
      render (_, __, data) {
        return <>{data.name}<p>{`(SN:${data.sn})`}</p></>
      },
    },
    {
      name: '品牌',
      index: 'brandId',
      render (value) {
        return <BrandName id={value} />
      }
    },
    {
      name: '分类',
      index: 'categoryId',
      render (value) {
        return <CategoryName id={value} />
      }
    },
    {
      name: '更新时间',
      index: 'updatedAt',
      className: tableCss.date,
      render (value) {
        return <TableDateCell date={value} />
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
          <Button size='sm' variant="outline" onClick={() => navigate(`/products/${data.id}`, { state: { spu: data } })}>修改</Button>
          {/* <DeleteButton size='sm' onClick={() => removeBrand(data)} /> */}
        </>
      },
    },
  ]
  return (<>
    <TablePage
      label={<PageName name='产品管理' isLoading={isFetching} onRefresh={refetchList} />}
      header={
        <div className='w-full flex flex-row justify-end'>
          <Button variant="outline" onClick={() => navigate(`/products/new`)}>新增产品</Button>
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

export default Product
