import type React from "react"
import css from './style.module.scss'

const Footer: React.FC = () => {
  return (<>
    <div className={css.container}>
      <div className={css.body}>
        <div className={css.supported}>
          <div>69Doll</div>
          <div>
            <div><img src="https://img.moegirl.org.cn/common/9/95/MoegirlPedia-Title.png" alt="" /></div>
            <div><img src="https://img.moegirl.org.cn/common/9/95/MoegirlPedia-Title.png" alt="" /></div>
            <div><img src="https://img.moegirl.org.cn/common/9/95/MoegirlPedia-Title.png" alt="" /></div>
            <div><img src="https://img.moegirl.org.cn/common/9/95/MoegirlPedia-Title.png" alt="" /></div>
            <div><img src="https://img.moegirl.org.cn/common/9/95/MoegirlPedia-Title.png" alt="" /></div>
          </div>
        </div>
        <div className={css.menu}>
          <div className={css.menuItem}>
            <div className={css.item}>SHOP</div>
            <div className={css.item}>Faces</div>
            <div className={css.item}>Dolls</div>
            <div className={css.item}>Torsos</div>
            <div className={css.item}>Accessories</div>
          </div>
          <div className={css.menuItem}>
            <div className={css.item}>AFFILIATE</div>
            <div className={css.item}>Join Now</div>
          </div>
          <div className={css.menuItem}>
            <div className={css.item}>CUSTOMER CARE</div>
            <div className={css.item}>FAQ</div>
            <div className={css.item}>My Account</div>
            <div className={css.item}>Order Policies</div>
            <div className={css.item}>Care Guides</div>
          </div>
          <div className={css.menuItem}>
            <div className={css.item}>GET IN TOUCH</div>
            <div className={css.item}>sales@69doll.com</div>
            <div className={css.item}>support@69doll.com</div>
            <div className={css.item}>+(86)1008611</div>
          </div>
        </div>
        <div className={css.badge}>
          <div>
            <div><img src="https://www.realdoll.com/wp-content/uploads/2024/08/image-23-150x150.png" alt="" /></div>
            <div><img src="https://www.realdoll.com/wp-content/uploads/2020/02/xblz-footer-light-150x150.png" alt="" /></div>
          </div>
          <div>
            <div>X</div>
            <div>Fackbook</div>
            <div>Instagram</div>
          </div>
        </div>
        <div></div>
      </div>
      <div className={css.footer}>
        <div className={css.copyright}>
          2025 © 69doll, Inc. All rights reserved.
        </div>
        <div className={css.actions}>
          <div className={css.action}>Privacy Policy</div>
          <div className={css.action}>Terms & Conditions</div>
          <div className={css.action}>Return Policy</div>
        </div>
      </div>
    </div>
  </>)
}

export default Footer
