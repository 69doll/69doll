import { useState } from "react";
import { cloneDeep, set as setTool } from 'es-toolkit/compat'

export default function useList<O>(initialList: O[] = []) {
  const [list, setList] = useState(initialList)

  function moveUp (index: number) {
    const clonedList = cloneDeep(list)
    const items = clonedList.splice(index, 1)
    clonedList.splice(index - 1, 0, ...items)
    setList(clonedList)
  }
  function moveDown (index: number) {
    const clonedList = cloneDeep(list)
    const items = clonedList.splice(index, 1)
    clonedList.splice(index + 1, 0, ...items)
    setList(clonedList)
  }
  function removeAt (index: number) {
    const clonedList = cloneDeep(list)
    clonedList.splice(index, 1)
    setList(clonedList)
  }
  function unshift (...items: O[]) {
    const clonedList = cloneDeep(list)
    clonedList.unshift(...items)
    setList(clonedList)
  }
  function push (...items: O[]) {
    const clonedList = cloneDeep(list)
    clonedList.push(...items)
    setList(clonedList)
  }
  function setAtByKey (index: number, key: string, value: any) {
    if (typeof list[index] === 'object') {
      const clonedList = cloneDeep(list)
      setTool(clonedList[index] as any, key, value)
      setList(clonedList)
    }
  }
  function setAt (index: number, value: Partial<O>) {
    const clonedList = cloneDeep(list)
    setTool(clonedList, index, value)
    setList(clonedList)
  }

  return [
    list,
    {
      init: setList,
      moveUp,
      moveDown,
      setAt,
      setAtByKey,
      removeAt,
      unshift,
      push,
    },
  ] as const
}
