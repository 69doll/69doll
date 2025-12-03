import type React from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useMemo } from "react";
import type { ID } from "@/types/bean";
import { Skeleton } from "@/components/ui/skeleton";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useAllCategories } from "@/hooks/request/category";

const CategoryName: React.FC<{ id: ID }> = ({ id }) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  })
  const { data: res, isFetching, isFetched, refetch } = useAllCategories(undefined, {
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const list = useMemo(() => res?.data ?? [], [res])
  const currentCategory = useMemo(() => list.find(item => item.id === id), [list, id])
  const dependencies = useMemo(() => {
    if (!currentCategory) return ''
    return currentCategory.path.split(',').concat([id.toString()]).map((id) => list.find(item => item.id.toString() === id)?.name).filter(Boolean).join(' > ')
  }, [currentCategory])
  useEffect(() => {
    if (!entry?.isIntersecting) return
    if (!isFetched) refetch()
  }, [entry?.isIntersecting])
  return <>
    <span ref={ref}>
      {
        isFetching ? <Skeleton className="h-[30px] w-[50px]" /> : <HoverCard>
          <HoverCardTrigger>{currentCategory?.name}</HoverCardTrigger>
          {
            dependencies ?
            <HoverCardContent>
              <div className="text-xs text-center">{dependencies}</div>
            </HoverCardContent> : undefined
          }
        </HoverCard>
      }
    </span>
  </>
}

export default CategoryName
