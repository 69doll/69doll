import type React from "react"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Doll69If } from "shared"
import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../../components/ui/sheet"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import TablePage, { type TablePageOnValueChange } from "../../components/Page/TablePage"
import TableDateCell from "../../components/Table/TableDateCell"
import tableCss from "../../styles/table.module.scss"
import UploadImageArea from "../../components/UploadArea/UploadImageArea"
import Image from "../../components/Image"
import DeleteButton from "../../components/Button/DeleteButton"
import {
  type Brand,
  createBrand,
  deleteBrand,
  getBrandList,
  getBrandListCacheKeys,
  updateBrand,
} from "@/request/brand"
import PageName from "@/components/Page/PageName"
import { hasAuthorization } from "@/store/authorization"
import type { MappingTableOptions } from "@/components/Table/MappingTable"
import MappingTable from "@/components/Table/MappingTable"

const SUPPORT_PAGE_SIZE = [15, 25, 50, 100]

const Brands: React.FC = () => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(SUPPORT_PAGE_SIZE[0])
  const { data, isFetching, refetch: refetchList } = useQuery({
    queryKey: getBrandListCacheKeys({ pageSize, pageNum }),
    queryFn: () => getBrandList({ pageSize, pageNum }),
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

  const [editBrand, setEditBrand] = useState<any>()
  const onFormChange = ({ name, value }: { name: string, value: any }) => {
    setEditBrand({
      ...editBrand,
      [name]: value,
    })
  }
  const isOpenSheet = useMemo(() => !!editBrand, [editBrand])
  const { mutateAsync: addBrand } = useMutation({
    mutationFn: (brandInfo: Parameters<typeof createBrand>[0]) => createBrand(brandInfo),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        setEditBrand(undefined)
        await refetchList()
      }
    }
  })
  const add = async () => {
    await addBrand(editBrand)
  }
  const { mutateAsync: saveBrand } = useMutation({
    mutationFn: (brandInfo: Brand) => updateBrand(brandInfo.id, brandInfo),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        setEditBrand(undefined)
        await refetchList()
      }
    }
  })
  const save = async () => {
    await saveBrand(editBrand)
  }
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
      name: '品牌图',
      index: 'logo',
      className: tableCss.icon,
      render (value) {
        return <Image src={value} />
      },
    },
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
          <Button size='sm' variant="outline" onClick={() => setEditBrand(data)}>修改</Button>
          <DeleteButton size='sm' onClick={() => removeBrand(data)} />
        </>
      },
    },
  ]

  return (<>
    <TablePage
      label={<PageName name='品牌管理' isLoading={isFetching} onRefresh={refetchList} />}
      header={
        <div className='w-full flex flex-row justify-end'>
          <Button variant="outline" onClick={() => setEditBrand({ parentId: 0 })}>新增品牌</Button>
        </div>
      }
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
    <Sheet open={isOpenSheet}>
      <SheetContent headerClose={false}>
        <SheetHeader>
          <Doll69If display={!editBrand?.id}>
            <SheetTitle>添加品牌</SheetTitle>
            <SheetDescription>
              添加一个品牌
            </SheetDescription>
          </Doll69If>
          <Doll69If display={editBrand?.id}>
            <SheetTitle>修改品牌信息</SheetTitle>
            <SheetDescription>
              当前正在修改品牌[{`${list.find(({id}) => id === editBrand?.id)?.name}(ID:${editBrand?.id})`}]的信息
            </SheetDescription>
          </Doll69If>
        </SheetHeader>
        <form className="grid auto-rows-min gap-6 px-4" onChange={(a) => onFormChange(a.target as any)}>
          <div className="grid gap-3">
            <Label htmlFor="user-id">ID</Label>
            <Input id="user-id" defaultValue={editBrand?.id} disabled={true} name='id' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-name">品牌图</Label>
            <UploadImageArea
              name='logo'
              src={editBrand?.logo}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-name">品牌名</Label>
            <Input id="user-name" defaultValue={editBrand?.name} name='name' />
          </div>
        </form>
        <SheetFooter>
          <Doll69If display={!editBrand?.id}>
            <Button type="submit" variant="outline" onClick={() => add()}>立即添加</Button>
          </Doll69If>
          <Doll69If display={editBrand?.id}>
            <Button type="submit" variant="outline" onClick={() => save()}>立即修改</Button>
          </Doll69If>
          <Button variant="outline" onClick={() => setEditBrand(undefined)}>关闭</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </>)
}

export default Brands
