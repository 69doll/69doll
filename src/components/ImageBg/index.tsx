import React, { useMemo } from "react"
import Doll69Div, { type Doll69DivAttributes } from '../Doll69Div'
import css from './style.module.scss'

interface IImageBgAttributes {
  imageUrl: string;
  noAnimation?: boolean,
}

type ImageBgProps = React.PropsWithChildren<Doll69DivAttributes & IImageBgAttributes>

const ImageBg: React.FC<ImageBgProps> = ({ children, classNames = [], imageUrl, style = {}, noAnimation = false, ...props }) => {
  const divStyle = useMemo(() => {
    return {
      backgroundImage: `url(${imageUrl})`,
      ...style,
    }
  }, [imageUrl, style])
  return <Doll69Div
    classNames={[css.container, { 'noAnimation': noAnimation }, ...classNames]}
    style={divStyle}
    {...props}
  >{ children }</Doll69Div>
}

export default ImageBg
