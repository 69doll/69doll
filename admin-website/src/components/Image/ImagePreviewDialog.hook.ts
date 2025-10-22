import { useRef } from "react"
import type { ImagePreviewDialogRef } from "./ImagePreviewDialog"

export const useImagePreviewDialogRef = () => {
  return useRef<ImagePreviewDialogRef>(null)
}
