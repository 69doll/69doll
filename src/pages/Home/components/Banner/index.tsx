import css from './style.module.scss'
import ImageBg from '../../../../components/ImageBg'
import useJumpPage from '../../../../hooks/useJumpPage'

const bannerUrls = [
  'https://cdnfile.sspai.com/2025/08/21/article/307f9225044241c6fdd4b4710311a61d.jpeg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp',
  'https://cdnfile.sspai.com/2025/08/21/article/307f9225044241c6fdd4b4710311a61d.jpeg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp',
  'https://cdnfile.sspai.com/2025/08/21/article/307f9225044241c6fdd4b4710311a61d.jpeg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp',
  'https://cdnfile.sspai.com/2025/08/21/article/307f9225044241c6fdd4b4710311a61d.jpeg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp',
  'https://cdnfile.sspai.com/2025/08/21/article/307f9225044241c6fdd4b4710311a61d.jpeg?imageView2/2/w/1120/q/40/interlace/1/ignore-error/1/format/webp',
]

const Banner: React.FC = () => {
  const jumper = useJumpPage()
  return (
    <div className={css.banner}>
      <div className={css.bannerContainer}>
        <div className={css.bannerRecommend}>
          <div className={css.bannerContent}>
            <ImageBg className={css.bannerContentContainer} imageUrl={bannerUrls[0]}></ImageBg>
          </div>
        </div>
        <div>
          <div className={css.bannerItems}>
            <div className={css.bannerContent}>
              <ImageBg className={css.bannerContentContainer} imageUrl={bannerUrls[1]} onClick={() => jumper.DOLLS()}>
                <div>DOLLS</div>
                <div><div></div></div>
              </ImageBg>
            </div>
            <div className={css.bannerContent}>
              <ImageBg className={css.bannerContentContainer} imageUrl={bannerUrls[2]} onClick={() => jumper.FACES()}>
                <div>FACES</div>
                <div><div></div></div>
              </ImageBg>
            </div>
          </div>
          <div className={css.bannerItems}>
            <div className={css.bannerContent}>
              <ImageBg className={css.bannerContentContainer} imageUrl={bannerUrls[3]} onClick={() => jumper.TORSOS()}>
                <div>TORSOS</div>
                <div><div></div></div>
              </ImageBg>
            </div>
            <div className={css.bannerContent}>
              <ImageBg className={css.bannerContentContainer} imageUrl={bannerUrls[4]} onClick={() => jumper.ACCESSORIES()}>
                <div>ACCESSORIES</div>
                <div><div></div></div>
              </ImageBg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
