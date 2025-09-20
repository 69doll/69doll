import type React from "react";
import { Doll69If } from "shared";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/request/image";
import { useRef } from "react";
import { Button } from "../ui/button";
import css from './style.module.scss'
import { Skeleton } from "../ui/skeleton";

interface UploadAreaProps {
  src?: string,
  onChange?: (urlOrId: string) => any
}

const UploadArea: React.FC<UploadAreaProps> = ({ src, onChange }) => {
  const element = useRef<HTMLInputElement>(null)
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (file?: File) => {
      if (!file) return
      return await uploadImage(file)
    },
    onSuccess: (data) => {
      if (data?.code !== 200) return
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
        <div className={css.uploadArea}>
          <Doll69If display={isPending}>
            <Skeleton className="size-[100px]" />
          </Doll69If>
          <Doll69If display={!!src && !isPending}>
            <img src={src} />
          </Doll69If>
        </div>
      </Doll69If>
      <Doll69If display={!isPending}>
        <Button
          className={css.uploadButton}
          variant="outline"
          onClick={(e) => handleUploadClick(e)}
        >上传新图片</Button>
      </Doll69If>
      <Input
        className="hidden"
        ref={element}
        type="file"
        multiple={false}
        accept="image/*"
        onChange={(e) => mutateAsync(e.target.files?.[0])}
      />
    </div>
  </>
}

export default UploadArea
