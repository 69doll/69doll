import type React from "react"

interface I69IfProps {
  display: boolean | string | number,
}

export const Doll69If: React.FC<React.PropsWithChildren<I69IfProps>> = ({ display, children }) => {
  return <>
    { display ? children : undefined}
  </>
}
