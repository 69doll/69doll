import '@unocss/reset/normalize.css'
import css from './style.module.scss'
import type React from 'react'
import MetaData from '../MetaData'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <MetaData />
      <div className={css.layout}>
        <div className={css.body}>
          { children }
        </div>
        <div className={css.footer}>
          2025 © 69doll, Inc. All rights reserved.
        </div>
      </div>
    </>
  )
}

export default Layout
