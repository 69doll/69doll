import { useLocation } from "react-router-dom"
import type React from "react"
import { useEffect } from "react"
import ImagePreviewContext from "./ImagePreviewContext"
import { useImagePreviewDialogRef } from "@/components/Image/ImagePreviewDialog.hook"
import ImagePreviewDialog from "@/components/Image/ImagePreviewDialog"

const ImagePreviewProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const ref = useImagePreviewDialogRef()
  const location = useLocation()
  useEffect(() => {
    ref.current?.close()
  }, [location])
  return <ImagePreviewContext.Provider
    value={ref.current!}
  >
    {children}
    <ImagePreviewDialog ref={ref} />
  </ImagePreviewContext.Provider>
}

export default ImagePreviewProvider
