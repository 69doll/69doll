import { useEffect, useMemo, useState } from "react";
import useList from "./useList";

type StateValidator<T> = (value: T) => string | undefined

interface UseFormItemStateOptions<T> {
  validators: StateValidator<T>[],
}

export default function useFormItemState<ST>(initialState: ST, options?: UseFormItemStateOptions<ST>) {
  const { validators = [] } = options ?? {}
  const [state, setState] = useState<ST>(initialState)
  const [errors, { init, push }] = useList<{ message: string }>()
  const isInvalid = useMemo(() => errors.length > 0, [errors])
  const appendError = (message: string) => {
    push({ message: message })
  }
  const validate = () => {
    init([])
    for (const validator of validators) {
      const result = validator(state)
      if (result) {
        appendError(result)
        return false
      }
    }
    return true
  }
  useEffect(() => {
    errors.length && init([])
  }, [state])
  return [state, setState, { errors, validate, appendError, isInvalid }] as const
}
