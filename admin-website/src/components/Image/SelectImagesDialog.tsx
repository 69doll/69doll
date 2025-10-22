import React, { useEffect, useImperativeHandle } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useTableFooterData } from "../Table/TableFooter.hook";
import TableFooter from "../Table/TableFooter";
import { Button } from "../ui/button";
import ImageActions from "./ImageActions";
import UploadImageArea from "./UploadImageArea";
import css from './SelectImagesDialog.module.scss'
import ImagePreviewDialog from "./ImagePreviewDialog";
import { useImagePreviewDialogRef } from "./ImagePreviewDialog.hook";
import { getImageList, getImageListCacheKeys } from "@/request/image";
import { cn } from "@/lib/utils";
import useList from "@/hooks/useList";

export type SelectImagesDialogProps = {
  onChange: (keys: string[]) => any;
  min?: number;
  max?: number;
}

export type SelectImagesDialogRef = {
  open: (selectedKeys: string[]) => any;
  close: () => any;
}

const SUPPORT_PAGE_SIZES = [25, 50, 100]

const SelectImagesDialog = React.forwardRef<SelectImagesDialogRef, SelectImagesDialogProps>(({
  onChange,
  min = 1,
  max = Infinity,
}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedKeys, { init: setSelectedKeys }] = useList<string>()
  const closeDialog = () => {
    setIsOpen(false)
  }
  const save = () => {
    onChange?.(selectedKeys)
    closeDialog()
  }
  useImperativeHandle(ref, () => ({
    open (keys: string[]) {
      setSelectedKeys(keys)
      setIsOpen(true)
    },
    close () {
      closeDialog()
    },
  }), [])
  const { pageNum, pageSize, reset, useFooterData } = useTableFooterData({ sizes: SUPPORT_PAGE_SIZES })
  const { data, isFetching, refetch: refetchList } = useQuery({
    queryKey: getImageListCacheKeys({ pageNum, pageSize }),
    queryFn: () => getImageList({ pageNum, pageSize }),
    enabled: false,
  })
  const { list, footerProps } = useFooterData(data)
  const selectImage = (key: string) => {
    if (min === 1 && max === 1) {
      setSelectedKeys([key])
      return
    }
    if (selectedKeys.includes(key)) {
      if (selectedKeys.length - 1 >= min) {
        setSelectedKeys(selectedKeys.filter((k) => k !== key))
      }
    } else {
      if (max === Infinity || selectedKeys.length + 1 <= max) {
        setSelectedKeys([key].concat(selectedKeys))
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      reset()
      refetchList()
    }
  }, [isOpen])

  const imagePreviewDialogRef = useImagePreviewDialogRef()

  if (!isOpen) return <></>
  return <>
    <Dialog open={true}>
      <DialogContent className={css.dialog} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>选择图片</DialogTitle>
          <DialogDescription>
            {`已选择${selectedKeys.length}张图片`}
          </DialogDescription>
        </DialogHeader>
        <UploadImageArea onChange={() => refetchList()} />
        <div className={css.items}>
          {
            list.map((item, index) => {
              return <div
                className={cn(css.item, selectedKeys.includes(item.key) && css.selected)}
                key={`image-${index}`}
              >
                <ImageActions
                  src={item.key}
                  key={item.key}
                  actionBody={<Eye />}
                  onActionBody={() => imagePreviewDialogRef.current?.open(item.key)}
                  actionFooter="选择"
                  onActionFooter={() => selectImage(item.key)}
                  className="size-[130px]"
                  resize={{ width: 130 }}
                />
              </div>
            })
          }
        </div>
        <TableFooter {...footerProps} disabled={isFetching} />
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => save()}>确认</Button>
          <Button type="button" variant="secondary" onClick={() => closeDialog()}>关闭</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <ImagePreviewDialog ref={imagePreviewDialogRef} />
  </>
})

export default SelectImagesDialog
