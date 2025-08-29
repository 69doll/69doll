import css from './style.module.scss'
import ImageBg from '../../../../components/ImageBg'
import useJumpPage from '../../../../hooks/useJumpPage'
import Doll69If from '../../../../components/Doll69If'
import { useMemo } from 'react'
import { match } from 'ts-pattern'

const DEFAULT_MENU_LIST = [
  { imageUrl: '', routeKey: 'DOLLS' },
  { imageUrl: '', routeKey: 'FACES' },
  { imageUrl: '', routeKey: 'TORSOS' },
  { imageUrl: '', routeKey: 'ACCESSORIES' },
] as const

interface IBannerProps {
  revealList: Array<{ imageUrl: string } & ({ routeKey: keyof ReturnType<typeof useJumpPage>, routeObject?: Record<string, string> })>,
  menuList: typeof DEFAULT_MENU_LIST,
}

const Banner: React.FC<IBannerProps> = ({ revealList = [], menuList: paramMenuList = [] }) => {
  const jumper = useJumpPage()
  const i18n = useMemo(() => ({
    dolls: 'DOLLS',
    faces: 'FACES',
    torsos: 'TORSOS',
    accessories: 'ACCESSORIES',
  }), [])
  const menuList = useMemo(() => {
    return DEFAULT_MENU_LIST.map((menuObj, index) => {
      return Object.assign(
        {},
        menuObj,
        paramMenuList[index] ?? {},
        {
          title: match(index)
            .with(0, () => i18n.dolls)
            .with(1, () => i18n.faces)
            .with(2, () => i18n.torsos)
            .with(3, () => i18n.accessories)
            .otherwise(() => ''),
        },
      )
    })
  }, [i18n])
  return (
    <div className={css.banner}>
      <div className={css.bannerContainer}>
        <Doll69If display={revealList.length}>
          <div className={css.bannerRecommend}>
            <div className={css.bannerContent}>
              {
                revealList.map((revealObj, index) => {
                  const hasClickFn = !!revealObj.routeKey
                  const onClickFn = () => {
                    return hasClickFn ? jumper[revealObj.routeKey](revealObj.routeObject ?? {} as any) : undefined
                  }
                  return <ImageBg
                    key={index}
                    classNames={[css.bannerContentContainer, { 'pointer': hasClickFn }]}
                    imageUrl={revealObj.imageUrl}
                    onClick={onClickFn}
                    noAnimation={!hasClickFn}
                  ></ImageBg>
                })
              }
            </div>
          </div>
        </Doll69If>
        <div>
          <div className={css.bannerItems}>
            {
              [
                menuList[0],
                menuList[1],
              ].map((menuObj) => {
                return <div className={css.bannerContent}>
                  <ImageBg
                    classNames={[css.bannerContentContainer, 'pointer']}
                    imageUrl={menuObj.imageUrl}
                    onClick={() => jumper[menuObj.routeKey]()}
                  >
                    <div>{ menuObj.title }</div>
                    <div><div></div></div>
                  </ImageBg>
                </div>
              })
            }
          </div>
          <div className={css.bannerItems}>
            {
              [
                menuList[2],
                menuList[3],
              ].map((menuObj) => {
                return <div className={css.bannerContent}>
                  <ImageBg
                    classNames={[css.bannerContentContainer, 'pointer']}
                    imageUrl={menuObj.imageUrl}
                    onClick={() => jumper[menuObj.routeKey]()}
                  >
                    <div>{ menuObj.title }</div>
                    <div><div></div></div>
                  </ImageBg>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
