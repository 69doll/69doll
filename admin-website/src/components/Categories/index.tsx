import type React from "react"
import dayjs from "dayjs"
import { Doll69If, useQuery } from "shared"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useMemo, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { Button } from "../ui/button"
import TableFooter, { type TableFooterOnValueChange } from "../TableFooter"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const SUPPORT_PAGE_SIZE = [25, 50, 100]

const Categories: React.FC = ({  }) => {
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(SUPPORT_PAGE_SIZE[0])
  const url = useMemo(() => `/api/admin/category/list?pageNum=${pageNum}&pageSize=${pageSize}&level=0`, [pageNum, pageSize])
  const { data, isLoading, isDone, refetch } = useQuery<any>(url)
  useEffect(() => {
    refetch()
  }, [url])
  const list = useMemo<any[]>(() => {
    const currentList: { id: string, parentId: string }[] = data?.data ?? []
    return currentList.map((item) => {
      return {
        ...item,
        get dependencies () {
          const linkIds: string[] = [item.parentId]
          while (true) {
            const curItem = currentList.find((cur) => cur.id === linkIds[0])
            if (!curItem || linkIds.includes(curItem.parentId)) break
            linkIds.unshift(curItem.parentId)
          }
          return linkIds
        },
        get dependents () {
          const linkIds: string[] = list
            .filter((cur) => cur.dependencies.includes(item.id))
            .map(({ id }: { id: string }) => id)
          return linkIds
        },
      }
    })
  }, [data])
  const map = useMemo<Record<string, any>>(() => {
    return Object.fromEntries(list.map((item) => [item.id, item]))
  }, [list])
  const totalPageNum = useMemo(() => {
    return data?.data?.totalPage ?? 1
  }, [data])
  const onPageChange: TableFooterOnValueChange = ({ pageNum, pageSize }) => {
    setPageNum(pageNum)
    setPageSize(pageSize)
  }

  const [category, setCategory] = useState<any>()
  const parentCategories = useMemo(() => {
    if (!category?.id) return list
    return list.filter((item) => item.id !== category?.id && !category?.dependents.includes(item.id))
  }, [category])
  const onFormChange = ({ name, value }: { name: string, value: any }) => {
    setCategory({
      ...category,
      [name]: value,
    })
  }
  const isOpenSheet = useMemo(() => !!category, [category])
  const { refetch: addCategory, reset: resetAddStatus } = useQuery('/api/admin/category/create', {
    method: 'POST',
    body: {
      name: category?.name,
      parentId: Number(category?.parentId),
    },
    fetchOnMount: false,
  })
  const add = async () => {
    await addCategory()
    setCategory(undefined)
    resetAddStatus()
    await refetch()
  }
  const { refetch: updateCategory, reset: resetUpdateStatus } = useQuery('/api/admin/category/update', {
    method: 'PUT',
    body: {
      id: category?.id,
      name: category?.name,
      parentId: Number(category?.parentId),
    },
    fetchOnMount: false,
  })
  const save = async () => {
    await updateCategory()
    setCategory(undefined)
    resetUpdateStatus()
    await refetch()
  }
  return (<>
    <h1>Categories</h1>
    <div className='flex flex-row justify-end'>
      <Button variant="outline" onClick={() => setCategory({ parentId: 0 })}>新增分类</Button>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>分类名</TableHead>
          <TableHead>父分类</TableHead>
          <TableHead>创建时间</TableHead>
          <TableHead className="w-[120px]">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <Doll69If display={isLoading}>
          {
            Array(pageSize).map(() => <TableRow>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
            </TableRow>)
          }
        </Doll69If>
        <Doll69If display={isDone}>
          {
            list.map((item, index) => {
              return <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{(item.dependencies as string[]).map((id) => map[id]?.name).filter(Boolean).join(' > ')}</TableCell>
                <TableCell title={dayjs(item.createdAt).format('YYYY-MM-DD HH:MM:SS ZZ')}>
                  { dayjs(item.createdAt).format('YYYY-MM-DD') }
                </TableCell>
                <TableCell>
                  <Button size={'sm'} variant="outline" onClick={() => setCategory(item)}>修改</Button>
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
          <Doll69If display={!category?.id}>
            <SheetTitle>添加分类</SheetTitle>
            <SheetDescription>
              添加一个分类
            </SheetDescription>
          </Doll69If>
          <Doll69If display={category?.id}>
            <SheetTitle>修改分类信息</SheetTitle>
            <SheetDescription>
              当前正在修改分类[{`${map[category?.id]?.name}(ID:${category?.id})`}]的信息
            </SheetDescription>
          </Doll69If>
        </SheetHeader>
        <form className="grid auto-rows-min gap-6 px-4" onChange={(a) => onFormChange(a.target as any)}>
          <div className="grid gap-3">
            <Label htmlFor="user-id">ID</Label>
            <Input id="user-id" defaultValue={category?.id} disabled={true} name='id' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-name">名称</Label>
            <Input id="user-name" defaultValue={category?.name} name='name' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-parent-id">父分类</Label>
            <Select defaultValue={category?.parentId.toString()} name='parentId'>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'0'}>根分类(ID:0)</SelectItem>
                {
                  parentCategories
                    .map((item) => {
                      return <SelectItem value={item.id.toString()}>{`${item.name}(ID:${item.id}))`}</SelectItem>
                    })
                }
              </SelectContent>
            </Select>
          </div>
        </form>
        <SheetFooter>
          <Doll69If display={!category?.id}>
            <Button type="submit" variant="outline" onClick={() => add()}>立即添加</Button>
          </Doll69If>
          <Doll69If display={category?.id}>
            <Button type="submit" variant="outline" onClick={() => save()}>立即修改</Button>
          </Doll69If>
          <Button variant="outline" onClick={() => setCategory(undefined)}>关闭</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </>)
}

export default Categories
