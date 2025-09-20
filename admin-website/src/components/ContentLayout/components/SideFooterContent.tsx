import { getCurrentUser, getCurrentUserCacheKeys } from "@/request/user"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"

export default function SidebarFooterContent() {
  const nav = useNavigate()
  const { user } = useLoaderData()
  const { data, isError, isFetched } = useQuery({
    queryKey: getCurrentUserCacheKeys(),
    queryFn: () => getCurrentUser(),
    select: (data) => data,
    enabled: !user,
  })
  useEffect(() => {
    if (isFetched && (isError || data?.code !== 200)) {
      nav('/signin')
    }
  }, [isFetched, isError, data])
  const nickname = useMemo(() => {
    return data?.data?.nickname ?? user?.nickname
  }, [user, data])
  return <div>{nickname}</div>
}
