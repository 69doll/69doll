import { useMemo } from "react";
import { Input } from "@/components/ui/input";

const AmountInput = (props: React.ComponentProps<"input">) => {
  const { value, defaultValue } = props
  const amount = useMemo(() => {
    const currentValue = value ?? defaultValue
    if (typeof currentValue === 'number') return Number((currentValue).toFixed(0))
    if (typeof currentValue === 'string' && /^-?[0-9]+$/.test(currentValue.trim())) return Number(currentValue)
    return NaN
  }, [value, defaultValue ])
  return <>
    <div>
      <Input {...props} />
      <span>{(amount / 100).toFixed(2)}</span>
    </div>
  </>
}

export default AmountInput
