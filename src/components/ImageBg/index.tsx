import React, { useEffect, useMemo, useState } from "react"
import Doll69Div, { type Doll69DivAttributes } from '../Doll69Div'
import css from './style.module.scss'
import { useIntersectionObserver } from "@uidotdev/usehooks";

interface IImageBgAttributes {
  imageUrl: string;
  brightness?: boolean,
  scale?: boolean,
  noAnimation?: boolean,
  parentHover?: boolean,
  lazy?: boolean,
}

type ImageBgProps = React.PropsWithChildren<Doll69DivAttributes & IImageBgAttributes>

const ImageBg: React.FC<ImageBgProps> = ({
  children,
  classNames = [],
  imageUrl,
  style = {},
  brightness = false,
  scale = true,
  noAnimation = false,
  parentHover = false,
  lazy = false,
  ...props
}) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  })
  const [isDisplayImage, setDisplayImage] = useState(false)
  useEffect(() => {
    if (isDisplayImage) return
    if (import.meta.env.SSR|| !lazy) setDisplayImage(true)
    else (!isDisplayImage && setDisplayImage(!!entry?.isIntersecting))
  }, [lazy, entry])
  const divStyle = useMemo(() => {
    return Object.assign(
      {},
      isDisplayImage && { backgroundImage: `url(${imageUrl})`, },
      style,
    )
  }, [imageUrl, style, lazy, entry])
  return <Doll69Div
    ref={ref}
    classNames={[
      css.imageBg,
      { [css.brightness]: brightness },
      { [css.scale]: scale },
      { [css.noAnimation]: noAnimation },
      { [css.parentHover]: parentHover },
      ...classNames,
    ]}
    style={divStyle}
    {...props}
  >{ children }</Doll69Div>
}

export default ImageBg
