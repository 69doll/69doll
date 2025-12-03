import type React from "react";
import { useMemo, Suspense } from "react";
import { cn } from "@/lib/utils";

interface ModuleLoadingProps {
  className?: string,
  fullScreen?: boolean,
  hint?: React.ReactNode | string,
}

const ModuleLoading: React.FC<React.PropsWithChildren<ModuleLoadingProps>> = ({
  className,
  fullScreen = false,
  hint = '正在加载中...',
  children,
}) => {
  const fallbackComp = useMemo(() => {
    return <>
      <div className={cn("size-full flex justify-center items-center", { 'bg-black/50 text-white pointer-events-auto z-9999 absolute top-0 left-0 h-dvh': fullScreen }, className)}>
        {hint}
      </div>
    </>
  }, [className, hint])
  return <Suspense fallback={fallbackComp}>
    {children}
  </Suspense>
}

export default ModuleLoading
