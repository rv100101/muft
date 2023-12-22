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
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return (
    <>
      <ProfileMobileNav />
      <div className="flex flex-row w-full justify-between lg:p-5 py-2 border-b">
        <div className="flex justify-center w-full space-x-5 ">
          <div className="flex justify-between items-center h-min w-full">
            <div className="items-center justify-start w-full flex">
              {!user?.profile_completed && (
                <div className="flex sm:hidden ml-6">
                  <Dialog>
                    <DialogTrigger >
                      {<LogOutIcon size={20} className="text-primary" />}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md opacity-100">
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to sign out?
                        </DialogTitle>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <Button className="hover:bg-primary" onClick={() => {
                          signOut()
                          queryClient.invalidateQueries();
                        }}>
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
                </div>
              )}
              <div className="ml-4 sm:ml-0 flex items-center space-x-4">
                <p className="font-semibold mt-1 text-nowrap text-sm sm:text-base">
                  {user?.profile_completed ? "PROFILE" : "COMPLETE YOUR PROFILE"}
                </p>
                {!user?.profile_completed && (
                  <div className="hidden sm:flex w-full sm:w-min justify-end">
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
            </div>
            {!user?.profile_completed && (
              <Dialog>
                <DialogTrigger className="w-36 hidden sm:flex m">
                  <div className="hidden sm:flex space-x-2 my-4">
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
                    <Button className="hover:bg-primary" onClick={() => {
                      signOut()
                      queryClient.invalidateQueries();
                    }}>
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
            )} {!user?.profile_completed && (
              <div className="flex sm:hidden w-full mr-4 sm:w-min justify-end">
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
        </div>
      </div>
    </>
  );
};

export default ProfileTopNav;
