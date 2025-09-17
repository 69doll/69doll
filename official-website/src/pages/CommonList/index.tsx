import Doll69If from "../../components/Doll69If"
import ImageBg from "../../components/ImageBg"
import css from './style.module.scss'

interface CommonListProps {
  list: { imageUrl: string, title: string, isNew?: boolean, amount: number, subTitle: string }[]
  onClick: (index: number) => any,
}

const CommonList: React.FC<CommonListProps> = ({ list = [], onClick }) => {
  return <>
    <>
      <div className="section">
        <div className={css.list}>
          {
            list.map((item, index) => <div key={index} className="pointer" onClick={() => onClick(index)}>
              <ImageBg className={css.image} imageUrl={item.imageUrl} parentHover={true}></ImageBg>
              <div className={css.title}>{ item.title }</div>
              <div className={css.subTitle}>{ item.subTitle }</div>
              <div className={css.amount}>{ item.amount }</div>
              <Doll69If display={!!item.isNew}>
                <div className={css.new}>NEW!!</div>
              </Doll69If>
            </div>)
          }
        </div>
      </div>
    </>
  </>
}

export default CommonList
