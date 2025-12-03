import { cloneDeep } from "es-toolkit/compat"
import { useEffect, useMemo, useRef, useState } from "react"

type Validator<O extends object, K extends keyof O> = (value: O[K]) => string | undefined
type validatorMap<O extends object> = Partial<{
  [K in keyof O]: Validator<O, K>[]
}>

type ErrorMap<O extends object> = Partial<Record<keyof O, { message: string }[]>>

export default function useErrors <O extends object>(originData: O, validatorMap: validatorMap<O>) {
  const prevDataRef = useRef<O>(originData)
  const [errorMap, setErrorMap] = useState<ErrorMap<O>>({})
  const isError = useMemo(() => !!Object.keys(errorMap).length, [errorMap])
  const clearErrors = () => setErrorMap({})
  const hasError = (key: keyof O) => isError && !!errorMap[key]
  const setError = (key: keyof O, message: string) => {
    setErrorMap(prev => ({
      ...prev,
      [key]: [{ message }],
    }))
  }
  const validate = () => {
    const newErrorMap: ErrorMap<O> = {}
    for (const key in validatorMap) {
      const validatorList = validatorMap[key] ?? []
      const errors = validatorList
        .map((fn) => fn(originData[key]))
        .filter((error) => typeof error === 'string')
        .map((error) => ({ message: error }))
      if (errors.length) {
        newErrorMap[key] = errors
        setErrorMap(newErrorMap)
      }
    }
    prevDataRef.current = originData
    return !Object.keys(newErrorMap).length
  }
  useEffect(() => {
    if (!isError) return
    const clonedErrorMap = cloneDeep(errorMap)
    for (const key in errorMap) {
      if (prevDataRef.current[key] !== originData[key]) {
        delete clonedErrorMap[key]
        setErrorMap(clonedErrorMap)
      }
    }
  }, [originData])
  return {
    validate,
    errorMap,
    isError,
    hasError,
    setError,
    clearErrors,
  }
}
