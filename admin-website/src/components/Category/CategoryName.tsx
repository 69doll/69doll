import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useMemo } from "react";
import type { ID } from "@/types/bean";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoryAllList, getCategoryAllListCacheKeys } from "@/request/category";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const CategoryName: React.FC<{ id: ID }> = ({ id }) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  })
  const { data: list = [], isFetching, isFetched, refetch } = useQuery({
    queryKey: getCategoryAllListCacheKeys(),
    queryFn: () => getCategoryAllList(),
    enabled: false,
    select: (res) => res.data,
    gcTime: 30 * 1000, // 30 seconds
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const data = useMemo(() => list.find(item => item.id === id), [list, id])
  const dependencies = useMemo(() => {
    if (!data) return ''
    return data.path.split(',').concat([id.toString()]).map((id) => list.find(item => item.id.toString() === id)?.name).filter(Boolean).join(' > ')
  }, [data])
  useEffect(() => {
    if (!entry?.isIntersecting) return
    if (!isFetched) refetch()
  }, [entry?.isIntersecting])
  return <>
    <span ref={ref}>
      {
        isFetching ? <Skeleton className="h-[30px] w-[50px]" /> : <HoverCard>
          <HoverCardTrigger>{data?.name}</HoverCardTrigger>
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
