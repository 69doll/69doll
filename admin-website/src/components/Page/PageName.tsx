import type React from "react";
import { Loader2Icon } from "lucide-react";
import { Doll69If } from "shared";
import { useMemo } from "react";
import css from './PageName.module.scss'

interface PageNameProps {
  name: string,
  isLoading?: boolean,
  onRefresh?: () => any,
}

const PageName: React.FC<PageNameProps> = ({ name, isLoading, onRefresh }) => {
  const hasLoadingParams = typeof isLoading === 'boolean'
  const onClick = useMemo(() => () => {
    if (!hasLoadingParams) return
    if (isLoading) return
    return onRefresh?.()
  }, [onRefresh])
  return <div className={css.pageName}>
    {name}
    <Doll69If display={hasLoadingParams && !isLoading && !!onRefresh}>
      <Loader2Icon className='w-[16px] cursor-pointer' onClick={onClick} />
    </Doll69If>
    <Doll69If display={hasLoadingParams && !!isLoading}>
      <Loader2Icon className='w-[16px] cursor-wait animate-spin' />
    </Doll69If>
  </div>
}

export default PageName
