import type { Doll69DivProps } from "../Doll69Div";
import Doll69Div from "../Doll69Div";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Doll69If from "../Doll69If";
import css from './style.module.scss'

interface DetailCollapseRef {
  collapse: () => void;
  expand: () => void;
}

interface DetailCollapseProps {
  title: string,
  hint?: string,
  disabled?: boolean,
  mountCollapse?: boolean,
}

const DetailCollapse = forwardRef<DetailCollapseRef, Doll69DivProps & DetailCollapseProps>(({
  title,
  hint = '',
  children,
  mountCollapse = false,
  disabled = false,
  ...props
}, ref) => {
  const [isCollapse, setCollapse] = useState(false)
  useEffect(() => {
    setCollapse(mountCollapse)
  }, [mountCollapse])
  useImperativeHandle(ref, () => ({
    collapse: () => setCollapse(true),
    expand: () => setCollapse(false),
  }))
  return <>
    <Doll69Div classNames={[css.detailCollapse, { [css.isCollapse]: isCollapse }]} {...props}>
      <div className={css.header}>
        <div className={css.title}>{ title }</div>
        <div className={css.hint}>{ hint }</div>
        <Doll69Div
          classNames={[{ 'pointer': !disabled }, css.action]}
          onClick={() => !disabled && setCollapse(!isCollapse)}
        >
          <Doll69Div classNames={[css.icon, { [css.add]: isCollapse, [css.minus]: !isCollapse }]}></Doll69Div>
        </Doll69Div>
      </div>
      <div className={css.body}>
        <Doll69If display={!isCollapse}>
          { children }
        </Doll69If>
      </div>
    </Doll69Div>
  </>
})

export default DetailCollapse
