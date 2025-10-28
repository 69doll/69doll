import type React from "react"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Doll69If } from "shared"
import { castArray } from "es-toolkit/compat"
import { Eye } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import TablePage from "../../components/Page/TablePage"
import TableDateCell from "../../components/Table/TableDateCell"
import tableCss from "../../styles/table.module.scss"
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
import SideSheet from "@/components/SideSheet"
import { useTablePageData } from "@/components/Page/TablePage.hook"
import ImageActions from "@/components/Image/ImageActions"
import SelectImagesDialog from "@/components/Image/SelectImagesDialog"
import { useSelectImagesDialogRef } from "@/components/Image/SelectImagesDialog.hook"
import useImagePreview from "@/Context/ImagePreview/useImagePreview"

const SUPPORT_PAGE_SIZES = [15, 25, 50, 100]

const Brands: React.FC = () => {
  const selectImagesDialogRef = useSelectImagesDialogRef()
  const imagePreview = useImagePreview()
  const { pageNum, pageSize, useFooterData } = useTablePageData({ sizes: SUPPORT_PAGE_SIZES })
  const { data, isFetching, refetch: refetchList } = useQuery({
    queryKey: getBrandListCacheKeys({ pageSize, pageNum }),
    queryFn: () => getBrandList({ pageSize, pageNum }),
    enabled: hasAuthorization(),
  })
  const { list, footerProps } = useFooterData(data)

  const [editBrand, setEditBrand] = useState<any>()
  const onFormChange = ({ name, value }: { name: string, value: any }) => {
    setEditBrand({
      ...editBrand,
      [name]: value,
    })
  }
  const isAdd = useMemo(() => editBrand && !editBrand?.id, [editBrand])
  const isEdit = useMemo(() => editBrand && !!editBrand?.id, [editBrand])
  const isOpenSheet = useMemo(() => isAdd || isEdit, [isAdd, isEdit])
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
        return <ImageActions
          src={value}
          actionBody={<Eye />}
          onActionBody={() => imagePreview(value)}
        />
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
      {...footerProps}
    >
      <MappingTable
        options={tableOptions}
        sourceData={list}
        isLoading={isFetching}
        pageSize={pageSize}
      />
    </TablePage>
    <SideSheet
      open={isOpenSheet}
      title={<>
        <Doll69If display={isAdd}>添加品牌</Doll69If>
        <Doll69If display={isEdit}>修改品牌信息</Doll69If>
      </>}
      description={<>
        <Doll69If display={isAdd}>添加一个品牌</Doll69If>
        <Doll69If display={isEdit}>当前正在修改品牌[{`${list.find(({id}) => id === editBrand?.id)?.name} (ID:${editBrand?.id})`}]的信息</Doll69If>
      </>}
      actionLabel={isAdd ? '立即添加' : '立即修改'}
      onAction={() => isAdd ? add() : save()}
      onCancel={() => setEditBrand(undefined)}
    >
      <form className="grid auto-rows-min gap-6 px-4" onChange={(a) => onFormChange(a.target as any)}>
        <Doll69If display={isEdit}>
          <div className="grid gap-3">
            <Label htmlFor="user-id">ID</Label>
            <Input id="user-id" defaultValue={editBrand?.id} disabled={true} name='id' />
          </div>
        </Doll69If>
        <div className="grid gap-3">
          <Label htmlFor="user-name">品牌图</Label>
          <ImageActions
            className="size-[130px]"
            src={editBrand?.logo}
            {...(editBrand?.logo ? {
              actionBody: <Eye />,
              onActionBody: () => imagePreview(editBrand?.logo),
              actionFooter: '选择图片',
              onActionFooter: () => selectImagesDialogRef.current?.open(castArray(editBrand?.logo))
            } : {
              actionBody: '选择图片',
              onActionBody: () => selectImagesDialogRef.current?.open(castArray(editBrand?.logo))
            })}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="user-name">品牌名</Label>
          <Input id="user-name" defaultValue={editBrand?.name} name='name' />
        </div>
      </form>
      <SelectImagesDialog
        ref={selectImagesDialogRef}
        min={1}
        max={1}
        onChange={(keys) => onFormChange({ name: 'logo', value: keys[0] })}
      />
    </SideSheet>
  </>)
}

export default Brands
