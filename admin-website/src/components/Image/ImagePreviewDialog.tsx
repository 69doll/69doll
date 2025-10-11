import type React from "react";
import Image from "@/components/Image/Image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ImagePreviewDialogProps {
  cdn?: boolean,
  src: string,
}

const ImagePreviewDialog: React.FC<React.PropsWithChildren<ImagePreviewDialogProps>> = ({ children, cdn = true, src }) => {
  return <Dialog>
    <DialogTrigger asChild>
      { typeof children === 'string' ? <span>{children}</span> : children }
    </DialogTrigger>
    <DialogContent className="max-h-dvh">
      <DialogHeader>
        <DialogTitle>查看图片</DialogTitle>
      </DialogHeader>
      <Image className="w-full" cdn={cdn} src={src} />
    </DialogContent>
  </Dialog>
}

export default ImagePreviewDialog
