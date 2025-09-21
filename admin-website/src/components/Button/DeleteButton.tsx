import type React from "react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useState } from "react"

type DeleteButtonProps = Parameters<typeof Button>[0] & {
  hint?: string,
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, hint, ...props }) => {
  const [open, setOpen] = useState(false)
  const onDeleteClick = (e: React.MouseEvent) => {
    setOpen(false)
    onClick?.(e as any)
  }
  return <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size='icon'
          variant="outline"
          children="删除"
          {...props}
        />
      </PopoverTrigger>
      <PopoverContent>
        { hint ?? '你确定要删除吗？此操作不可恢复!!!' }
        <Button
          variant="outline"
          className="w-full"
          children="确认删除"
          onClick={onDeleteClick}
        />
      </PopoverContent>
    </Popover>
  </>
}

export default DeleteButton
