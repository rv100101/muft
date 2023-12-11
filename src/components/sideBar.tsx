import logo from "@/assets/logo.svg";
import links from "@/lib/sideBar";
import { LogOutIcon } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import useHomepageViewStore from "@/zustand/home/homepageView";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { scrollToTop } from "@/lib/utils";
import useConversationHistoryStore from "@/zustand/messaging/showConversation";

const SideBar = () => {
  const reset = useConversationHistoryStore(
    (state) => state.resetToNull,
  );
  const signOut = useUserStore((state) => state.reset);
  const setSelectedProfileId = useHomepageViewStore(
    (state) => state.setSelectedProfileId,
  );
  const [location] = useLocation();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const navLinks = links.map((link, index) => {
    return (
      <li key={index} className="w-full">
        <Link
          className={cn(
            "h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2",
            location.startsWith("/profile") && link.path.startsWith("/profile")
              ? "font-semibold bg-accent"
              : location.endsWith(link.path)
              ? "font-semibold bg-accent"
              : "font-normal",
          )}
          href={link.name == "My Profile"
            ? `/profile/${user!.member_id}`
            : link.path}
          onClick={() => {
            if (link.name == "My Profile") {
              setSelectedProfileId(null);
              queryClient.invalidateQueries({ queryKey: ["profileHeader"] });
            }
            if (link.name === 'Messages') {
              setSelectedProfileId(null);
              reset();
            }
          }}
        >
          {
            <link.icon
              fill={location.startsWith("/profile") &&
                  link.path.startsWith("/profile")
                ? "black"
                : location.endsWith(link.path)
                ? "black"
                : "white"}
              stroke={link.name == "Home" && location.endsWith(link.path)
                ? "white"
                : "black"}
              strokeWidth={location.endsWith(link.path) ? 0.8 : 2}
              size={20}
            />
          }
          <p className="text-sm">{link.name}</p>
        </Link>
      </li>
    );
  });

  return (
    <div className="h-full border-r sm:flex sm:flex-col justify-between hidden">
      <div className="flex flex-col w-[220px]">
        <Link href="/">
          <img
            className="hover:cursor-pointer w-1/2 my-8 mx-4"
            src={logo}
            alt="logo"
          />
        </Link>
        <ul>{navLinks}</ul>
      </div>

      <div className="flex flex-col space-y-4 px-4">
        <Link onClick={scrollToTop} href="/privacy-policy">
          <a className="hover:text-slate-700 text-xs text-black">
            Privacy Policy
          </a>
        </Link>
        <Link onClick={scrollToTop} href="/terms">
          <a className="hover:text-slate-700 text-xs text-black">
            Terms of Service
          </a>
        </Link>
        <Link onClick={scrollToTop} href="/release-notes">
          <a className="hover:text-slate-700 text-xs text-black">
            Release Notes
          </a>
        </Link>
        <hr />
        <Dialog>
          <DialogTrigger>
            <div className="flex space-x-2 my-4">
              {<LogOutIcon size={20} className="text-primary" />} <p className="text-sm">Sign out</p>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md opacity-100">
            <DialogHeader>
              <DialogTitle>Are you sure you want to sign out?</DialogTitle>
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
      </div>
    </div>
  );
};

export default SideBar;
