import { useWindowSize } from "@uidotdev/usehooks"
import { useMemo } from "react"

export default function useCardCount () {
  const { width: windowWidth } = useWindowSize()
  const countCard = useMemo(() => {
    if (!windowWidth) return 5
    if (windowWidth < 640) {
      return 2
    } else if (windowWidth < 768) {
      return 3
    } else if (windowWidth < 1024) {
      return 4
    }
    return 5
  }, [windowWidth])
  return countCard
}
