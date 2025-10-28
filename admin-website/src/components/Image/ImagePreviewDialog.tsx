import { forwardRef, lazy, useEffect, useImperativeHandle, useState } from "react";
import ModuleLoading from "../Loading/ModuleLoading";
import useCurrentUser from "@/Context/CurrentUser/useCurrentUser";

const Image = lazy(() => import('@/components/Image/Image'))
const Dialog = lazy(() => import('@/components/Dialog/Dialog'))

export interface ImagePreviewDialogProps {
  cdn?: boolean,
}

export type ImagePreviewDialogRef = {
  open: (key: string) => any;
  close: () => any;
}

const ImagePreviewDialog = forwardRef<ImagePreviewDialogRef, ImagePreviewDialogProps>(({ cdn = true }, ref) => {
  const currentUser = useCurrentUser()
  const [isOpen, setIsOpen] = useState(false)
  const [src, setSrc] = useState<string>()

  useImperativeHandle(ref, () => ({
    open (key: string) {
      setIsOpen(true)
      setTimeout(() => {
        setSrc(key)
      }, 25)
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
  if (!isOpen || !currentUser) return <></>
  return <>
    <ModuleLoading fullScreen={true}>
    <Dialog
      title='查看图片'
      className="max-h-dvh"
      onOpenChange={(open) => setIsOpen(open)}
    >
      {
        src && <Image className="w-full" cdn={cdn} src={src} />
      }
    </Dialog>
    </ModuleLoading>
  </>
})

export default ImagePreviewDialog
