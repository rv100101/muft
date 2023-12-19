// import useHomepageViewStore from "@/zustand/home/homepageView";
import { Loader2, LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
// import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { useUserStore } from "@/zustand/auth/user";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import ProfileMobileNav from "./ProfileMobileNav";
const ProfileTopNav = () => {
  const { isSaving } = profileAboutContentStore();

  const signOut = useUserStore((state) => state.reset);
  const user = useUserStore((state) => state.user);
  // const setSelectedHistoryMemberId = useLatestConversationStore(
  //   (state) => state.setSelectedHistoryMemberId
  // );
  // const setSelectedProfileId = useHomepageViewStore(
  //   (state) => state.setSelectedProfileId
  // );

  return (
    <>
      <ProfileMobileNav />
      <div className="flex flex-row w-full justify-between lg:p-5 py-2 lg:border-b">
        <div className="flex justify-center w-full space-x-5 ">
          {/* <Button
          type="button"
          variant={"ghost"}
          className="bg-transparent m-0 p-0 h-min"
          onClick={() => {
            window.history.go(-1);
            setSelectedHistoryMemberId(null);
            setSelectedProfileId(null);
          }}
        >
          {user?.profile_completed && (
            <ArrowLeft
              size={20}
              className="mt-1 hover:cursor-pointer hidden lg:flex"
            />
          )}
        </Button> */}
          <div className="flex justify-between items-center h-min w-full">
            <div className="flex space-x-4 items-center lg:flex hidden">
              <p className="font-semibold mt-1">
                {user?.profile_completed ? "PROFILE" : "COMPLETE YOUR PROFILE"}
              </p>
              {!user?.profile_completed && (
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="hover:bg-[#FF8AB3]/95"
                    disabled={isSaving}
                  >
                    Save
                    {isSaving && (
                      <span>
                        <Loader2 className="ml-2 h-6 w-6 animate-spin" />
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </div>
            {!user?.profile_completed && (
              <Dialog>
                <DialogTrigger>
                  <div className="flex space-x-2 my-4">
                    {<LogOutIcon size={20} className="text-primary" />}{" "}
                    <p className="text-sm">Sign out</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md opacity-100">
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to sign out?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start">
                    <Button className="hover:bg-primary" onClick={signOut}>
                      Yes
                    </Button>
                    <DialogClose asChild>
                      <Button
                        className="text-white hover:bg-secondary"
                        type="button"
                        variant="secondary"
                      >
                        No
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTopNav;
