import type React from "react"
import { useState } from "react"
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type DeletePopoverProps = {
  hint?: string,
  onClick: React.DOMAttributes<HTMLButtonElement>['onClick'];
}

const DeletePopover: React.FC<React.PropsWithChildren<DeletePopoverProps>> = ({
  onClick, hint, children,
}) => {
  const [open, setOpen] = useState(false)
  const onDeleteClick = (e: React.MouseEvent) => {
    setOpen(false)
    onClick?.(e as any)
  }
  return <>
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        { typeof children === 'string' ? <span>{children}</span> : children }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>你正在操作一项删除操作</AlertDialogTitle>
          <AlertDialogDescription>
            { hint ?? '你确定要删除吗？此操作不可恢复!!!' }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>再考虑考虑</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="outline"
              children="确认删除"
              onClick={onDeleteClick}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
}

export default DeletePopover
