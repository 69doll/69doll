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
import Doll69Div from "../../components/Doll69Div/index.tsx"
import Doll69If from "../../components/Doll69If/index.tsx"

export const i18nMap = {
  [SUPPORTED_LANGUAGE.ZH_CN]: () => import('./i18n/zh-cn.ts'),
  [SUPPORTED_LANGUAGE.EN_US]: () => import('./i18n/en-us.ts'),
}

export const Component: React.FC = () => {
  const matches = useMatches()
  const isSignIn = useMemo(() => matches[0].pathname.includes('/signin'), [matches])
  const jumper = useJumpPage()
  return (<>
    <ContentLayout>
      <ClientOnly>
        {() => <>
          <div className={css.container}>
            <div className={css.title}>My Account</div>
            <div className={css.formContainer}>
              <div className={css.actions}>
                <Doll69Div
                  classNames={[css.action, { [css.active]: isSignIn }]}
                  onClick={() => isSignIn || jumper.SIGNIN()}
                >
                  <div className={css.content}>Login</div>
                </Doll69Div>
                <Doll69Div
                  classNames={[css.action, { [css.active]: !isSignIn }]}
                  onClick={() => !isSignIn || jumper.SIGNUP()}
                >
                  <div className={css.content}>Register</div>
                </Doll69Div>
              </div>
              <Doll69If display={isSignIn}>
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
              </Doll69If>
              <Doll69If display={!isSignIn}>
                <div className={css.formItemContainer}>
                  <div className={css.formItemLabel}>Email address</div>
                  <div>
                    <input type="text" />
                  </div>
                </div>
                <div className={css.actionBtn}>REGISTER</div>
              </Doll69If>
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
