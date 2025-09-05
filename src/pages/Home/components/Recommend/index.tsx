import type React from "react";
import { useMemo, useState } from "react";
import classNames from "classnames";
import { ClientOnly } from "vite-react-ssg";
import css from './style.module.scss'
import TitleContainer from "../TitleContainer";
import ImageBg from "../../../../components/ImageBg";
import useCardCount from "../../../../hooks/useCardCount";

export interface IRecommendProps {
  title: string;
  tags: string[],
  map: Record<string, { imageUrl: string, title: string, url: string, flags?: string[] }[]>
}

const Recommend: React.FC<IRecommendProps> = ({ title, tags, map }) => {
  const countCard = useCardCount([2, 3, 4, 5, 5, 5])
  const [currentTagIndex, setCurrentTagIndex] = useState(0)
  const [currentPage, setCurrentCardIndex] = useState(1)
  const recommendCards = useMemo(() => {
    return map[tags[currentTagIndex]] ?? []
  }, [currentTagIndex, currentPage])
  const recommendCardStyle = useMemo(() => ({ width: recommendCards.length ? `${100 / recommendCards.length}%` : '100%' }), [countCard])
  const recommendContainerStyle = useMemo(() => ({ width: recommendCards.length ? `${100 * recommendCards.length / countCard}%` : '100%' }), [countCard])

  const prev = () => currentPage !== 0 ? setCurrentCardIndex(currentPage - 1) : void 0
  const next = () => currentPage + countCard !== recommendCards.length - 1 ? setCurrentCardIndex(currentPage + 1) : void 0
  return (<>
    <div className={css.recommend}>
      <TitleContainer className={css.container}>
        <div>
          <span>{title}</span>
          <ClientOnly>
            {() => (
              <div className={css.btnGroup}>
                <div className={css.btn} onClick={() => prev()}>
                  <div className={classNames('icon', css.left)}></div>
                </div>
                <div className={css.btn} onClick={() => next()}>
                  <div className={classNames('icon', css.right)}></div>
                </div>
              </div>
            )}
          </ClientOnly>
        </div>
        <div className={css.tags}>
          {
            tags.map((tag, index) => <div
              key={index}
              className={classNames(css.tag, { [css.active]: currentTagIndex === index })}
              onClick={() => (currentTagIndex !== index && setCurrentTagIndex(index))}
            >{tag}</div>)
          }
        </div>
      </TitleContainer>
      <div className={css.recommendList}>
        <div className={css.recommendListContainer} style={recommendContainerStyle}>
          {
            recommendCards.map((card, index) => <div style={recommendCardStyle} key={index}>
              <div className={css.card}>
                <ImageBg
                  lazy={true}
                  className={css.img}
                  imageUrl={card.imageUrl}
                  parentHover={true}
                ></ImageBg>
                <div className={css.label}>{ card.title }</div>
                <div className={css.sublabel}>{ tags[currentTagIndex] }</div>
              </div>
            </div>)
          }
        </div>
      </div>
    </div>
  </>)
}

export default Recommend
