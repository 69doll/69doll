import type React from "react"
import { useMemo } from "react"
import { ClientOnly } from "vite-react-ssg"
import ContentLayout from "../../components/ContentLayout"
import loaderData from "../../utils/loaderData"
import SUPPORTED_LANGUAGE from "../../constant/SUPPORTED_LANGUAGE"
import getI18nAsync from "../../utils/getI18nAsync.ts"
import css from './style.module.scss'
import { useMatches } from "react-router-dom"
import useJumpPage from "../../hooks/useJumpPage.ts"

export const i18nMap = {
  [SUPPORTED_LANGUAGE.ZH_CN]: () => import('./i18n/zh-cn.ts'),
  [SUPPORTED_LANGUAGE.EN_US]: () => import('./i18n/en-us.ts'),
}

export const Component: React.FC = () => {
  const matches = useMatches()
  const cardIndex = useMemo(() => matches[0].pathname.includes('/signin') ? 0 : 1, [matches])
  const jumper = useJumpPage()
  return (<>
    <ContentLayout>
      <ClientOnly>
        {() => <>
          <div className={css.container}>
            <div className={css.title}>My Account</div>
            <div className={css.formContainer}>
              <div className={css.actions}>
                <div onClick={() => (cardIndex === 0) || jumper.SIGNIN()}>Login</div>
                <div onClick={() => (cardIndex === 1) || jumper.SIGNUP()}>Register</div>
              </div>
              {
                cardIndex === 0 ? (
                  <>
                    <div className={css.formItemContainer}>
                      <div className={css.formItemLabel}>Username</div>
                      <div>
                        <input type="text" />
                      </div>
                    </div>
                    <div className={css.formItemContainer}>
                      <div className={css.formItemLabel}>Password</div>
                      <div>
                        <input type="password" />
                      </div>
                    </div>
                    <div className={css.remember}>
                      <input type="checkbox" name="" id="" />
                      <label>Remember me</label>
                    </div>
                    <div className={css.actionBtn}>LOGIN</div>
                    <div className={css.forgot}>LOST YOUR PASSWORD?</div>
                  </>
                ) : null
              }
              {
                cardIndex === 1 ? (
                  <>
                    <div className={css.formItemContainer}>
                      <div className={css.formItemLabel}>Email address</div>
                      <div>
                        <input type="text" />
                      </div>
                    </div>
                    <div className={css.actionBtn}>REGISTER</div>
                  </>
                ) : null
              }
            </div>
          </div>
        </>}
      </ClientOnly>
    </ContentLayout>
  </>)
}

export async function loader({ params }: any) {
  const i18n = await getI18nAsync(i18nMap, params.lang)
  return loaderData()
    .setTitle(`${i18n.signIn} | 69Doll`)
}
