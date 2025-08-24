import css from './style.module.scss'
import ImageBg from '../../../../components/ImageBg'

const bannerUrls = [
  'https://www.realdoll.com/wp-content/uploads/2018/01/tanya-realdoll2-configuration-1-1479771091.jpg',
  'https://www.realdoll.com/wp-content/uploads/2018/01/tanya-realdoll2-configuration-1-1479771091.jpg',
  'https://www.realdoll.com/wp-content/uploads/2018/01/tanya-realdoll2-configuration-1-1479771091.jpg',
  'https://www.realdoll.com/wp-content/uploads/2018/01/tanya-realdoll2-configuration-1-1479771091.jpg',
  'https://www.realdoll.com/wp-content/uploads/2018/01/tanya-realdoll2-configuration-1-1479771091.jpg',
]

const Banner: React.FC = () => {
  return (
    <div className={css.banner}>
      <div className={css.bannerContainer}>
        <div>
          <div className={css.bannerContent}>
            <ImageBg className={css.bannerContentContainer} imageUrl={bannerUrls[0]}>
              <div>DOLLS</div>
              <div><div></div></div>
            </ImageBg>
          </div>
        </div>
        <div>
          <div className={css.bannerContent}>
            <ImageBg className={css.bannerContentContainer} imageUrl={bannerUrls[1]}>
              <div>DOLLS</div>
              <div><div></div></div>
            </ImageBg>
          </div>
          <div className={css.bannerContent}>
            <ImageBg className={css.bannerContentContainer} imageUrl={bannerUrls[2]}>
              <div>FACES</div>
              <div><div></div></div>
            </ImageBg>
          </div>
          <div className={css.bannerContent}>
            <ImageBg className={css.bannerContentContainer} imageUrl={bannerUrls[3]}>
              <div>TORSOS</div>
              <div><div></div></div>
            </ImageBg>
          </div>
          <div className={css.bannerContent}>
            <ImageBg className={css.bannerContentContainer} imageUrl={bannerUrls[4]}>
              <div>ACCESSORIES</div>
              <div><div></div></div>
            </ImageBg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
