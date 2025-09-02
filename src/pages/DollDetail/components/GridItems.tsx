import { pull } from "es-toolkit"
import Doll69Div from "../../../components/Doll69Div"
import useCardCount from "../../../hooks/useCardCount"
import GridItem from "./GridItem"
import css from './GridItems.module.scss'

interface GridItemsProps {
  items: {
    id: string,
    name: string,
    imageUrl: string,
    detailImageUrl?: string,
  }[],
  perRow: Parameters<typeof useCardCount>[0],
  min: number,
  max: number,
  currentIds: string[],
  onClick?: (ids: string[]) => any,
}

const GridItems: React.FC<GridItemsProps> = ({ items, min, max, perRow, currentIds, onClick }) => {
  const count = useCardCount(perRow)

  const onItemClick = (id: string) => {
    if (!onClick) return
    if (min === 1 && max === 1) return onClick([id])
    if (!currentIds.includes(id)) {
      if (max !== currentIds.length) return onClick(currentIds.concat([id]))
    } else {
      if (min !== currentIds.length) return onClick(pull(currentIds, [id]))
    }
  }
  return <>
    <Doll69Div classNames={['grid', `col-${count}`, css.container]}>
      {
        items.map((d) => <GridItem data={d} onClick={onItemClick} currentIds={currentIds}></GridItem>)
      }
    </Doll69Div>
  </>
}

export default GridItems
