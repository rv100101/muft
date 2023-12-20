import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axiosQuery from "@/queries/axios";
import { useUserStore } from "@/zustand/auth/user";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import profileHeaderStore from "@/zustand/profile/profileHeaderStore";
import { CheckedState } from "@radix-ui/react-checkbox";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

const DeactivateAccountContent = () => {
  const signOut = useUserStore((state) => state.reset);
  const { setProfileData } = profileAboutContentStore();
  const { setProfileHeaderValues } = profileHeaderStore();
  const { user } = useUserStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [checked, setChecked] = useState<CheckedState>(false);
  const [deactivateLoading, setDeactivateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deactivateAccount = async () => {
    try {
      setDeactivateLoading(true);
      const res = await axiosQuery.post("/DeactivateAccount", {
        member: user!.member_id,
      });
      if (res.data) {
        toast({
          title: "Account has been deactivated",
          description: "Changes might take awhile to take effect.",
          // variant: "success",
        });
        setDeactivateLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    try {
      console.log("this is triggered");
      setDeleteLoading(true);
      // const res = await axiosQuery.post("/DeleteAccount", {
      //   member: user!.member_id,
      // });
      // if (res.data) {
      toast({
        title: "Account has been deleted, Bye!",
        description: "Changes might take awhile to take effect.",
        // variant: "success",
      });
      setDeleteLoading(false);
      signOut();
      setProfileData(null);
      setProfileHeaderValues(null);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setChecked(false);
  }, []);
  return (
    <div className="flex flex-col  w-full justify-center text-[#727272] space-y-2 px-5 py-5">
      <p className="font-semibold pb-1">Deactivate Account</p>
      {/* <p className="font-medium">Deactivate</p> */}
      <Dialog>
        <div className="flex flex-row w-full justify-between">
          <p>Deactivate</p>
          <DialogTrigger asChild>
            <Button
              className={cn(
                "text-white mt-4 h-10 w-full text-sm rounded-lf py-2 hover:bg-[#FF599B]/90 mt-5 w-24"
              )}
            >
              Deactivate
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="flex flex-row justify-between items-start  pb-5">
                <DialogTitle className="font-medium">
                  Deactivate profile
                </DialogTitle>
                <DialogClose>
                  <X className="hover:cursor-pointer" size={20} />
                </DialogClose>
              </div>
              <DialogDescription className="pb-5">
                By choosing 'Deactivate your account', you'll temporarily make
                your profile invisible to other users on Muffin. While your
                account is deactivated, your profile, photos, and messages will
                be hidden, and you will not appear in any search results. But
                don't worry, your account information isn't going anywhere.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                // checked={checked}
                onCheckedChange={(state) => setChecked(state)}
              />
              <label
                htmlFor="terms"
                className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I am sure I want to proceed
              </label>
            </div>
            <div className="flex flex-row justify-center">
              <div className="flex flex-row space-x-4">
                <Button
                  disabled={(!checked as boolean) || deleteLoading}
                  className={cn(
                    "text-white mt-4 h-10 bg-orange-400 w-full text-sm rounded-lf py-2 hover:bg-orange-400/90 mt-5 w-24"
                  )}
                  onClick={() => deactivateAccount()}
                >
                  {deactivateLoading ? (
                    <Loader2 className="ml-2 h-full w-full animate-spin" />
                  ) : (
                    "Deactivate"
                  )}
                </Button>
                <Button
                  disabled={(!checked as boolean) || deactivateLoading}
                  className={cn(
                    "text-white mt-4 bg-red-500 h-10 w-full text-sm rounded-lf py-2 hover:bg-red-500/90 mt-5 w-24"
                  )}
                  // onClick={() => deleteAccount}
                  onClick={() => setDeleteModal(true)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
      {/* delete modal */}
      <Dialog
        open={deleteModal}
        onOpenChange={(state) => {
          setDeleteModal(state);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> Important Notice</DialogTitle>
            <DialogDescription>
              Deleting your account will permanently remove your profile, photos
              and messages.
            </DialogDescription>
            <DialogDescription className="pt-5">
              This action cannot be undone later!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row space-x-4">
            <Button
              // disabled={(!checked as boolean) || deleteLoading}
              className={cn(
                "text-white mt-4 bg-red-500 h-10 w-3/4 text-sm rounded-lf py-3 hover:bg-red-500/90 mt-5 "
              )}
              onClick={() => deleteAccount()}
            >
              {deleteLoading ? (
                <Loader2 className="ml-2 h-full w-full animate-spin" />
              ) : (
                "Permanenently Delete"
              )}
            </Button>
            <DialogClose>
              <Button
                // disabled={(!checked as boolean) || deactivateLoading}
                className={cn(
                  "text-white mt-4 bg-slate-500 h-10 w-full text-sm rounded-lf py-3 hover:bg-slate-500/90 mt-5 "
                )}
                // onClick={() => deleteAccount}
              >
                No
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeactivateAccountContent;
