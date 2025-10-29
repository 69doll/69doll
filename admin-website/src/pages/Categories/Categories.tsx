import type React from "react"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Doll69If } from "shared"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  type Category,
  createCategory,
  deleteCategory,
  getCategoryAllList,
  getCategoryAllListCacheKeys,
  updateCategory,
} from "../../request/category"
import TableDateCell from "../../components/Table/TableDateCell"
import tableCss from '../../styles/table.module.scss'
import DeleteButton from "../../components/Button/DeleteButton"
import TablePage from "../../components/Page/TablePage"
import PageName from "@/components/Page/PageName"
import type { MappingTableOptions } from "@/components/Table/MappingTable"
import type { OneOf } from "@/types/common"
import MappingTable from "@/components/Table/MappingTable"
import SideSheet from "@/components/SideSheet"

const Categories: React.FC = () => {
  const { data, isFetching, refetch: refetchCategoryList } = useQuery({
    queryKey: getCategoryAllListCacheKeys(),
    queryFn: () => getCategoryAllList(),
    gcTime: 5 * 60 * 1000, // 5 min
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
  const isAdd = useMemo(() => editCategory && !editCategory?.id, [editCategory])
  const isEdit = useMemo(() => editCategory && !!editCategory?.id, [editCategory])
  const isOpenSheet = useMemo(() => isAdd || isEdit, [isAdd, isEdit])
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

  const tableOptions: MappingTableOptions<OneOf<typeof list>> = [
    {
      name: '分类名',
      index: 'name',
      render(_, __, data) {
        return `${data.name} (ID:${data.id})`
      },
    },
    {
      name: '父分类',
      index: 'dependencies',
      render (value) {
        return value.map((id) => map[id]?.name).filter(Boolean).join(' > ')
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
          <Button size='sm' variant="outline" onClick={() => setEditCategory(data)}>修改</Button>
          <DeleteButton size='sm' onClick={() => removeCategory(data)} />
        </>
      }
    },
  ]

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
      <MappingTable
        options={tableOptions}
        sourceData={list}
        isLoading={isFetching}
      />
    </TablePage>
    <SideSheet
      open={isOpenSheet}
      title={<>
        <Doll69If display={isAdd}>添加分类</Doll69If>
        <Doll69If display={isEdit}>修改分类信息</Doll69If>
      </>}
      description={<>
        <Doll69If display={isAdd}>添加一个分类</Doll69If>
        <Doll69If display={isEdit}>当前正在修改分类[{`${map[editCategory?.id]?.name} (ID:${editCategory?.id})`}]的信息</Doll69If>
      </>}
      actionLabel={isAdd ? '立即添加' : '立即修改'}
      onAction={() => isAdd ? add() : save()}
      onCancel={() => setEditCategory(undefined)}
    >
      <form className="grid auto-rows-min gap-6 px-4" onChange={(a) => onFormChange(a.target as any)}>
        <div className="grid gap-3">
          <Label htmlFor="user-id">ID</Label>
          <Input id="user-id" defaultValue={editCategory?.id} disabled={true} name='id' />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="user-name">名称</Label>
          <Input id="user-name" defaultValue={editCategory?.name} name='name' />
        </div>
        <Doll69If display={isAdd}>
          <div className="grid gap-3">
            <Label htmlFor="user-parent-id">父分类</Label>
            <Select defaultValue={editCategory?.parentId.toString()} name='parentId'>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={'0'}>根分类 (ID:0)</SelectItem>
                {
                  parentCategories
                    .map((item) => {
                      return <SelectItem value={item.id.toString()}>{item.name} (ID:{item.id})</SelectItem>
                    })
                }
              </SelectContent>
            </Select>
          </div>
        </Doll69If>
      </form>
    </SideSheet>
  </>)
}

export default Categories
