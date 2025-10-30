import { useMemo } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

const AmountInput = (props: React.ComponentProps<"input">) => {
  const { value, defaultValue } = props
  const amount = useMemo(() => {
    const currentValue = value ?? defaultValue
    if (typeof currentValue === 'number') return Number((currentValue).toFixed(0))
    if (typeof currentValue === 'string' && /^-?[0-9]+$/.test(currentValue.trim())) return Number(currentValue)
    return NaN
  }, [value, defaultValue ])
  return <>
    <InputGroup>
      <InputGroupInput {...props} />
      <InputGroupAddon align='block-end'>
        <InputGroupText className="text-muted-foreground text-xs">
          {(amount / 100).toFixed(2)}
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </>
}

export default AmountInput
