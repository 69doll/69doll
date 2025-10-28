import { createContext } from "react";
import type { ImagePreviewDialogRef } from "@/components/Image/ImagePreviewDialog";

const ImagePreviewContext = createContext<ImagePreviewDialogRef>(undefined!)

export default ImagePreviewContext
