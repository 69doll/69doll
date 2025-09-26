import type React from "react"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Doll69If } from "shared"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Skeleton } from "../../components/ui/skeleton"
import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../../components/ui/sheet"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  createCategory,
  deleteCategory,
  getCategoryAllList,
  getCategoryAllListCacheKeys,
  updateCategory,
  type Category,
} from "../../request/category"
import TableDateCell from "../../components/Table/TableDateCell"
import tableCss from '../../styles/table.module.scss'
import DeleteButton from "../../components/Button/DeleteButton"
import TablePage from "../../components/Page/TablePage"
import PageName from "@/components/Page/PageName"
import { hasAuthorization } from "@/store/authorization"

const Categories: React.FC = () => {
  const { data, isFetching, isSuccess, refetch: refetchCategoryList } = useQuery({
    queryKey: getCategoryAllListCacheKeys(),
    queryFn: () => getCategoryAllList(),
    enabled: hasAuthorization(),
  })
  const list = useMemo(() => {
    const currentList = data?.data ?? []
    return currentList.map((item) => {
      return {
        ...item,
        get dependencies () {
          return item.path.split(',')
        },
        get dependents () {
          const linkIds: string[] = list
            .filter((cur) => cur.dependencies.includes(item.id.toString()))
            .map(({ id }) => id.toString())
          return linkIds
        },
      }
    })
  }, [data])
  const map = useMemo(() => {
    return Object.fromEntries(list.map((item) => [item.id.toString(), item]))
  }, [list])

  const [editCategory, setEditCategory] = useState<any>()
  const parentCategories = useMemo(() => {
    if (!editCategory?.id) return list
    return list.filter((item) => item.id !== editCategory?.id && !editCategory?.dependents.includes(item.id))
  }, [editCategory])
  const onFormChange = ({ name, value }: { name: string, value: any }) => {
    setEditCategory({
      ...editCategory,
      [name]: value,
    })
  }
  const isOpenSheet = useMemo(() => !!editCategory, [editCategory])
  const { mutateAsync: addCategory } = useMutation({
    mutationFn: (categoryInfo: Parameters<typeof createCategory>[0]) => createCategory(categoryInfo),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        setEditCategory(undefined)
        await refetchCategoryList()
      }
    }
  })
  const add = async () => {
    await addCategory(editCategory)
  }
  const { mutateAsync: saveCategory } = useMutation({
    mutationFn: (categoryInfo: Category) => updateCategory(categoryInfo.id, categoryInfo),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        setEditCategory(undefined)
        await refetchCategoryList()
      }
    }
  })
  const save = async () => {
    await saveCategory(editCategory)
  }
  const { mutateAsync: removeCategory } = useMutation({
    mutationFn: (categoryInfo: Category) => deleteCategory(categoryInfo.id),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        await refetchCategoryList()
      }
    }
  })

  return (<>
    <TablePage
      label={<PageName name='分类管理' isLoading={isFetching} />}
      totalNum={list.length}
      header={
        <div className='w-full flex flex-row justify-end'>
          <Button variant="outline" onClick={() => setEditCategory({ parentId: 0 })}>新增分类</Button>
        </div>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>分类名</TableHead>
            <TableHead>父分类</TableHead>
            <TableHead className={tableCss.date}>创建时间</TableHead>
            <TableHead className={tableCss.actions}>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Doll69If display={isFetching}>
            {
              Array(15).fill(undefined).map(() => <TableRow>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell className={tableCss.date}><Skeleton className="h-4 w-full" /></TableCell>
              </TableRow>)
            }
          </Doll69If>
          <Doll69If display={!isFetching && isSuccess}>
            {
              list.map((item, index) => {
                return <TableRow key={index}>
                  <TableCell>{item.name}(ID:{item.id})</TableCell>
                  <TableCell>{(item.dependencies as string[]).map((id) => map[id]?.name).filter(Boolean).join(' > ')}</TableCell>
                  <TableCell className={tableCss.date}>
                    <TableDateCell date={item.createdAt} />
                  </TableCell>
                  <TableCell className={tableCss.actions}>
                    <Button size='sm' variant="outline" onClick={() => setEditCategory(item)}>修改</Button>
                    <DeleteButton size='sm' onClick={() => removeCategory(item)} />
                  </TableCell>
                </TableRow>
              })
            }
          </Doll69If>
        </TableBody>
      </Table>
    </TablePage>
    <Sheet open={isOpenSheet}>
      <SheetContent headerClose={false}>
        <SheetHeader>
          <Doll69If display={!editCategory?.id}>
            <SheetTitle>添加分类</SheetTitle>
            <SheetDescription>
              添加一个分类
            </SheetDescription>
          </Doll69If>
          <Doll69If display={editCategory?.id}>
            <SheetTitle>修改分类信息</SheetTitle>
            <SheetDescription>
              当前正在修改分类[{`${map[editCategory?.id]?.name}(ID:${editCategory?.id})`}]的信息
            </SheetDescription>
          </Doll69If>
        </SheetHeader>
        <form className="grid auto-rows-min gap-6 px-4" onChange={(a) => onFormChange(a.target as any)}>
          <div className="grid gap-3">
            <Label htmlFor="user-id">ID</Label>
            <Input id="user-id" defaultValue={editCategory?.id} disabled={true} name='id' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-name">名称</Label>
            <Input id="user-name" defaultValue={editCategory?.name} name='name' />
          </div>
          <Doll69If display={!editCategory?.id}>
            <div className="grid gap-3">
              <Label htmlFor="user-parent-id">父分类</Label>
              <Select defaultValue={editCategory?.parentId.toString()} name='parentId'>
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
          </Doll69If>
        </form>
        <SheetFooter>
          <Doll69If display={!editCategory?.id}>
            <Button type="submit" variant="outline" onClick={() => add()}>立即添加</Button>
          </Doll69If>
          <Doll69If display={editCategory?.id}>
            <Button type="submit" variant="outline" onClick={() => save()}>立即修改</Button>
          </Doll69If>
          <Button variant="outline" onClick={() => setEditCategory(undefined)}>关闭</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </>)
}

export default Categories
