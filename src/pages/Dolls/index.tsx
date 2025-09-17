import { useMemo } from "react"
import { useMeasure } from "@uidotdev/usehooks"
import Doll69Div from "../../components/Doll69Div"
import ImageBg from "../../components/ImageBg"
import useCardCount from "../../hooks/useCardCount"
import useJumpPage from "../../hooks/useJumpPage"
import getImageUrl from "../../utils/getImageUrl"
import { mockDollsList } from "../../mock"
import css from './style.module.scss'
import usePageData1 from "../../hooks/usePageData1"
import { genLoaderData } from "../../data"

export const Component: React.FC = () => {
  const list = usePageData1((setter) => setter(mockDollsList)) as typeof mockDollsList
  const cardCount = useCardCount([2, 3, 4, 5, 5, 5])
  const cardGroup = useMemo(() => (list ?? []).reduce<Array<typeof list>>((l, item, index) => {
    const key = Math.floor(index / cardCount)
    l[key] ??= []
    l[key].push(item)
    return l
  }, []), [cardCount, list])
  const [ref, { width: containerWidth }] = useMeasure()
  const cardStyle = useMemo(() => ({
    width: containerWidth ? `${(containerWidth - 25 * (cardCount - 1) - 80) / cardCount}px` : 0,
  }), [cardCount, containerWidth])
  const jumper = useJumpPage()
  return (
    <>
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
    </>
  )
}

export async function loader({ params }: any) {
  return genLoaderData(params.lang, {
    pageName: 'Dolls',
    data: mockDollsList,
  })
}
