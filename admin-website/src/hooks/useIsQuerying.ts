import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import { useMemo } from "react"

export default function useIsQuerying (
  { filters, checkFetch = true, checkMutate = true }: { filters?: string[], checkFetch?: boolean, checkMutate?: boolean } = {}
) {
  const fetchingCount = useIsFetching({ queryKey: filters })
  const mutatingCount = useIsMutating({ mutationKey: filters })
  const isQuerying = useMemo(() => {
    const results: boolean[] = []
    if (checkFetch) results.push(fetchingCount > 0)
    if (checkMutate) results.push(mutatingCount > 0)
    return results.some((result) => result)
  }, [fetchingCount, mutatingCount])
  return isQuerying
}
