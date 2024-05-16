
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const ChangePasswordAlert = ({ open, setShowAlertDialog, isLoading, onSubmit, onCancel }: {
  open: boolean,
  isLoading: boolean,
  setShowAlertDialog: Dispatch<SetStateAction<boolean>>,
  onSubmit: () => void,
  onCancel: () => void
}) => {

  return <Dialog
    open={open} onOpenChange={(value) => {
      setShowAlertDialog(value);
    }}
  >
    <DialogContent
      onInteractOutside={(e) => {
        e.preventDefault();
      }}
    >
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <div className='flex flex-col space-y-2 sm:flex-row sm:justify-end w-full sm:space-x-2 sm:space-y-0 h-full'>
          <Button disabled={isLoading} variant={"outline"} className="border-primary border rounded-full sm:w-24" onClick={() => {
            setShowAlertDialog(false);
            onCancel();
          }}>Cancel</Button>
          <Button disabled={isLoading} onClick={() => {
            onSubmit();
          }}
            className={cn(
              "text-white h-10 text-sm rounded-full py-2 hover:bg-[#FF599B]/90 sm:w-24 dark:bg-[#ae2e51]",
              isLoading ? "bg-[#FF8AB3]" : "bg-primary"
            )}
          >Yes
            {isLoading && (
              <span>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </span>
            )}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>;

}

export default ChangePasswordAlert;
