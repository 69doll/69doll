import type React from "react";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Doll69If } from "shared";
import { uploadImage } from "@/request/image";
import Image from "../Image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import css from "./UploadImageArea.module.scss";

interface UploadImageAreaProps {
  src?: string,
  onChange?: (urlOrId: string) => any
  multiple?: boolean,
  accept?: string,
  name?: string,
}

const UploadImageArea: React.FC<UploadImageAreaProps> = ({
  src,
  onChange,
  multiple = false,
  accept = 'image/*',
  name,
}) => {
  const element = useRef<HTMLInputElement>(null)
  const [key, setKey] = useState<string>()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (file?: File) => {
      if (!file) return
      return await uploadImage(file)
    },
    onSuccess: (data) => {
      if (data?.code !== 200) return
      setKey(data.data.keys[0])
      onChange?.(data.data.keys[0])
    },
    onSettled: () => {
      if (!element?.current) return
      element.current.value = null as any
    },
  })
  const handleUploadClick = (e: React.MouseEvent) => {
    element?.current?.click()
    e.preventDefault()
  }
  return <>
    <div>
      <Doll69If display={!!src || isPending}>
        <div className={css.uploadImageArea}>
          <Doll69If display={isPending}>
            <Skeleton className="size-[100px]" />
          </Doll69If>
          <Doll69If display={!!src && !isPending}>
            <Image src={src} />
          </Doll69If>
        </div>
      </Doll69If>
      <Doll69If display={!isPending}>
        <Button
          className={css.uploadButton}
          variant="outline"
          onClick={(e) => handleUploadClick(e)}
        >上传图片</Button>
      </Doll69If>
      <Input
        className="hidden"
        ref={element}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => mutateAsync(e.target.files?.[0])}
      />
      <Doll69If display={!!name}>
        <Input name={name} value={key} />
      </Doll69If>
    </div>
  </>
}

export default UploadImageArea
