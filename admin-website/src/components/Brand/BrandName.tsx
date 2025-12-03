import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { lazy, Suspense , useEffect, useMemo } from "react";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import type { ID } from "@/types/bean";
import { getBrandAllList, getBrandAllListCacheKeys } from "@/request/brand";
import { Skeleton } from "@/components/ui/skeleton";

const Image = lazy(() => import("../Image/Image"))

const BrandName: React.FC<{ id: ID }> = ({ id }) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  })
  const { data: list = [], isFetching, isFetched, refetch } = useQuery({
    queryKey: getBrandAllListCacheKeys(),
    queryFn: () => getBrandAllList(),
    enabled: false,
    select: (res) => res.data,
    gcTime: 30 * 1000, // 30 seconds
    staleTime: 5 * 60 * 1000, // 5min
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const data = useMemo(() => list.find(item => item.id === id), [list, id])
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
            data?.logo ? <HoverCardContent>
              <Suspense fallback={<Skeleton className="size-[130px]" />}>
                <Image resize={{ width: 130 }} src={data?.logo} />
              </Suspense>
            </HoverCardContent> :
            undefined
          }
        </HoverCard>
      }
    </span>
  </>
}

export default BrandName
