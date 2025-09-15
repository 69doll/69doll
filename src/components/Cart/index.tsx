import type React from "react"
import css from './style.module.scss'
import { useCloseSider } from "../../context/SiderDisplay"
import useJumpPage from "../../hooks/useJumpPage"
import Doll69Button from "../Doll69Button"

const Cart: React.FC = () => {
  const close = useCloseSider()
  const jumper = useJumpPage()
  const jumpViewPage = () => {
    close()
    jumper.CARTS()
  }
  return <>
    <div className={css.wrapper}>
      <div className={css.masking} onClick={() => close()} />
      <div className={css.containerWrapper}>
        <div className={css.cartWrapper}>

        </div>
        <Doll69Button onClick={() => jumpViewPage()}>
          View Cart
        </Doll69Button>
      </div>
    </div>
  </>
}

export default Cart
