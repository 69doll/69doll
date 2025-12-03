import { castArray } from "es-toolkit/compat";
import { lazy, Suspense } from "react";
import { Doll69If } from "shared";
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
const MinusCircle = lazy(() => import('@/components/Icon/MinusCircle'))
const PlusCircle = lazy(() => import('@/components/Icon/PlusCircle'))

export const ActionInputActions = {
  Clear: (onClick: ActionInputAction['onClick']): ActionInputAction => ({ icon: <Clear />, onClick }),
  Eye: (onClick: ActionInputAction['onClick']): ActionInputAction => ({ icon: <Eye />, onClick }),
  EyeClosed: (onClick: ActionInputAction['onClick']): ActionInputAction => ({ icon: <EyeClosed />, onClick }),
  Minus: (onClick: ActionInputAction['onClick']): ActionInputAction => ({ icon: <MinusCircle />, onClick }),
  Plus: (onClick: ActionInputAction['onClick']): ActionInputAction => ({ icon: <PlusCircle />, onClick }),
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
      <Doll69If display={!(inputProps.disabled ?? false)}>
        <InputGroupAddon align='inline-end'>
          {
            castArray(actions).map((actionObj, index) => {
              return <Suspense key={`action-${index}`}>
                <InputGroupButton
                  variant='ghost'
                  size='icon-xs'
                  onClick={() => actionObj.onClick()}
                >
                  {actionObj.icon}
                </InputGroupButton>
              </Suspense>
            })
          }
        </InputGroupAddon>
      </Doll69If>
    </InputGroup>
  </>
}

export default ActionInput
