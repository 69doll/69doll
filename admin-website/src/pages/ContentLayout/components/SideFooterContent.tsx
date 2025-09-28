import { useMemo } from "react"
import { useCurrentUser } from "@/Context/CurrentUser"

export default function SidebarFooterContent() {
  const currentUser = useCurrentUser()
  const nickname = useMemo(() => {
    return currentUser?.nickname
  }, [currentUser])
  return <div>{nickname}</div>
}
