import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type User, getCurrentUser, getCurrentUserCacheKeys } from "@/request/user";

const Context = createContext<[User | undefined, React.Dispatch<React.SetStateAction<User>>]>(undefined!)

export const CurrentUserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(undefined!)
  return <Context.Provider
    value={[currentUser, setCurrentUser]}
  >{children}</Context.Provider>
}

export const useCurrentUser = () => {
  const nav = useNavigate()
  const [currentUser] = useContext(Context)
  const refreshCurrentUser = useRefreshCurrentUser()
  useEffect(() => {
    if (!sessionStorage.getItem('authorization')) nav('/signin')
    if (!currentUser) refreshCurrentUser()
  }, [])
  return currentUser
}

export const useRefreshCurrentUser = () => {
  const nav = useNavigate()
  const [currentUser, setCurrentUser] = useContext(Context)
  const { data, isSuccess, refetch, isFetched } = useQuery({
    queryKey: getCurrentUserCacheKeys(),
    queryFn: () => getCurrentUser(),
    enabled: !currentUser && !!sessionStorage.getItem('authorization'),
  })
  useEffect(() => {
    if (!isFetched) return
    if (isSuccess && data?.code === 200) {
      setCurrentUser(data?.data!)
      return
    }
    setCurrentUser(undefined!)
    nav('/signin')
  }, [isFetched])
  return () => refetch()
}
