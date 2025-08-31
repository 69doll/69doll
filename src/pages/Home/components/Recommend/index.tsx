import type React from "react";
import css from './style.module.scss'
import classNames from "classnames";
import TitleContainer from "../TitleContainer";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";
import { ClientOnly } from "vite-react-ssg";
import ImageBg from "../../../../components/ImageBg";

export interface IRecommendProps {
  title: string;
  tags: string[],
  map: Record<string, { imageUrl: string, title: string, url: string, flags?: string[] }[]>
}

const Recommend: React.FC<IRecommendProps> = ({ title, tags, map }) => {
  const { width: windowWidth } = useWindowSize()
  const countCard = useMemo(() => {
    if (!windowWidth) return 5
    if (windowWidth < 640) {
      return 2
    } else if (windowWidth < 768) {
      return 3
    } else if (windowWidth < 1024) {
      return 4
    }
    return 5
  }, [windowWidth])
  const [currentTagIndex, setCurrentTagIndex] = useState(0)
  const [currentPage, setCurrentCardIndex] = useState(1)
  const recommendCards = useMemo(() => {
    return map[tags[currentTagIndex]] ?? []
  }, [currentTagIndex, currentPage])
  const recommendCardStyle = useMemo(() => ({ width: recommendCards.length ? `${100 / recommendCards.length}%` : '100%' }), [windowWidth])
  const recommendContainerStyle = useMemo(() => ({ width: recommendCards.length ? `${100 * recommendCards.length / countCard}%` : '100%' }), [countCard, windowWidth])

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
                <ImageBg className={css.img} imageUrl={card.imageUrl}></ImageBg>
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
