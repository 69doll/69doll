import Doll69Div from '../../../components/Doll69Div'
import css from './count.module.scss'

const Count: React.FC<{ number: number, onChange?: (number: number) => any }> = ({ number, onChange }) => {
  const reduce = () => {
    number !== 1 && onChange?.(number - 1)
  }
  const add = () => {
    onChange?.(number + 1)
  }
  return <div className={css.count}>
    <Doll69Div classNames={['pointer', css.action]} onClick={() => reduce()}>-</Doll69Div>
    <div>{number}</div>
    <Doll69Div classNames={['pointer', css.action]} onClick={() => add()}>+</Doll69Div>
  </div>
}

export default Count
