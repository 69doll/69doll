import type React from "react";
import css from './style.module.scss'
import ImageBg from "../../../../components/ImageBg";

export interface ILargeADProps {
  imageUrl: string;
  onClick?: () => any,
}

const LargeAD: React.FC<ILargeADProps> = ({ imageUrl, onClick }) => {
  return (<>
    <div className={css.large}>
      <ImageBg
        lazy={true}
        className={css.background}
        imageUrl={imageUrl}
        noAnimation={!onClick}
        onClick={onClick}
      ></ImageBg>
    </div>
  </>)
}

export default LargeAD
