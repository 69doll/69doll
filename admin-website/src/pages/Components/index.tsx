import type React from "react";
import { useIsFetching, useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Doll69If } from "shared";
import { cloneDeep } from 'es-toolkit/compat'
import tableCss from "../../styles/table.module.scss"
import BrandName from "./components/BrandName";
import TablePage from "@/components/Page/TablePage";
import { createComponent, deleteComponent, getComponentList, getComponentListCacheKeys, updateComponent, type Component } from "@/request/component";
import PageName from "@/components/Page/PageName";
import type { TablePageOnValueChange } from "@/components/Page/TablePage";
import TableDateCell from "@/components/Table/TableDateCell";
import Image from "@/components/Image";
import { hasAuthorization } from "@/store/authorization";
import type { MappingTableOptions } from "@/components/Table/MappingTable";
import MappingTable from "@/components/Table/MappingTable";
import { Button } from "@/components/ui/button";
import SideSheet from "@/components/SideSheet";
import DeleteButton from "@/components/Button/DeleteButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UploadImageArea from "@/components/UploadArea/UploadImageArea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBrandAllList, getBrandAllListCacheKeys } from "@/request/brand";
import AmountInput from "@/components/Input/AmountInput";
import usePageNum from "@/hooks/usePageNum";
import usePageSize from "@/hooks/usePageSize";

const SUPPORT_PAGE_SIZE = [15, 25, 50, 100]

const DEFAULT_COMPONENT: Omit<Component, 'id' | 'extra' | 'type' | 'createdAt' | 'updatedAt'> = {
  name: '',
  price: 0,
  picture: '',
  brandId: 0,
  sn: '',
}

const Components: React.FC = () => {
  const [pageNum, setPageNum] = usePageNum()
  const [pageSize, setPageSize] = usePageSize(SUPPORT_PAGE_SIZE[0])
  const isFetching = useIsFetching({ queryKey: getComponentListCacheKeys({ pageSize, pageNum }) })
  const isMutating = useIsMutating()
  const isLoading = useMemo(() => isFetching > 0 || isMutating > 0, [isFetching, isMutating])
  const { data, refetch: refetchList } = useQuery({
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

  const [editComponent, setEditComponent] = useState<any>()
  const onFormChange = ({ name, value }: { name: string, value: any }) => {
    const v = name === 'price' ? Number(value ?? 0) : value
    setEditComponent({
      ...editComponent,
      [name]: v,
    })
  }
  const isAdd = useMemo(() => editComponent && !editComponent?.id, [editComponent])
  const isEdit = useMemo(() => editComponent && !!editComponent?.id, [editComponent])
  const isOpenSheet = useMemo(() => isAdd || isEdit, [isAdd, isEdit])
  const { mutateAsync: addComponent } = useMutation({
    mutationFn: (componentInfo: Parameters<typeof createComponent>[0]) => createComponent(componentInfo),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        setEditComponent(undefined)
        await refetchList()
      }
    }
  })
  const add = async () => {
    await addComponent({
      ...editComponent,
      price: Number(editComponent.price),
    })
  }
  const { mutateAsync: saveComponent } = useMutation({
    mutationFn: (componentInfo: Component) => updateComponent(componentInfo.id, componentInfo),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        setEditComponent(undefined)
        await refetchList()
      }
    }
  })
  const save = async () => {
    await saveComponent({
      ...editComponent,
      price: Number(editComponent.price),
    })
  }
  const { mutateAsync: removeComponent } = useMutation({
    mutationFn: (component: Component) => deleteComponent(component.id),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        await refetchList()
      }
    }
  })

  const { data: brandList = [] } = useQuery({
    queryKey: getBrandAllListCacheKeys(),
    queryFn: () => getBrandAllList(),
    select: (data) => data.data,
    staleTime: 500,
  })

  const tableOptions: MappingTableOptions<Component> = [
    {
      name: '配件图',
      index: 'picture',
      className: tableCss.icon,
      render(value) {
        return <Image src={value} />
      },
    },
    {
      name: '配件名',
      index: 'name',
      render (_, __, data) {
        return `${data.name} (ID:${data.id})`
      },
    },
    {
      name: '品牌',
      index: 'brandId',
      render (value) {
        return <BrandName id={value} />
      },
    },
    {
      name: '类型',
      index: 'type',
    },
    {
      name: '价格',
      index: 'price',
      render (value) {
        return value / 100
      },
    },
    {
      name: 'SN',
      index: 'sn',
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
          <Button size='sm' variant="outline" onClick={() => setEditComponent(data)}>修改</Button>
          <DeleteButton size='sm' onClick={() => removeComponent(data)} />
        </>
      },
    },
  ]

  return (<>
    <TablePage
      label={<PageName name='配件管理' isLoading={isLoading} onRefresh={refetchList} />}
      header={
        <div className='w-full flex flex-row justify-end'>
          <Button variant="outline" onClick={() => setEditComponent(cloneDeep(DEFAULT_COMPONENT))}>新增配件</Button>
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
        isLoading={isLoading}
        pageSize={pageSize}
      />
    </TablePage>
    <SideSheet
      open={isOpenSheet}
      title={<>
        <Doll69If display={isAdd}>添加用户</Doll69If>
        <Doll69If display={isEdit}>修改分类信息</Doll69If>
      </>}
      description={<>
        <Doll69If display={isAdd}>添加一个配件</Doll69If>
        <Doll69If display={isEdit}>当前正在修改配件的信息</Doll69If>
      </>}
      actionLabel={isAdd ? '立即添加' : '立即修改'}
      onAction={() => isAdd ? add() : save()}
      onCancel={() => setEditComponent(undefined)}
    >
      <form className="grid auto-rows-min gap-6 px-4" onChange={(a) => onFormChange(a.target as any)}>
        <Doll69If display={isEdit}>
          <div className="grid gap-3">
            <Label htmlFor="component-id">ID</Label>
            <Input id="component-id" defaultValue={editComponent?.id} disabled={true} name='id' />
          </div>
        </Doll69If>
        <div className="grid gap-3">
          <Label htmlFor="component-name">配件名</Label>
          <Input id="component-name" defaultValue={editComponent?.name} name='name' disabled={isLoading} />
        </div>
        <div className="grid gap-3">
          <Label>品牌</Label>
          <Select defaultValue={editComponent?.brandId?.toString()} name="brandId" disabled={isLoading}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {
                brandList.map((brand, index) => <SelectItem key={index} value={brand.id.toString()}>{brand.name}</SelectItem>)
              }
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="component-amount">金额</Label>
          <AmountInput id="component-amount" defaultValue={editComponent?.price} name='price' disabled={isLoading} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="component-picture">配件图</Label>
          <UploadImageArea
            defaultValue={editComponent?.picture} name='picture'
            onFormChange={({ name, value }) => onFormChange({ name, value })}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="component-sn">SN</Label>
          <Input id="component-sn" defaultValue={editComponent?.sn} name='sn' disabled={isLoading} />
        </div>
      </form>
    </SideSheet>
  </>)
}

export default Components
