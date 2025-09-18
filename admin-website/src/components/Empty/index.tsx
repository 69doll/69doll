import type React from "react";

interface EmptyProps {
  hint?: string,
}

const Empty: React.FC<React.PropsWithChildren<EmptyProps>> = ({ children, hint }) => {
  return <>
    <div>
      <div>{ children }</div>
      <div>{ hint }</div>
    </div>
  </>
}

export default Empty
