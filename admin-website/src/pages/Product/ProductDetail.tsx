import { useQuery } from "@tanstack/react-query"
import { Fragment, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Doll69If } from "shared"
import { Eye } from "lucide-react"
import TKDCard from "../Modules/components/TKDCard"
import Page from "@/components/Page/Page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getProductDetail, getProductDetailCacheKeys, type SKU, type SPU } from "@/request/product"
import useTKDState from "@/hooks/useTKDState"
import FormWrapper from "@/components/Form/FormWrapper"
import FormItem from "@/components/Form/FormItem"
import { Input } from "@/components/ui/input"
import useList from "@/hooks/useList"
import ImageActions from "@/components/Image/ImageActions"
import SelectImagesDialog from "@/components/Image/SelectImagesDialog"
import { useSelectImagesDialogRef } from "@/components/Image/SelectImagesDialog.hook"
import useImagePreview from "@/Context/ImagePreview/useImagePreview"

const ProductDetail: React.FC = () => {
  const selectImagesDialogRef = useSelectImagesDialogRef()
  const imagePreview = useImagePreview()
  const navigate = useNavigate()
  const location = useLocation()
  const originData = location.state as { spu: SPU }
  const { productId } = useParams<{ productId: string }>()
  const isNew = useMemo(() => productId === 'new', [productId])
  const { data: res, isFetching, isFetched } = useQuery({
    queryKey: getProductDetailCacheKeys(Number(productId)),
    queryFn: () => getProductDetail(Number(productId)),
    enabled: !isNew,
  })
  const [tkd, setTKD, initTKD] = useTKDState()
  const data = useMemo(() => res?.data, [res])
  const [spu, setSpu] = useState<SPU>(originData?.spu ?? {})
  const [skus, { init: setSkus, setAt }] = useList<SKU>()
  useEffect(() => {
    if (!isFetched) return
    data?.spu && setSpu(data.spu)
    setSkus(data?.skus ?? [])
    initTKD(JSON.parse(data?.spu.seoConfig ?? '{}'))
  }, [isFetched])
  useEffect(() => {
    setSpu(prev => prev ? { ...prev, seoConfig: JSON.stringify(tkd) } : prev)
  }, [tkd])

  const isNotFound = useMemo(() => {
    return !isNew && isFetched && !data || res?.code === 404
  }, [isNew, isFetched, data, res])
  const pageLabel = useMemo(() => {
    if (isNew) return '新建产品'
    if (!isFetched && originData) return originData.spu.name
    if (isFetching) return <Skeleton className="h-[30px] w-[100px]" />
    return data?.spu.name ?? originData.spu.name
  }, [data, isFetching, isFetched])

  return <Page
    label={pageLabel}
    header={<>
      <div className="inline-flex items-center justify-end w-full gap-2">
        <Button variant="outline" size={'sm'} onClick={() => navigate('/products')}>返回列表</Button>
        <Doll69If display={!isNotFound}>
          <Button variant="outline" size={'sm'}>
            {
              isNew ? '创建产品' : '更新产品'
            }
          </Button>
        </Doll69If>
      </div>
    </>}
  >
    <Doll69If display={isNotFound}>
      <div className="text-center text-red-500">产品不存在或已被删除</div>
    </Doll69If>
    <Doll69If display={!isNotFound}>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="grid grid-col gap-4">
          <TKDCard
            {...tkd}
            onChange={(key, value) => setTKD(key, value)}
            disabled={isFetching}
          />
          <Card>
            <CardHeader>
              <CardTitle>SPU 信息</CardTitle>
            </CardHeader>
            <CardContent>
              <FormWrapper>
                <FormItem
                  label='产品名称'
                >
                  <Input
                    value={spu?.name}
                    onChange={(e) => setSpu(prev => prev ? { ...prev, name: e.target.value } : prev)}
                    disabled={isFetching}
                  />
                </FormItem>
                <FormItem
                  label='SN'
                >
                  <Input
                    value={spu?.sn}
                    onChange={(e) => setSpu(prev => prev ? { ...prev, sn: e.target.value } : prev)}
                    disabled={isFetching}
                  />
                </FormItem>
                <FormItem
                  label='主图片'
                >
                  <ImageActions
                    className="w-sm aspect-square size-full"
                    src={spu?.mainImage}
                    {...(spu?.mainImage ? {
                      actionBody: <Eye />,
                      onActionBody: () => imagePreview(spu?.mainImage),
                      actionFooter: '重新选择',
                      onActionFooter: () => selectImagesDialogRef?.current?.open([spu?.mainImage]),
                    }: {
                      actionBody: '选择',
                      onActionBody: () => selectImagesDialogRef?.current?.open([]),
                    })}
                  />
                </FormItem>
              </FormWrapper>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>商品属性</CardTitle>
            </CardHeader>
            <CardContent>
              <FormWrapper>
              </FormWrapper>
            </CardContent>
          </Card>
        </div>
        <Doll69If display={!isFetching}>
          <div className="grid xl:grid-cols-2 xl:col-span-2 gap-4">
            {
              skus.map((sku, index) => {
                return <Fragment key={`sku-${index}`}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{`SKU ${index + 1} 信息`}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormWrapper>
                        <FormItem
                          label='名称'
                        >
                          <Input
                            value={sku.name}
                            onChange={(e) => setAt(index, 'name', e.target.value)}
                            disabled={isFetching}
                          />
                        </FormItem>
                        <FormItem
                          label='SKU 图片'
                        >
                          <ImageActions
                            className="w-sm aspect-square size-full"
                            src={sku?.images}
                            {...(sku?.images ? {
                              actionBody: <Eye />,
                              onActionBody: () => imagePreview(sku?.images),
                              actionFooter: '重新选择',
                              onActionFooter: () => selectImagesDialogRef?.current?.open([sku?.images]),
                            }: {
                              actionBody: '选择',
                              onActionBody: () => selectImagesDialogRef?.current?.open([]),
                            })}
                          />
                        </FormItem>
                      </FormWrapper>
                    </CardContent>
                  </Card>
                </Fragment>
              })
            }
          </div>
        </Doll69If>
      </div>
      <SelectImagesDialog
        ref={selectImagesDialogRef}
        min={1}
        max={1}
        onChange={([value]) => setSpu(prev => prev ? { ...prev, mainImage: value } : prev)}
      />
    </Doll69If>
  </Page>
}

export default ProductDetail
