import type React from "react";
import css from './style.module.scss'
import classNames from "classnames";
import TitleContainer from "../TitleContainer";
import { useMeasure, useWindowSize } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";
import { ClientOnly } from "vite-react-ssg";
import ImageBg from "../../../../components/ImageBg";

export interface IRecommendProps {
  title: string;
  tags: string[],
  map: Record<string, { imageUrl: string, title: string, url: string, flags?: string[] }[]>
}

const Recommend: React.FC<IRecommendProps> = ({ title, tags, map }) => {
  const countCard = 5
  const { width: windowWidth } = useWindowSize()
  const [recommendListRef, { width: recommendListWidth }] = useMeasure<HTMLDivElement>()
  const recommendCardWidth = useMemo(() => {
    if (!recommendListWidth) return
    return (recommendListWidth - 20 * 2) / countCard
  }, [recommendListWidth])
  const recommendCardStyle = useMemo(() => ({ width: recommendCardWidth }), [recommendCardWidth, windowWidth])
  const [currentTagIndex, setCurrentTagIndex] = useState(0)
  const [currentPage, setCurrentCardIndex] = useState(1)
  const recommendCards = useMemo(() => {
    return map[tags[currentTagIndex]]
  }, [currentTagIndex, currentPage])
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
              className={classNames(css.tag, { [css.active]: currentTagIndex === index })}
              onClick={() => (currentTagIndex !== index && setCurrentTagIndex(index))}
            >{tag}</div>)
          }
        </div>
      </TitleContainer>
      <div ref={recommendListRef} className={css.recommendList}>
        <div className={css.recommendListContainer}>
          {
            (map[tags[currentTagIndex]] ?? []).map((card) => <div>
              <div className={css.card}>
                <ImageBg className={css.img} style={recommendCardStyle} imageUrl={card.imageUrl}></ImageBg>
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
