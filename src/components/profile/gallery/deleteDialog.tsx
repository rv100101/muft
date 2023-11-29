import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const DeleteDialog = (
  { open, setSelectedPictureIdNull, handleDelete, isDeleting }: {
    open: boolean;
    setSelectedPictureIdNull: () => void;
    handleDelete: () => void;
    isDeleting: boolean;
  },
) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (open) {
          setSelectedPictureIdNull();
        }
      }}
    >
      <DialogContent className="sm:max-w-md opacity-100">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this photo?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            disabled={isDeleting}
            className="hover:bg-primary"
            onClick={handleDelete}
          >
            Yes
          {isDeleting && <Loader2 className="ml-2 h-full w-full animate-spin" />}
          </Button>
          <Button
            onClick={setSelectedPictureIdNull}
            className="text-white hover:bg-secondary"
            type="button"
            variant="secondary"
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
