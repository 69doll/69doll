import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Image from "@/components/Image/Image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface ImagePreviewDialogProps {
  cdn?: boolean,
}

export type ImagePreviewDialogRef = {
  open: (key: string) => any;
  close: () => any;
}

const ImagePreviewDialog = forwardRef<ImagePreviewDialogRef, ImagePreviewDialogProps>(({ cdn = true }, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [src, setSrc] = useState<string>()

  useImperativeHandle(ref, () => ({
    open (key: string) {
      setSrc(key)
      setIsOpen(true)
    },
    close () {
      setIsOpen(false)
    },
  }), [])
  useEffect(() => {
    if (!isOpen) {
      setSrc(undefined)
    }
  }, [isOpen])
  if (!isOpen) return <></>
  return <Dialog open={true} onOpenChange={(open) => setIsOpen(open)}>
    <DialogContent className="max-h-dvh">
      <DialogHeader>
        <DialogTitle>查看图片</DialogTitle>
      </DialogHeader>
      {
        src && <Image className="w-full" cdn={cdn} src={src} />
      }
    </DialogContent>
  </Dialog>
})

export default ImagePreviewDialog
