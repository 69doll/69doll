import type React from "react"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { orderBy } from "es-toolkit/compat"
import { Button } from "../../components/ui/button"
import TableDateCell from "../../components/Table/TableDateCell"
import tableCss from '../../styles/table.module.scss'
import DeleteButton from "../../components/Button/DeleteButton"
import TablePage from "../../components/Page/TablePage"
import PageName from "@/components/Page/PageName"
import type { MappingTableOptions } from "@/components/Table/MappingTable"
import type { OneOf } from "@/types/common"
import MappingTable from "@/components/Table/MappingTable"
import { useAllCategories, useDeleteCategory } from "@/hooks/request/category"

const Categories: React.FC = () => {
  const navigate = useNavigate()
  const { data, isFetching } = useAllCategories()
  const list = useMemo(() => {
    const currentList = data?.data ?? []
    return orderBy(currentList, ['id'], ['asc']).map((item) => {
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

  const { mutateAsync: removeCategory } = useDeleteCategory()

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
          <Button size='sm' variant="outline" onClick={() => navigate(`/categories/${data.id}`, { state: { data: data } })}>修改</Button>
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
          <Button variant="outline" onClick={() => navigate(`/categories/new`)}>新增分类</Button>
        </div>
      }
    >
      <MappingTable
        options={tableOptions}
        sourceData={list}
        isLoading={isFetching}
      />
    </TablePage>
  </>)
}

export default Categories
