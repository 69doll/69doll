import type React from "react";
import { getImageUrl } from "shared";

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & Parameters<typeof getImageUrl>[1]

const Image: React.FC<ImageProps> = ({ src, cdn = true, resize, ...props } = {}) => {
  return (<>
    <img src={getImageUrl(src, { cdn, resize })} loading="lazy" {...props} />
  </>)
}

export default Image
