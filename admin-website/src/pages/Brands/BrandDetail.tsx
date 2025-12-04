import type React from "react"
import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { castArray } from "es-toolkit/compat"
import { Eye } from "lucide-react"
import { Doll69If } from "shared"
import FormWrapper from "@/components/Form/FormWrapper"
import FormItem from "@/components/Form/FormItem"
import ActionInput, { ActionInputActions } from "@/components/Input/ActionInput"
import Page from "@/components/Page/Page"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import ImageActions from "@/components/Image/ImageActions"
import SelectImagesDialog from "@/components/Image/SelectImagesDialog"
import { useSelectImagesDialogRef } from "@/components/Image/SelectImagesDialog.hook"
import useImagePreview from "@/Context/ImagePreview/useImagePreview"
import useErrors from "@/hooks/useErrors"
import {
  type Brand,
  createBrand,
  getBrandAllList,
  updateBrand,
} from "@/request/brand"

const DataNotFound = lazy(() => import('@/components/Mention/DataNotFound'));
const DataLoading = lazy(() => import('@/components/Mention/DataLoading'));

const BrandDetail: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>()
  const isNew = useMemo(() => brandId === 'new', [brandId])

  const navigate = useNavigate()
  const selectImagesDialogRef = useSelectImagesDialogRef()
  const imagePreview = useImagePreview()

  const [brandList, setBrandList] = useState<Brand[]>([])
  const [currentBrand, setCurrentBrand] = useState<Brand | undefined>()
  const [isFetching, setIsFetching] = useState(false)
  const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    const fetchBrands = async () => {
      if (isNew) {
        setIsFetched(true)
        return
      }
      setIsFetching(true)
      try {
        const res = await getBrandAllList()
        setBrandList(res.data)
        setCurrentBrand(res.data.find(b => b.id.toString() === brandId))
        setIsFetched(true)
      } finally {
        setIsFetching(false)
      }
    }
    fetchBrands()
  }, [brandId, isNew])

  const isNotFound = useMemo(() => {
    return !isNew && isFetched && !currentBrand
  }, [isNew, isFetched, currentBrand])

  const pageLabel = useMemo(() => {
    if (isNew) return '新建品牌'
    if (isFetching && !currentBrand) return <Skeleton className="h-[30px] w-[100px]" />
    return currentBrand?.name
  }, [currentBrand, isFetching, isFetched])

  const [editBrand, setEditBrand] = useState<Brand>()

  const setBrandValueByKey = <K extends keyof Brand>(key: K, value: Brand[K]) => {
    setEditBrand(prev => ({
      ...(prev as Brand),
      [key]: value,
    }))
  }

  useEffect(() => {
    if (!currentBrand && !isNew) return
    if (isNew) {
      setEditBrand({ name: '', logo: '' } as any as Brand)
    } else {
      setEditBrand(currentBrand)
    }
  }, [currentBrand, isNew])

  const {
    validate,
    errorMap,
    hasError,
  } = useErrors(editBrand!, {
    name: [
      (value) => !value ? '还没有填品牌名' : undefined,
      (value) => brandList.find((brand) => brand.name === value && brand.id !== editBrand?.id) ? '已存在品牌名' : undefined,
    ],
  })

  const { mutateAsync: startCreateBrand, isPending: isCreating } = useMutation({
    mutationFn: (brandInfo: Pick<Brand, 'name' | 'logo'>) => createBrand(brandInfo),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        navigate('/brands')
      }
    }
  })

  const createNewBrand = async () => {
    if (validate()) {
      await startCreateBrand({ name: editBrand!.name, logo: editBrand!.logo })
    }
  }

  const { mutateAsync: startUpdateBrand, isPending: isUpdating } = useMutation({
    mutationFn: (brandInfo: Brand) => updateBrand(brandInfo.id, { name: brandInfo.name, logo: brandInfo.logo }),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        navigate('/brands')
      }
    }
  })

  const updateCurrentBrand = async () => {
    if (validate()) {
      await startUpdateBrand(editBrand!)
    }
  }

  return <>
    <Page
      label={pageLabel}
      header={<>
        <div className="inline-flex items-center justify-end w-full gap-2">
          <Button variant="outline" size={'sm'} onClick={() => navigate('/brands')}>返回列表</Button>
          <Doll69If display={!isNotFound}>
            <Doll69If display={isNew}>
              <Button variant="outline" size={'sm'} disabled={isCreating} onClick={() => createNewBrand()}>创建品牌</Button>
            </Doll69If>
            <Doll69If display={!isNew}>
              <Button variant="outline" size={'sm'} disabled={isUpdating} onClick={() => updateCurrentBrand()}>更新品牌</Button>
            </Doll69If>
          </Doll69If>
        </div>
      </>}
    >
      <Doll69If display={isNotFound}>
        <Suspense><DataNotFound /></Suspense>
      </Doll69If>
      <Doll69If display={!isNew && isFetching && !currentBrand}>
        <Suspense><DataLoading /></Suspense>
      </Doll69If>
      <Doll69If display={!!editBrand}>
        <div className={"grid gap-4 lg:grid-cols-1"}>
          <div>
            <Card>
              <CardContent>
                <FormWrapper>
                  <FormItem label='ID'>
                    <Input
                      defaultValue={isNew ? '添加后自动生成' : editBrand?.id}
                      disabled={true}
                    />
                  </FormItem>
                  <FormItem label='品牌图' errors={errorMap['logo']}>
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
                  </FormItem>
                  <FormItem label='品牌名' errors={errorMap['name']}>
                    <ActionInput
                      defaultValue={editBrand?.name}
                      onChange={(e) => setBrandValueByKey('name', e.target.value)}
                      required={true}
                      aria-invalid={hasError('name')}
                      actions={editBrand?.name ? ActionInputActions.Clear(() => setBrandValueByKey('name', '')) : []}
                    />
                  </FormItem>
                </FormWrapper>
              </CardContent>
            </Card>
          </div>
        </div>
      </Doll69If>
    </Page>
    <SelectImagesDialog
      ref={selectImagesDialogRef}
      min={1}
      max={1}
      onChange={(keys) => setBrandValueByKey('logo', keys[0])}
    />
  </>
}

export default BrandDetail
