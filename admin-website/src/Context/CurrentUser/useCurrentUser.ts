import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CurrentUserContext from "./CurrentUserContext"
import useRefreshCurrentUser from "./useRefreshCurrentUser"
import { hasAuthorization } from "@/store/authorization"

const useCurrentUser = () => {
  const nav = useNavigate()
  const { user: currentUser } = useContext(CurrentUserContext)
  const refreshCurrentUser = useRefreshCurrentUser()
  useEffect(() => {
    if (!hasAuthorization()) {
      nav('/signin')
      return
    }
    if (!currentUser) {
      refreshCurrentUser()
    }
  }, [])
  return currentUser
}

export default useCurrentUser
