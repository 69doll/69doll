import React, { useMemo } from "react"
import { SIDER_TYPE, useSiderType } from "../../context/SiderDisplay"

const SiderMenu = React.lazy(() => import('../SiderMenu'))

export default function Sider () {
  const siderType = useSiderType()
  const siderComponent = useMemo(() => {
    switch (siderType) {
      case SIDER_TYPE.SIDER_MENU: return <SiderMenu />
      default: return undefined
    }
  }, [siderType])
  return <>
    {
      siderComponent
    }
  </>
}
