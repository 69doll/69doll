import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import CurrentUserContext from "./CurrentUserContext"
import { getCurrentUser, getCurrentUserCacheKeys, type User } from "@/request/user"
import { hasAuthorization } from "@/store/authorization"
import { redirectSignInPage } from "@/request/common"

const CurrentUserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data, refetch, isFetched, isLoading, isFetching } = useQuery({
    queryKey: getCurrentUserCacheKeys(),
    queryFn: () => getCurrentUser(),
    enabled: hasAuthorization(),
    gcTime: 5 * 60 * 1000, // 5 min
  })
  const [currentUser, setCurrentUser] = useState<User>(undefined!)
  useEffect(() => {
    if (!isFetched) return
    if (data?.code === 200) {
      setCurrentUser(data?.data)
      return
    }
    if (data?.code === 401) {
      return redirectSignInPage()
    }
  }, [isFetched, isFetching, isLoading])
  return <CurrentUserContext.Provider
    value={{ user: currentUser, refresh: refetch }}
  >{children}</CurrentUserContext.Provider>
}

export default CurrentUserProvider
