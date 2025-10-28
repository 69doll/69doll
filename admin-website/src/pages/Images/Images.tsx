import type React from "react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Doll69If } from "shared";
import { Eye } from "lucide-react";
import PageTabs from "@/components/Page/PageTabs";
import TablePage from "@/components/Page/TablePage";
import PageName from "@/components/Page/PageName";
import { deleteImages, getImageList, getImageListCacheKeys } from "@/request/image";
import { hasAuthorization } from "@/store/authorization";
import { Skeleton } from "@/components/ui/skeleton";
import UploadImageArea from "@/components/Image/UploadImageArea";
import { Separator } from "@/components/ui/separator";
import TableFooter from "@/components/Table/TableFooter";
import { useTablePageData } from "@/components/Page/TablePage.hook";
import ImageActions from "@/components/Image/ImageActions";
import useImagePreview from "@/Context/ImagePreview/useImagePreview";

const ImageType = {
  LIST: 'LIST',
  CONSTANT: 'CONSTANT',
} as const

type ImageType = typeof ImageType[keyof typeof ImageType]

const SUPPORT_PAGE_SIZE = [15, 25, 50, 100]

const Image: React.FC = () => {
  const imagePreview = useImagePreview()
  const imageTabs = [
    { name: '图片素材管理', value: ImageType.LIST },
    { name: '图片配置管理', value: ImageType.CONSTANT },
  ]
  const [imageType, setImageType] = useState<ImageType>(ImageType.LIST)

  const {
    pageNum, pageSize, useFooterData,
  } = useTablePageData({ sizes: SUPPORT_PAGE_SIZE })
  const { data, isFetching, refetch: refetchList } = useQuery({
    queryKey: getImageListCacheKeys({ pageNum, pageSize }),
    queryFn: () => getImageList({ pageNum, pageSize }),
    enabled: hasAuthorization(),
  })
  const {
    list, footerProps,
  } = useFooterData(data)
  const { mutateAsync } = useMutation({
    mutationFn: (key: string) => deleteImages(key),
    onSettled: () => {
      refetchList()
    },
  })

  return (<>
    <TablePage
      label={<PageName name='图片管理' isLoading={isFetching} onRefresh={() => refetchList()} />}
      {...footerProps}
      header={
        <div className='w-full flex flex-row justify-between'>
          <PageTabs
            options={imageTabs}
            defaultValue={imageType}
            onValueChange={(v) => setImageType(v as ImageType)}
          />
        </div>
      }
    >
      <Doll69If display={imageType === ImageType.LIST}>
        <div className="flex gap-1 flex-row flex-wrap">
          <UploadImageArea onChange={() => refetchList()} />
          <div className="my-4 w-full">
            <Separator />
          </div>
          <h2 className="w-full pb-2">现有图片素材</h2>
          {
            (isFetching ? Array(pageSize).fill(undefined) as typeof list : list).map((imageObj, index) => {
              return <>
                <div className="border border-solid border-gray rounded-sm p-1" key={index}>
                  <Doll69If display={isFetching}>
                    <Skeleton className="size-[130px]" />
                  </Doll69If>
                  <Doll69If display={!isFetching}>
                    <ImageActions
                      className="size-[130px]"
                      src={imageObj?.key}
                      actionBody={<Eye />}
                      onActionBody={() => imagePreview(imageObj?.key)}
                      actionFooter={'删除'}
                      onActionFooter={() => mutateAsync(imageObj?.key)}
                    />
                    <TableFooter />
                  </Doll69If>
                </div>
              </>
            })
          }
        </div>
      </Doll69If>
    </TablePage>
  </>)
}

export default Image
