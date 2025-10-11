import type React from "react";
import { Doll69If } from "shared";
import css from './ImageActions.module.scss'
import Image, { type ImageProps } from "@/components/Image/Image";

type ImageActionsProps = ImageProps & {
  src: string,
  actionBody?: React.ReactNode,
  onActionBody?: (e: React.MouseEvent) => any,
  actionFooter?: React.ReactNode,
  onActionFooter?: (e: React.MouseEvent) => any,
}

const ImageActions: React.FC<ImageActionsProps> = ({
  onActionBody,
  actionBody,
  onActionFooter,
  actionFooter,
  ...props
}) => {
  return <div className={css.imageActions}>
    <Image className={css.image} {...props} />
    <div className={css.actions}>
      <div className={css.actionBody} onClick={(e) => onActionBody?.(e)}>
        {actionBody}
      </div>
      <Doll69If display={!!actionFooter}>
        <div className={css.actionFooter} onClick={(e) => onActionFooter?.(e)}>
          {actionFooter}
        </div>
      </Doll69If>
    </div>
  </div>
}

export default ImageActions
