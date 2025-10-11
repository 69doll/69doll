import type React from "react";
import { type getImageUrl } from "shared";
import { useMemo } from "react";
import DeletePopover from "../Popover/DeletePopover";
import ImageActions from "./ImageActions";
import ImagePreviewDialog from "./ImagePreviewDialog";

type ImageFieldProps = Parameters<typeof getImageUrl>[1] & {
  src: string,
  onDelete?: () => any,
  className?: string,
}

const ImageField: React.FC<ImageFieldProps> = ({
  onDelete,
  ...props
}) => {
  const actionBody = useMemo(() => (src: string) => <ImagePreviewDialog
    src={src}
  >查看</ImagePreviewDialog>, [])

  const { src } = props
  return <ImageActions
    actionBody={actionBody(src)}
    actionFooter={<DeletePopover onClick={() => onDelete?.()}>删除</DeletePopover>}
    {...props}
  />
}

export default ImageField
