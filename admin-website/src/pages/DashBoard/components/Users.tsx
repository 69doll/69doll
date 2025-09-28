import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { Doll69If } from "shared";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserList, getUserListCacheKeys } from "@/request/user";
import { hasAuthorization } from "@/store/authorization";

const Users: React.FC = () => {
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: getUserListCacheKeys({ pageNum: 1 }),
    queryFn: () => getUserList({ pageNum: 1 }),
    enabled: hasAuthorization(),
  })
  return <Card>
    <CardHeader>
      <span className="font-bold">用户总览</span>
      <Separator />
    </CardHeader>
    <CardContent>
      <div className="text-center flex flex-col items-center">
        <Doll69If display={isFetching}>
          <Skeleton className="h-[30px] w-[50px]" />
        </Doll69If>
        <Doll69If display={!isFetching && isSuccess}>
          <div className="h-[30px] leading-[30px] text-[30px]">
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
