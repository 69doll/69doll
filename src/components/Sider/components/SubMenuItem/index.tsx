import type React from "react";
import ImageBg from "../../../ImageBg";
import Doll69If from "../../../Doll69If";
import css from './style.module.scss'
import Doll69Div from "../../../Doll69Div";

interface ISubMenuItemProps {
  imageUrl: string,
  title: string,
  rate?: number,
  viewer?: number,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
}

const SubMenuItem: React.FC<ISubMenuItemProps> = ({ imageUrl, title, rate, viewer, onClick }) => {
  return (<>
    <Doll69Div classNames={['pointer', css.subMenuItem]} onClick={onClick}>
      <ImageBg imageUrl={imageUrl} parentHover={true} />
      <div>{title}</div>
      <Doll69If display={typeof rate === 'number'}><div>{rate}</div></Doll69If>
      <Doll69If display={typeof viewer === 'number'}><div>{viewer} viewers</div></Doll69If>
    </Doll69Div>
  </>)
}

export default SubMenuItem
