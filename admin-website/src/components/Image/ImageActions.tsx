import type React from "react";
import { Doll69If } from "shared";
import css from './ImageActions.module.scss'
import Image, { type ImageProps } from "@/components/Image/Image";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

type ImageActionsProps = ImageProps & {
  src: string,
  actionBody?: React.ReactNode,
  onActionBody?: (e: React.MouseEvent) => any,
  actionFooter?: React.ReactNode,
  onActionFooter?: (e: React.MouseEvent) => any,
  disabled?: boolean,
}

const ImageActions: React.FC<ImageActionsProps> = ({
  onActionBody,
  actionBody,
  onActionFooter,
  actionFooter,
  src,
  className,
  disabled,
  ...props
}) => {
  return <div className={cn(css.imageActions, className)} {...props}>
    {
      src && <>
        <Image className={css.image} src={src}/>
      </>
    }
    {
      !src && <>
        <Skeleton className={css.image} />
      </>
    }
    {
      !disabled && <>
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
      </>
    }
  </div>
}

export default ImageActions
