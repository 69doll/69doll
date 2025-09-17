import Doll69Div from "../Doll69Div";
import css from './style.module.scss'

const OrderSteps: React.FC<{ checkout?: boolean, order?: boolean }> = ({
  checkout,
  order,
}) => <>
  <div className={css.stepsWrapper}>
    <div className={css.steps}>
      <Doll69Div classNames={[css.label, css.cart]}>SHOPPING CART</Doll69Div>
      <div>{'->'}</div>
      <Doll69Div classNames={[css.label, css.checkout]}>CHECKOUT</Doll69Div>
      <div>{'->'}</div>
      <Doll69Div classNames={[css.label, css.order]}>ORDER COMPLETE</Doll69Div>
      <Doll69Div classNames={[css.active, css.cart]}></Doll69Div>
      <Doll69Div classNames={[{[css.active]: checkout}, css.checkout]}></Doll69Div>
      <Doll69Div classNames={[{[css.active]: order}, css.order]}></Doll69Div>
    </div>
  </div>
</>

export default OrderSteps
