import { useRef } from "react"
import type { SelectImagesDialogRef } from "./SelectImagesDialog"

export const useSelectImagesDialogRef = () => {
  return useRef<SelectImagesDialogRef>(null)
}
