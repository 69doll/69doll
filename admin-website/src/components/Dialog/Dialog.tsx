import {
  Dialog as DialogWrapper,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DialogProps {
  onOpenChange?: React.ComponentProps<typeof DialogWrapper>['onOpenChange'],
  title: React.ReactNode | string,
  description?: React.ReactNode | string,
  className?: string,
  showCloseButton?: React.ComponentProps<typeof DialogContent>['showCloseButton'],
  footer?: React.ReactNode | string,
}

const Dialog: React.FC<React.PropsWithChildren<DialogProps>> = ({
  onOpenChange,
  title,
  description,
  className,
  showCloseButton,
  children,
  footer,
}) => {
  return <>
    <DialogWrapper open={true} onOpenChange={onOpenChange}>
      <DialogContent className={className} showCloseButton={showCloseButton}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {
            description ? <>
              <DialogDescription>{description}</DialogDescription>
            </> : undefined
          }
        </DialogHeader>
        { children }
        {
          footer ? <>
            <DialogFooter>{footer}</DialogFooter>
          </> : undefined
        }
      </DialogContent>
    </DialogWrapper>
  </>
}

export default Dialog
