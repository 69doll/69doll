import { useWindowSize } from "@uidotdev/usehooks"
import { useMemo } from "react"

type CardCountOptions = [number, number, number, number, number, number]

/**
 * @param {CardCountOptions} opts [<640(default), <768, <1024, < 1280, <1546, other]
 */
export default function useCardCount (opts: CardCountOptions) {
  const { width: windowWidth } = useWindowSize()
  const countCard = useMemo(() => {
    if (!windowWidth) return opts[0]
    if (windowWidth < 640) {
      return opts[0]
    } else if (windowWidth < 768) {
      return opts[1]
    } else if (windowWidth < 1024) {
      return opts[2]
    } else if (windowWidth < 1280) {
      return opts[3]
    } else if (windowWidth < 1536) {
      return opts[4]
    }
    return opts[5]
  }, [windowWidth])
  return countCard
}
