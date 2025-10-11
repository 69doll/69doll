import { useMemo, useState } from "react";

export default function useTableNum (defaultNum?: number) {
  const [num, setNum] = useState<number>(defaultNum ?? 1)
  const setRealNum = useMemo(() => (num: number) => {
    if (!num || num <= 0 || Math.abs(num) !== num) {
      return setNum(1)
    }
    return setNum(num)
  }, [])
  return [
    num,
    setRealNum as ReturnType<typeof useState<number>>[1],
  ] as const
}
