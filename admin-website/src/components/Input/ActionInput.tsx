import { castArray } from "es-toolkit/compat";
import { lazy } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export interface ActionInputAction {
  icon: React.ReactNode,
  onClick: () => any,
}

const Clear = lazy(() => import('@/components/Icon/Clear'))
const Eye = lazy(() => import('@/components/Icon/Eye'))
const EyeClosed = lazy(() => import('@/components/Icon/EyeClosed'))

export const ActionInputActions = {
  Clear: (onClick: ActionInputAction['onClick']): ActionInputAction => ({ icon: <Clear />, onClick }),
  Eye: (onClick: ActionInputAction['onClick']): ActionInputAction => ({ icon: <Eye />, onClick }),
  EyeClosed: (onClick: ActionInputAction['onClick']): ActionInputAction => ({ icon: <EyeClosed />, onClick }),
} as const

type ActionInputProps = React.ComponentProps<"input"> & {
  actions: ActionInputAction | ActionInputAction[],
}

const ActionInput = (props: ActionInputProps) => {
  const {
    actions,
    ...inputProps
  } = props
  return <>
    <InputGroup>
      <InputGroupInput {...inputProps} />
      <InputGroupAddon align='inline-end'>
        {
          castArray(actions).map((actionObj) => {
            return <InputGroupButton
              variant='ghost'
              size='icon-xs'
              onClick={() => actionObj.onClick()}
            >
              {actionObj.icon}
            </InputGroupButton>
          })
        }
      </InputGroupAddon>
    </InputGroup>
  </>
}

export default ActionInput
