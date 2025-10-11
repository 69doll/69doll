import type React from "react"
import { Button } from "../ui/button"
import DeletePopover from "../Popover/DeletePopover"

type DeleteButtonProps = Parameters<typeof Button>[0] & {
  hint?: string,
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, hint, ...props }) => {
  return <>
    <DeletePopover
      onClick={onClick}
      hint={hint}
    >
      <Button
        size='icon'
        variant="outline"
        children="删除"
        {...props}
      />
    </DeletePopover>
  </>
}

export default DeleteButton
