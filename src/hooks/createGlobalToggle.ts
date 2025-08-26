import { createGlobalState } from "react-use";

export default function createGlobalToggle(defaultValue: boolean) {
  const hook = createGlobalState(defaultValue)
  return function () {
    const [state, setState] = hook()
    const toggle = () => setState(!state)
    return [state, setState, toggle] as const
  }
}
