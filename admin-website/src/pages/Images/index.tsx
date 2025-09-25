import type React from "react";
import { useState } from "react";
import PageTabs from "@/components/Page/PageTabs";
import Page from "@/components/Page/Page";

const ImageType = {
  LOGO: 'LOGO',
} as const

type ImageType = typeof ImageType[keyof typeof ImageType]

const Image: React.FC = () => {
  const imageTabs = [
    { name: '品牌配置', value: ImageType.LOGO },
  ]
  const [imageType, setImageType] = useState<ImageType>(ImageType.LOGO)
  return (<>
    <Page
      label="图片管理"
      header={
        <PageTabs
          options={imageTabs}
          defaultValue={imageType}
          onValueChange={(v) => setImageType(v as ImageType)}
        />
      }
    >
    </Page>
  </>)
}

export default Image
