import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { useMatches } from "react-router-dom"
import { ClientOnly } from "vite-react-ssg"
import { SHA1 } from 'crypto-js'
import ContentLayout from "../../components/ContentLayout"
import Doll69Button from "../../components/Doll69Button/index.tsx"
import Doll69Div from "../../components/Doll69Div/index.tsx"
import Doll69If from "../../components/Doll69If/index.tsx"
import SUPPORTED_LANGUAGE from "../../constant/SUPPORTED_LANGUAGE"
import useJumpPage from "../../hooks/useJumpPage.ts"
import getI18nAsync from "../../utils/getI18nAsync.ts"
import css from './style.module.scss'
import { genLoaderData } from "../../data.ts"
import { API_BASE_URL } from "../../constant.ts"
import useQuery from "../../hooks/useQuery.ts"

export const i18nMap = {
  [SUPPORTED_LANGUAGE.ZH_CN]: () => import('./i18n/zh-cn.ts'),
  [SUPPORTED_LANGUAGE.EN_US]: () => import('./i18n/en-us.ts'),
}

export const Component: React.FC = () => {
  const matches = useMatches()
  const isSignIn = useMemo(() => matches[0].pathname.includes('/signin'), [matches])
  const isSignUp = useMemo(() => matches[0].pathname.includes('/signup'), [matches])
  const [method, url] = useMemo(() => {
    switch (true) {
      case isSignIn: return ['POST', '/api/auth/login']
      case isSignUp: return ['POST', '/api/user/register']
      default: return ['POST', '/api/user/reset_password']
    }
  }, [isSignIn, isSignUp])
  const [formData, setFormData] = useState({})
  useEffect(() => setFormData({}), [matches])
  const { isLoading, refetch } = useQuery(
    new URL(url, API_BASE_URL),
    {
      method,
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      fetchOnMount: false,
    }
  )
  const jumper = useJumpPage()
  return (<>
    <ContentLayout>
      <ClientOnly>
        {() => <>
          <Doll69Div classNames={['section', css.container]}>
            <div className={css.title}>My Account</div>
            <div className={css.formContainer}>
              <Doll69If display={isSignIn || isSignUp}>
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
              </Doll69If>
              <Doll69If display={isSignIn}>
                <div className={css.formItemContainer}>
                  <div className={css.formItemLabel}>Username</div>
                  <div>
                    <input type="text" onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={isLoading}/>
                  </div>
                </div>
                <div className={css.formItemContainer}>
                  <div className={css.formItemLabel}>Password</div>
                  <div>
                    <input type="password" onChange={(e) => setFormData({ ...formData, password: SHA1(e.target.value).toString() })} disabled={isLoading}/>
                  </div>
                </div>
                <div className={css.remember}>
                  <input type="checkbox" name="" id="" />
                  <label>Remember me</label>
                </div>
                <Doll69Button onClick={() => refetch()} loading={isLoading}>
                  LOGIN
                </Doll69Button>
                <div className={css.forgot} onClick={() => jumper.FORGOT()}>LOST YOUR PASSWORD?</div>
              </Doll69If>
              <Doll69If display={isSignUp}>
                <div className={css.formItemContainer}>
                  <div className={css.formItemLabel}>Email address</div>
                  <div>
                    <input type="text" onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={isLoading}/>
                  </div>
                </div>
                <div className={css.formItemContainer}>
                  <div className={css.formItemLabel}>Password</div>
                  <div>
                    <input type="password" onChange={(e) => setFormData({ ...formData, rawPassword: SHA1(e.target.value).toString() })} disabled={isLoading}/>
                  </div>
                </div>
                <Doll69Button onClick={() => refetch()} loading={isLoading}>
                  REGISTER
                </Doll69Button>
              </Doll69If>
              <Doll69If display={!isSignIn && !isSignUp}>
                <div className={css.formItemContainer}>
                  <div className={css.formItemLabel}>Email address</div>
                  <div>
                    <input type="text" onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={isLoading}/>
                  </div>
                </div>
                <Doll69Button onClick={() => refetch()} loading={isLoading}>
                  Reset Password
                </Doll69Button>
              </Doll69If>
            </div>
          </Doll69Div>
        </>}
      </ClientOnly>
    </ContentLayout>
  </>)
}

export async function loader({ params }: any) {
  const i18n = await getI18nAsync(i18nMap, params.lang)
  return genLoaderData(params.lang, {
    pageName: i18n.signIn,
    i18n,
  })
}
