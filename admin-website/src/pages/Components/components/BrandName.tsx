import { Skeleton } from "@/components/ui/skeleton";
import type { ID } from "@/request/bean";
import { getBrandAllList, getBrandAllListCacheKeys } from "@/request/brand";
import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { Doll69If } from "shared";

const BrandName: React.FC<{ id: ID }> = ({ id }) => {
  const { data, isFetching } = useQuery({
    queryKey: getBrandAllListCacheKeys(),
    queryFn: () => getBrandAllList(),
  })
  return <>
    <Doll69If display={isFetching}>
      <Skeleton className="h-4 w-full" />
    </Doll69If>
    <Doll69If display={!isFetching}>
      { data?.data.find((item) => item.id === id)?.name ?? 'NON FOUND' }
    </Doll69If>
  </>
}

export default BrandName
