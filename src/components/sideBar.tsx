import logo from "@/assets/logo.svg";
import { LogOutIcon } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import useHomepageViewStore from "@/zustand/home/homepageView";
import { useQueryClient } from "@tanstack/react-query";
import {
  HeartIcon,
  HomeIcon,
  MessageSquareIcon,
  Settings,
  Star,
  UserIcon,
} from "lucide-react";
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
import useConversationHistoryStore from "@/zustand/messaging/showConversation";
import profileAboutContentStore from "@/zustand/profile/profileAboutStore";
import profileHeaderStore from "@/zustand/profile/profileHeaderStore";
// import useReadConversationsStateStore from "@/zustand/messaging/readConversations";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/zustand/settings/displaySettingsStore";
import OneSignal from "react-onesignal";
import { SideBarLinks } from "@/types/sideBar";

const SideBar = () => {
  const setMemberList = useHomepageViewStore(
    (state) => state.setModifiedMemberList
  );
  const [t, i18n] = useTranslation();
  const isDark = useSettingsStore(
    (state) => state.settings?.darkModeSwitch
  );
  // const { updateRead: setReadList } = useReadConversationsStateStore();
  const reset = useConversationHistoryStore((state) => state.resetToNull);
  const signOut = useUserStore((state) => state.reset);
  const { setProfileData } = profileAboutContentStore();
  const { setProfileHeaderValues } = profileHeaderStore();
  const setSelectedProfileId = useHomepageViewStore(
    (state) => state.setSelectedProfileId
  );
  const [location] = useLocation();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const updatedLinks: SideBarLinks = [
    {
      name: t("menu.home"),
      path: "/",
      icon: HomeIcon,
    },
    {
      path: "/messages",
      icon: MessageSquareIcon,
      name: t("menu.messages"),
    },
    {
      path: user?.member_id ? `/profile/${user!.member_id}` : "",
      icon: UserIcon,
      name: t("menu.myProfile"),
    },
    {
      path: "/likes",
      icon: HeartIcon,
      name: t("menu.likes"),
    },
    {
      path: "/favorites",
      icon: Star,
      name: t("menu.favorites"),
    },
    {
      path: "/settings",
      icon: Settings,
      name: t("menu.settings"),
    },
  ];
  const navLinks = updatedLinks.map((link, index) => {
    return (
      <li key={index} className={cn("w-full")}>
        <Link
          className={cn(
            "h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center",
            location.endsWith(link.path)
              ? "font-semibold bg-accent"
              : "font-normal",
            i18n.language == "ar" ? "space-x-reverse space-x-2" : "space-x-2"
          )}
          to={link.path}
          onClick={() => {
            if (link.name == "My Profile") {
              setSelectedProfileId(null);
              queryClient.invalidateQueries({ queryKey: ["profileHeader"] });
            }
            if (link.name === "Messages") {
              setSelectedProfileId(null);
              reset();
            }
          }}
        >
          {
            <link.icon
              fill={location.endsWith(link.path) ? isDark ? "white" : "black" : "white"}
              stroke={
                link.name == "Home" && location.endsWith(link.path)
                  ? isDark ? "black" : "white"
                  : "black"
              }
              strokeWidth={location.endsWith(link.path) ? 0.8 : 2}
              size={20}
            />
          }
          <p className={cn("text-sm")}>{link.name}</p>
        </Link>
      </li>
    );
  });

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className={cn(
        "h-screen overflow-y-auto overflow-x-hidden no-scrollbar lg:flex sm:flex-col justify-between hidden",
        i18n.language == "ar" ? "border-l" : "boder-r"
      )}
    >
      <div
        className={"h-full flex flex-col justify-between"}
      >
        <div className="flex flex-col w-[220px]">
          <Link to="/">
            <img
              className="hover:cursor-pointer w-1/2 my-8 mx-4"
              src={logo}
              alt="logo"
            />
          </Link>
          <ul>{navLinks}</ul>
        </div>

        <div className={cn("flex flex-col space-y-4 px-4")}>
          <a
            className="hover:text-slate-700 text-xs text-black dark:text-white"
            href="https://support.muffin.ae"
            target="_blank"
          >
            {t("menu.helpCenter")}
          </a>
          <a target="_blank" href="https://support.muffin.ae/en-US/kb/article/12/privacy-policy" className="hover:text-slate-700 text-xs text-black dark:text-white">
            {t("menu.privacyPolicy")}
          </a>
          <a target="_blank" href="https://support.muffin.ae/en-US/kb/article/13/terms-and-conditions" className="hover:text-slate-700 text-xs text-black dark:text-white">
            {t("menu.termsAndConditions")}
          </a>
          {/* <Link onClick={scrollToTop} href="/release-notes">
            <a className="hover:text-slate-700 text-xs text-black dark:text-white">
              Release Notes
            </a>
          </Link> */}
          <hr />
          <Dialog>
            <DialogTrigger>
              <div
                className={cn(
                  "flex space-x-2 my-4",
                  i18n.language == "ar"
                    ? "space-x-reverse space-x-2"
                    : "space-x-2"
                )}
              >
                {<LogOutIcon size={20} className="text-primary" />}{" "}
                <p className="text-sm">{t("menu.signOut")}</p>
              </div>
            </DialogTrigger>
            <DialogContent
              className={cn(
                "sm:max-w-md opacity-100",
                i18n.language == "ar"
                  ? "space-x-reverse space-x-2"
                  : "space-x-2"
              )}
            >
              <DialogHeader
                className={cn(i18n.language == "ar" && "w-full items-end")}
              >
                <DialogTitle>{t("signOut.confirmSignOut")}</DialogTitle>
              </DialogHeader>
              <DialogFooter
                className={cn(
                  "sm:justify-start items-center w-full",
                  i18n.language == "ar" && "w-full justify-end items-end"
                )}
              >
                <Button
                  className="hover:bg-[#FF599B]/90"
                  onClick={async () => {
                    queryClient.clear();
                    signOut();
                    await OneSignal.logout();
                    setProfileData(null);
                    setProfileHeaderValues(null);
                    setMemberList([]);
                    // setReadList({});
                  }}
                >
                  {t("signOut.yes")}
                </Button>
                <DialogClose>
                  <Button
                    className="text-white hover:bg-[#1b2950]/90"
                    type="button"
                    variant="secondary"
                  >
                    {t("signOut.no")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
