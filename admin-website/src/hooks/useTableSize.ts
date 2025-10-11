import { useMemo, useState } from "react"

export default function useTableSize (defaultValue?: number) {
  const [size, setSize] = useState<number>(defaultValue ?? 15)
  const setRealSize = useMemo(() => (num: number) => {
    if (!num || num <= 0 || Math.abs(num) !== num) {
      return setSize(defaultValue ?? 15)
    }
    return setSize(num)
  }, [])
  return [
    size,
    setRealSize as ReturnType<typeof useState<number>>[1],
  ] as const
}
