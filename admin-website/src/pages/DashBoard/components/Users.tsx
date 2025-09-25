import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserList, getUserListCacheKeys } from "@/request/user";
import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { Doll69If } from "shared";
import { useIntersectionObserver } from "@uidotdev/usehooks"
import { useEffect } from "react";

const Users: React.FC = () => {
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: getUserListCacheKeys({ pageNum: 1 }),
    queryFn: () => getUserList({ pageNum: 1 }),
  })
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  useEffect(() => {
    if (!isSuccess) return
    if (!entry?.isIntersecting) return
    refetch()
  }, [entry?.isIntersecting])
  return <Card ref={ref}>
    <CardHeader>
      用户总览
      <Separator />
    </CardHeader>
    <CardContent>
      <div className="text-center flex flex-col items-center">
        <Doll69If display={isLoading}>
          <Skeleton className="h-[25px] w-[50px]" />
        </Doll69If>
        <Doll69If display={isSuccess}>
          <div className="h-[25px]">
            { data?.data.total }
          </div>
        </Doll69If>
        <div>
          用户总数
        </div>
      </div>
    </CardContent>
  </Card>
}

export default Users
