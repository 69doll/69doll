import { useMemo } from "react"
import { LogOut } from "lucide-react"
import { redirect } from "react-router-dom"
import { Doll69If } from "shared"
import useCurrentUser from "@/Context/CurrentUser/useCurrentUser"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { setAuthorization } from "@/store/authorization"

export default function SidebarFooterContent() {
  const currentUser = useCurrentUser()
  const nickname = useMemo(() => {
    return currentUser?.nickname
  }, [currentUser])
  const email = useMemo(() => {
    return currentUser?.email
  }, [currentUser])
  const signOut = () => {
    setAuthorization()
    redirect('/signin')
  }
  return <>
    <Doll69If display={!!currentUser}>
      <Item>
        <ItemContent>
          <ItemTitle>{nickname}</ItemTitle>
          <ItemDescription>{email}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={signOut}
          >
            <LogOut />
          </Button>
        </ItemActions>
      </Item>
    </Doll69If>
  </>
}
