import type React from "react";
import css from './style.module.scss'

export interface ILargeADProps {
  imageUrl: string;
}

const LargeAD: React.FC<ILargeADProps> = ({ imageUrl }) => {
  return (<>
    <div className={css.large}>
      <div className={css.background}  style={{ backgroundImage: `url(${imageUrl})` }}>
      </div>
    </div>
  </>)
}

export default LargeAD
