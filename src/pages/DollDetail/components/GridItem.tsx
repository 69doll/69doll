import Doll69Center from "../../../components/Doll69Center"
import ImageBg from "../../../components/ImageBg"
import css from './GridItem.module.scss'

interface GridItemProps {
  data: {
    id: string,
    name: string,
    imageUrl: string,
    detailImageUrl?: string,
  },
  currentIds: string[],
  onClick?: (id: string) => any,
}

const GridItem: React.FC<GridItemProps> = ({ data, currentIds, onClick }) => {
  return <>
    <Doll69Center classNames={['pointer', css.container, { [css.active]: currentIds.includes(data.id) }]} onClick={() => onClick?.(data.id)}>
      <ImageBg
        classNames={[css.image]}
        imageUrl={data.imageUrl}
      >
      </ImageBg>
      <div className={css.name}>{ data.name }</div>
    </Doll69Center>
  </>
}

export default GridItem
