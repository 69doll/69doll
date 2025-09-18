import type React from "react"

interface IBannerProps {
  display: boolean | string | number,
}

export const Doll69If: React.FC<React.PropsWithChildren<IBannerProps>> = ({ display, children }) => {
  return <>
    { display ? children : undefined}
  </>
}
