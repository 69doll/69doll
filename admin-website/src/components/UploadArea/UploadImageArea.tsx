import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Doll69If } from "shared";
import Image from "../Image";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import css from "./UploadImageArea.module.scss";
import { uploadImage } from "@/request/image";

interface UploadImageAreaProps {
  multiple?: boolean,
  accept?: string,
  onChange?: (id: string) => any,
  onFormChange?: (obj: { name: string, value: string }) => any,
}

const UploadImageArea: React.FC<Omit<React.ComponentProps<'input'>, 'onChange'> & UploadImageAreaProps> = ({
  multiple = false,
  accept = 'image/*',
  onChange,
  onFormChange,
  ...inputProps
}) => {
  const { defaultValue, value, disabled, name } = inputProps
  const imageInputElement = useRef<HTMLInputElement>(null)
  const [key, setKey] = useState<string>()
  const currentSrc = useMemo(() => {
    return (key ?? value ?? defaultValue) as string
  }, [key, value, defaultValue])
  useEffect(() => {
    if (currentSrc) {
      onChange?.(currentSrc)
      name && onFormChange?.({ name, value: currentSrc })
    }
  }, [currentSrc])
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (file?: File) => {
      if (!file) return
      return await uploadImage(file)
    },
    onSuccess: (data) => {
      if (data?.code !== 200) return
      setKey(data.data.keys[0])
    },
  })
  const handleUploadClick = (e: React.MouseEvent) => {
    if (!imageInputElement?.current) return
    imageInputElement.current.value = null as any
    imageInputElement.current.click()
    e.preventDefault()
  }
  return <>
    <div className={css.uploadImageArea}>
      <div className={css.image}>
        <Doll69If display={!!currentSrc || isPending}>
          <div className={css.imageWrapper}>
            <Doll69If display={isPending}>
              <Skeleton />
            </Doll69If>
            <Doll69If display={!!currentSrc && !isPending}>
              <Image src={currentSrc} cdn={true} />
            </Doll69If>
          </div>
        </Doll69If>
      </div>
      <Doll69If display={!isPending && !disabled}>
        <Button
          className={css.uploadButton}
          variant="outline"
          onClick={(e) => handleUploadClick(e)}
        >上传图片</Button>
      </Doll69If>
      <input
        className="hidden"
        ref={imageInputElement}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => mutateAsync(e.target.files?.[0])}
      />
    </div>
  </>
}

export default UploadImageArea
