import type React from "react"

interface IBannerProps {
  display: boolean | string | number,
}

const Doll69If: React.FC<React.PropsWithChildren<IBannerProps>> = ({ display, children }) => {
  return <>
    { display ? children : undefined}
  </>
}

export default Doll69If
