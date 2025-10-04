import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import CurrentUserContext from "./CurrentUserContext"
import { getCurrentUser, getCurrentUserCacheKeys, type User } from "@/request/user"
import { hasAuthorization } from "@/store/authorization"

const CurrentUserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data, refetch, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: getCurrentUserCacheKeys(),
    queryFn: () => getCurrentUser(),
    enabled: hasAuthorization(),
  })
  const [currentUser, setCurrentUser] = useState<User>(undefined!)
  useEffect(() => {
    if (!isSuccess) return
    if (data?.code === 200) {
      setCurrentUser(data?.data)
      return
    }
  }, [isSuccess, isFetching, isLoading])
  return <CurrentUserContext.Provider
    value={{ user: currentUser, refresh: refetch }}
  >{children}</CurrentUserContext.Provider>
}

export default CurrentUserProvider
