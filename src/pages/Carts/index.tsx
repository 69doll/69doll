import { useMemo, useState } from 'react'
import ImageBg from '../../components/ImageBg'
import { mockLargeImageUrl } from '../../mock'
import Count from './components/Count'
import css from './style.module.scss'
import { cloneDeep } from 'es-toolkit'
import Doll69Button from '../../components/Doll69Button'
import Doll69Div from '../../components/Doll69Div'
import OrderSteps from '../../components/OrderSteps'

export const Component: React.FC = () => {
  const [cartList, setCartList] = useState([
    {
      imageUrl: mockLargeImageUrl,
      product: 'PRODUCT',
      quantity: 1,
      amount: 1000,
      additional: [
        {
          imageUrl: mockLargeImageUrl,
          product: 'Additional',
          quantity: 1,
          amount: 200,
        },
        {
          imageUrl: mockLargeImageUrl,
          product: 'Additional',
          quantity: 1,
          amount: 0,
        },
      ],
    },
    {
      imageUrl: mockLargeImageUrl,
      product: 'PRODUCT',
      quantity: 1,
      amount: 1000,
    },
  ])
  const subtotal = useMemo(() => cartList.reduce((t, cartObj) => {
    let amount = cartObj.amount
    cartObj.additional?.forEach((additionalObj) => {
      amount += additionalObj.amount * additionalObj.quantity
    })
    return t + amount * cartObj.quantity
  }, 0), [cartList])
  const total = useMemo(() => subtotal, [subtotal])
  const setListByIndex = (index: number, num: number) => {
    const preList = cloneDeep(cartList)
    preList[index].quantity = num
    setCartList(preList)
  }
  return (<>
    <OrderSteps />
    <div className={css.grid}>
      <div className={css.list}>
        <div className={css.header}>
          <div className={css.product}>PRODUCT</div>
          <div className={css.price}>PRICE</div>
          <div className={css.quantity}>QUANTITY</div>
          <div className={css.total}>TOTAL</div>
        </div>
        {
          cartList.map((item, index) => {
            return <>
              <div>
                <div className={css.action}>X</div>
                <ImageBg className={css.image} imageUrl={item.imageUrl}></ImageBg>
                <div className={css.product}>{item.product}</div>
                <div className={css.price}>{item.amount}</div>
                <div className={css.quantity}><Count number={item.quantity} onChange={(num) => setListByIndex(index, num)} /></div>
                <div className={css.total}>{item.amount * item.quantity}</div>
              </div>
              {
                (item.additional ?? []).map((item) => <div>
                  <ImageBg className={css.image} imageUrl={item.imageUrl}></ImageBg>
                  <div className={css.product}>{item.product}</div>
                  <div className={css.price}>{item.amount}</div>
                  <div className={css.quantity}>{item.quantity}</div>
                  <div className={css.total}>{item.amount * item.quantity}</div>
                </div>)
              }
            </>
          })
        }
      </div>
      <div>
        <div className={css.subtotalWrapper}>
          <div className={css.title}>CART TOTALS</div>
          <Doll69Div classNames={[css.item, css.subtotal]}>
            <div>Subtotal</div>
            <div>{subtotal}</div>
          </Doll69Div>
          <div className={css.item}>
            <div>Shipping</div>
            <div></div>
          </div>
          <Doll69Div classNames={[css.item, css.total]}>
            <div>Total</div>
            <div>{total}</div>
          </Doll69Div>
          <Doll69Button>PROCEED TO CHECKOUT</Doll69Button>
        </div>
      </div>
    </div>
  </>)
}
