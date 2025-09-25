import { useCurrentUser } from "@/Context/CurrentUser"
import { useMemo } from "react"

export default function SidebarFooterContent() {
  const currentUser = useCurrentUser()
  const nickname = useMemo(() => {
    return currentUser?.nickname
  }, [currentUser])
  return <div>{nickname}</div>
}
