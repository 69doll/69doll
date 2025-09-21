import type React from "react"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Doll69If } from "shared"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Skeleton } from "../ui/skeleton"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { createBrand, getBrandList, getBrandListCacheKeys, updateBrand, type Brand } from "@/request/brand"
import TableFooter, { type TableFooterOnValueChange } from "../Table/TableFooter"
import TableDateCell from "../Table/TableDateCell"
import tableCss from '../../styles/table.module.scss'
import UploadArea from "../UploadArea"
import Image from "../Image"

const SUPPORT_PAGE_SIZE = [25, 50, 100]

const Brands: React.FC = () => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(SUPPORT_PAGE_SIZE[0])
  const { data, isLoading, isSuccess, refetch: refetchList } = useQuery({
    queryKey: getBrandListCacheKeys({ pageSize, pageNum }),
    queryFn: () => getBrandList({ pageSize, pageNum }),
  })
  const list = useMemo(() => {
    return data?.data?.list ?? []
  }, [data])
  const totalPageNum = useMemo(() => {
    return data?.data?.totalPage ?? 1
  }, [data])
  const onPageChange: TableFooterOnValueChange = ({ pageNum: nextPageNum, pageSize: nextPageSize }) => {
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

  return (<>
    <h1>品牌管理</h1>
    <div className='flex flex-row justify-end'>
      <Button variant="outline" onClick={() => setEditBrand({ parentId: 0 })}>新增品牌</Button>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={tableCss.icon}>品牌图</TableHead>
          <TableHead>品牌名</TableHead>
          <TableHead className={tableCss.date}>创建时间</TableHead>
          <TableHead className={tableCss.actions}>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <Doll69If display={isLoading}>
          {
            Array(15).fill(undefined).map(() => <TableRow>
              <TableCell><Skeleton className={tableCss.icon} /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell className={tableCss.date}><Skeleton className="h-4 w-full" /></TableCell>
            </TableRow>)
          }
        </Doll69If>
        <Doll69If display={isSuccess}>
          {
            list.map((item, index) => {
              return <TableRow key={index}>
                <TableCell className={tableCss.icon}>
                  <Image src={item.logo} loading="lazy" />
                </TableCell>
                <TableCell>{item.name}(ID:{item.id})</TableCell>
                <TableCell className={tableCss.date}>
                  <TableDateCell date={item.createdAt} />
                </TableCell>
                <TableCell className={tableCss.actions}>
                  <Button size='icon' variant="outline" onClick={() => setEditBrand(item)}>修改</Button>
                </TableCell>
              </TableRow>
            })
          }
        </Doll69If>
      </TableBody>
    </Table>
    <TableFooter
      pageNum={pageNum}
      totalPageNum={totalPageNum}
      pageSize={pageSize}
      pageSizes={SUPPORT_PAGE_SIZE}
      onValueChange={onPageChange}
    />
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
            <Label htmlFor="user-name">品牌名</Label>
            <Input id="user-name" defaultValue={editBrand?.name} name='name' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-name">品牌图</Label>
            <UploadArea
              src={editBrand?.logo}
              onChange={(url) => onFormChange({ name: 'logo', value: url }) }
            ></UploadArea>
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
