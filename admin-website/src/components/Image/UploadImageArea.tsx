import { useMutation } from "@tanstack/react-query";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Doll69If } from "shared";
import { uploadImage } from "@/request/image";

type UploadImageAreaProps = {
  multiple?: boolean,
  accept?: string,
  onChange?: (id: string | string[]) => any,
}

const UploadImageArea: React.FC<UploadImageAreaProps> = ({
  multiple = false,
  accept = 'image/*',
  onChange,
}) => {
  const getDefaultKey = useMemo(() => () => multiple ? [] as string[] : undefined, [])
  const [key, setKey] = useState<string|string[]>(getDefaultKey()!)
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (files: File[] = []) => {
      if (files.length === 0) return Promise.reject('No files need to upload')
      return Promise.all(files.map((file) => uploadImage(file)))
    },
    onSuccess: (data) => {
      const isAllSuccess = data?.every(({ code }) => code === 200)
      if (!isAllSuccess) return
      const keys = data?.map(({ data: { keys } }) => keys[0]) ?? []
      if (multiple) {
        setKey(keys)
      } else {
        setKey(keys[0])
      }
    },
    onError () {
      setKey(getDefaultKey()!)
    },
  })
  useEffect(() => {
    if (isPending) return
    if (multiple ? key.length : key) {
      onChange?.(key)
    }
  }, [key, isPending])
  const imageInputElement = useRef<HTMLInputElement>(null)
  const stopEvent = useMemo(() => (e: React.MouseEvent | React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])
  const handleOnClick = useMemo(() => (e: React.MouseEvent) => {
    stopEvent(e)
    if (isPending) return
    if (!imageInputElement?.current) return
    imageInputElement.current.click()
  }, [])
  const [isDragOver, setIsDragOver] = useState(false)
  const handleOnDrag = useMemo(() => async (e: React.DragEvent) => {
    stopEvent(e)
    if (isPending) return
    if (e.type === 'drop') {
      const items = Array.from(e.dataTransfer.items)
        .filter((item) => item.webkitGetAsEntry()?.isFile)
      const files: File[] = await Promise.all(
        items.map((item) => {
          const entry = item.webkitGetAsEntry()
          return new Promise<File>((resolve) => {
            (entry as any).file((file: File) => resolve(file))
          })
        })
      )
      if (files.length !== 0) {
        await mutateAsync(files)
      }
    }
    setIsDragOver(e.type !== 'dragleave')
  }, [])
  return <div
    className="flex border border-solid border-gray hover:border-black rounded-sm w-full h-[120px]"
    onDrop={handleOnDrag}
    onDragEnter={handleOnDrag}
    onDragOver={handleOnDrag}
    onDragLeave={handleOnDrag}
  >
    <Doll69If display={isPending}>
      <div className="flex justify-center items-center w-full">
        上传中...
      </div>
    </Doll69If>
    <Doll69If display={!isPending}>
      <Doll69If display={isDragOver}>
        <div className="flex justify-center items-center w-full">
          松开将会开始上传
        </div>
      </Doll69If>
      <Doll69If display={!isDragOver}>
        <div className="flex justify-center items-center w-full cursor-pointer" onClick={(e) => handleOnClick(e)}>
          拖曳文件到这里或者点击上传
        </div>
      </Doll69If>

      <input
        className="hidden"
        ref={imageInputElement}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => mutateAsync(e.target.files ? Array.from(e.target.files) : [])}
      />
    </Doll69If>
  </div>
}

export default UploadImageArea
