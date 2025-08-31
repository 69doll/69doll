import { useMemo } from "react"
import { useLoaderData } from "react-router-dom"
import { useMeasure } from "@uidotdev/usehooks"
import ContentLayout from "../../components/ContentLayout"
import Doll69Div from "../../components/Doll69Div"
import ImageBg from "../../components/ImageBg"
import useCardCount from "../../hooks/useCardCount"
import useJumpPage from "../../hooks/useJumpPage"
import getImageUrl from "../../utils/getImageUrl"
import loaderData from "../../utils/loaderData"
import { mockDollsList } from "../../mock"
import css from './style.module.scss'

export const Component: React.FC = () => {
  const defaultLoaderData = useLoaderData() as ReturnType<typeof loaderData>
  const list: typeof mockDollsList = defaultLoaderData.get('data') ?? mockDollsList
  const cardCount = useCardCount()
  const cardGroup = useMemo(() => list.reduce<Array<typeof list>>((l, item, index) => {
    const key = Math.floor(index / cardCount)
    l[key] ??= []
    l[key].push(item)
    return l
  }, []), [cardCount])
  const [ref, { width: containerWidth }] = useMeasure()
  const cardStyle = useMemo(() => ({
    width: containerWidth ? `${(containerWidth - 25 * (cardCount - 1) - 80) / cardCount}px` : 0,
  }), [cardCount, containerWidth])
  const jumper = useJumpPage()
  return (
    <ContentLayout>
      <Doll69Div classNames={['section', css.title]}>REALDOLL</Doll69Div>
      <Doll69Div classNames={['section', css.container]} ref={ref}>
        {
          cardGroup.map((list, gIndex) => {
            return <div key={`list-${gIndex}`}>
              {
                list.map((item, lIndex) => <div
                  key={`item-${lIndex}`}
                  style={cardStyle}
                  onClick={() => jumper.DOLL_DETAIL({ id: item.id })}
                >
                  <ImageBg
                    className={css.image}
                    imageUrl={getImageUrl(item.imageUrl)}
                    parentHover={true}
                  ></ImageBg>
                  <div className={css.title}>{ item.title }</div>
                </div>)
              }
            </div>
          })
        }
      </Doll69Div>
    </ContentLayout>
  )
}

export async function loader () {
  return loaderData()
    .setTitle('Dolls | 69Doll')
    .set('data', mockDollsList)
}
