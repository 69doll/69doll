import type React from "react"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../../components/ui/sheet"
import { Button } from "../ui/button"

interface SideSheetProps {
  open: boolean,
  title: React.ReactNode,
  description?: React.ReactNode,
  actionLabel?: string,
  cancelLabel?: string,
  onAction?: () => any,
  onCancel?: () => any,
}

const SideSheet: React.FC<React.PropsWithChildren<SideSheetProps>> = ({
  open,
  title,
  description,
  actionLabel,
  cancelLabel,
  onAction,
  onCancel,
  children,
}) => {
  return <>
    <Sheet open={open}>
      <SheetContent headerClose={false}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <Button type="submit" variant="outline" onClick={() => onAction?.()}>{actionLabel}</Button>
          <Button variant="outline" onClick={() => onCancel?.()}>{cancelLabel ?? '关闭'}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </>
}

export default SideSheet
