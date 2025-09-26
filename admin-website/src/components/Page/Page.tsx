import type React from "react"
import css from './Page.module.scss'
import { Doll69If } from "shared"
import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"

export interface PageProps {
  label: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
}

const Page: React.FC<React.PropsWithChildren<PageProps>> = ({ children, label, header, footer }) => {
  return <div className={css.page}>
    <div className={css.header}>
      <div className={css.headerContent}>
        <SidebarTrigger className="shrink-0 grow-0" />
        <div className="shrink-0 grow-0 min-w-[120px] text-center" >
          <h2>{label}</h2>
        </div>
        <Doll69If display={!!header}>
          {header}
        </Doll69If>
      </div>
      <Separator />
    </div>
    <div className={css.body}>{children}</div>
    <Doll69If display={!!footer}>
      <div className={css.footer}>
        <Separator />
        {footer}
      </div>
    </Doll69If>
  </div>
}

export default Page
