import { useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";

const useRefreshCurrentUser = () => {
  const { refresh } = useContext(CurrentUserContext)
  return () => refresh()
}

export default useRefreshCurrentUser
