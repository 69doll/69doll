import { useContext } from "react";
import ImagePreviewContext from "./ImagePreviewContext";

const useImagePreview = () => {
  const { open } = useContext(ImagePreviewContext) ?? {}
  return open
}

export default useImagePreview
