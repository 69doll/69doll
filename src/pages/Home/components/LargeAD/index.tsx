import type React from "react";
import css from './style.module.scss'
import ImageBg from "../../../../components/ImageBg";
import getImageUrl from "../../../../utils/getImageUrl";

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
        imageUrl={getImageUrl(imageUrl, { cdn: true })}
        noAnimation={!onClick}
        onClick={onClick}
      ></ImageBg>
    </div>
  </>)
}

export default LargeAD
