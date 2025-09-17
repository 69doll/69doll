import React, { createContext, useContext, useState } from "react"

export const SIDER_TYPE = {
  NONE: 'NONE',
  SIDER_MENU: 'SIDER_MENU',
  CART: 'CART',
} as const

type SIDER_TYPE = typeof SIDER_TYPE[keyof typeof SIDER_TYPE]

const Context = createContext<ReturnType<typeof useState<SIDER_TYPE>>>(undefined as any)

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(SIDER_TYPE.NONE)
  return <Context.Provider value={[state, setState as any]}>
    { children }
  </Context.Provider>
}

export const useSiderType = () => {
  const [SiderType] = useContext(Context)
  return SiderType
}

export const useIsDisplaySider = () => {
  const [SiderType] = useContext(Context)
  return SiderType !== SIDER_TYPE.NONE
}

export const useOpenSider = (type: SIDER_TYPE = SIDER_TYPE.SIDER_MENU) => {
  const [_, setSiderComponent] = useContext(Context)
  return () => setSiderComponent(type)
}

export const useCloseSider = () => {
  const [_, setSiderComponent] = useContext(Context)
  return () => setSiderComponent(SIDER_TYPE.NONE)
}
