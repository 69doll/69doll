import type React from "react"
import { useEffect, useMemo, useState } from "react";
import { Doll69If } from "shared";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useTableFooterData } from "../Table/TableFooter.hook";
import TableFooter from "../Table/TableFooter";
import ImageActions from "./ImageActions";
import ImagePreviewDialog from "./ImagePreviewDialog";
import UploadImageArea from "./UploadImageArea";
import css from './SelectImages.module.scss'
import { getImageList, getImageListCacheKeys } from "@/request/image";
import { cn } from "@/lib/utils";

type DeletePopoverProps = {
  onChange: (keys: string[]) => any;
  min?: number;
  max?: number;
  keys: string[];
}

const SUPPORT_PAGE_SIZES = [25, 50, 100]

const SelectImages: React.FC<React.PropsWithChildren<DeletePopoverProps>> = ({
  onChange,
  min = 1,
  max = Infinity,
  keys = [],
}) => {
  const currentKeys = useMemo(() => keys.filter(Boolean), [keys])
  const preview = useMemo(() => (key: string) => {
    return <ImagePreviewDialog src={key}>查看</ImagePreviewDialog>
  }, [])
  const { pageNum, pageSize, useFooterData } = useTableFooterData({ sizes: SUPPORT_PAGE_SIZES })
  const { data, isFetching, refetch: refetchList } = useQuery({
    queryKey: getImageListCacheKeys({ pageNum, pageSize }),
    queryFn: () => getImageList({ pageNum, pageSize }),
    enabled: false,
  })
  const { list, footerProps } = useFooterData(data)
  const [selectedKeys, setSelectedKeys] = useState(currentKeys)
  const [isDialogOpen, setDialogOpen] = useState(false)
  useEffect(() => {
    if (isDialogOpen) {
      setSelectedKeys(currentKeys)
      refetchList()
    }
  }, [isDialogOpen])
  const onOkay = () => {
    onChange?.(selectedKeys)
    setDialogOpen(false)
  }
  const onClose = () => {
    setDialogOpen(false)
  }
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
  return <>
    <Doll69If display={!isFetching}>
      <Doll69If display={!currentKeys.length}>
        <ImageActions
          src={undefined!}
          actionBody={'选择'}
          onActionBody={() => setDialogOpen(true)}
          className="size-[130px]"
        />
      </Doll69If>
      {
        currentKeys.map((key) => {
          return <ImageActions
            src={key}
            key={key}
            actionBody={preview(key)}
            actionFooter={'重新选择'}
            onActionFooter={() => setDialogOpen(true)}
            className="size-[130px]"
          />
        })
      }
    </Doll69If>
    <Dialog open={isDialogOpen}>
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
            list.map((item) => {
              return <div className={cn(css.item, selectedKeys.includes(item.key) && css.selected)}>
                <ImageActions
                  src={item.key}
                  key={item.key}
                  actionBody={preview(item.key)}
                  actionFooter="选择"
                  onActionFooter={() => selectImage(item.key)}
                  className="size-[130px]"
                />
              </div>
            })
          }
        </div>
        <TableFooter {...footerProps} />
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOkay()}>确认</Button>
          <Button type="button" variant="secondary" onClick={() => onClose()}>关闭</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
}

export default SelectImages
