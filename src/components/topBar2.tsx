import { LogOutIcon, MenuIcon, Search, SlidersHorizontal } from "lucide-react";
import { ReactNode, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "wouter";
import logo from "@/assets/logo.svg";
import links from "@/lib/sideBar";
import { cn, scrollToTop } from "@/lib/utils";

import { useUserStore } from "@/zustand/auth/user";
import { useQueryClient } from "@tanstack/react-query";
import useHomepageViewStore from "@/zustand/home/homepageView";
import useConversationHistoryStore from "@/zustand/messaging/showConversation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import HomepageSearchInput from "./homeSearchUsersInput";
import NotificationsListFiters from "./notifications/notificationListFilters";
import HomeFilters from "./home/filters";
// import useReadConversationsStateStore from "@/zustand/messaging/readConversations";
import { useTranslation } from "react-i18next";
import OneSignal from "react-onesignal";

const TopBar2 = ({ children }: { children: ReactNode }) => {
  const [t, i18n] = useTranslation();
  const [location] = useLocation();
  const reset = useConversationHistoryStore((state) => state.resetToNull);
  const signOut = useUserStore((state) => state.reset);
  // const { updateRead: setReadList } = useReadConversationsStateStore();
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [filtersTriggered, setFiltersTriggered] = useState(false);
  const setSelectedProfileId = useHomepageViewStore(
    (state) => state.setSelectedProfileId
  );

  // const [location] = useLocation();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const navLinks = links(user!.member_id).map((link, index) => {
    return (
      <li
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
        key={index}
        className="w-full"
      >
        <Link
          className={cn(
            "h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2",
            location.startsWith("/profile") && link.path.startsWith("/profile")
              ? "font-semibold bg-accent"
              : location.endsWith(link.path)
                ? "font-semibold bg-accent"
                : "font-normal",
            i18n.language == "ar" && "space-x-reverse"
          )}
          href={
            link.name == "My Profile"
              ? `/profile/${user!.member_id}`
              : link.path
          }
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
              fill={
                location.startsWith("/profile") &&
                  link.path.startsWith("/profile")
                  ? "black"
                  : location.endsWith(link.path)
                    ? "black"
                    : "white"
              }
              stroke={
                link.name == "Home" && location.endsWith(link.path)
                  ? "white"
                  : "black"
              }
              strokeWidth={location.endsWith(link.path) ? 0.8 : 2}
              size={20}
            />
          }
          <p className="text-sm">{link.name}</p>
        </Link>
      </li>
    );
  });

  if (!user?.profile_completed) {
    return <></>;
  }

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className={cn(
        "flex lg:h-full h-8 lg:items-start items-center lg:space-x-0 space-x-4  lg:pl-0 pl-5 lg:border-0 border-b px-10 py-8",
        i18n.language == "ar" && "space-x-reverse space-x-4"
      )}
    >
      {/* search */}
      <Dialog
        open={searchTriggered}
        onOpenChange={(val) => setSearchTriggered(val)}
      >
        <DialogContent className="sm:max-w-md opacity-100 w-4/5 left-[50%] top-[30%] sm:top-[40%]">
          <p>Search user</p>
          <HomepageSearchInput />
        </DialogContent>
      </Dialog>
      {/* filters */}
      <Dialog
        open={filtersTriggered}
        onOpenChange={(val) => setFiltersTriggered(val)}
      >
        {location === "/" && (
          <DialogContent className="flex flex-col sm:max-w-md opacity-100 w-4/5">
            <HomeFilters isLoading={false} members={null} />
          </DialogContent>
        )}

        {location === "/notifications" && (
          <DialogContent className="sm:max-w-md opacity-100 w-4/5">
            <p className="px-5 text-[#cfd8e4]">Filters</p>
            <NotificationsListFiters />
          </DialogContent>
        )}
      </Dialog>
      <Sheet>
        <div className="flex  w-full items-center">
          <SheetTrigger
            className={cn(
              "flex flex-row lg:hidden w-full space-x-5",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <MenuIcon className="flex-shrink-0" />
            {children}
          </SheetTrigger>
          {location === "/" || location === "/notifications" ?
            <div className="w-full h-min inline-flex justify-center items-center">
              <img src={logo} className="w-full h-10 m-2" />
            </div> : <></>}
          {location === "/" || location === "/notifications" ? (
            <div
              className={cn(
                "flex flex-row space-x-3 w-full justify-end items-center",
                i18n.language == "ar" && "space-x-reverse"
              )}
            >
              <SlidersHorizontal
                size={20}
                onClick={() => {
                  setFiltersTriggered(true);
                }}
                className="block lg:hidden w-max"
              />
              <Search
                size={20}
                onClick={() => {
                  setSearchTriggered(true);
                }}
                className="block lg:hidden w-max"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <SheetContent className="overflow-y-auto" side={i18n.language == "en" ? "left" : "right"}>
          <SheetHeader>
            <SheetTitle>
              <Link href="/">
                <img
                  className="hover:cursor-pointer h-max w-max my-8 mx-4"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </SheetTitle>{" "}
            <ul>{navLinks}</ul>
            <hr />
            <div
              dir={i18n.language == "ar" ? "rtl" : "ltr"}
              className="flex items-start justify-end flex-col space-y-4 px-4 h-full mt-10 pt-5 "
            >
              <a
                className="hover:text-slate-700 text-sm text-black dark:text-white"
                href="https://softnames.bolddesk.com/"
                target="__blank"
              >
                {t("menu.helpCenter")}
              </a>
              <Link onClick={scrollToTop} href="/privacy">
                <a className="hover:text-slate-700 text-sm text-black dark:text-white">
                  {t("menu.privacyPolicy")}
                </a>
              </Link>
              <Link onClick={scrollToTop} href="/terms">
                <a className="hover:text-slate-700 text-sm text-black dark:text-white">
                  {t("menu.termsAndConditions")}
                </a>
              </Link>
            </div>
            <Dialog>
              <DialogTrigger>
                <div
                  dir={i18n.language == "ar" ? "rtl" : "ltr"}
                  className={cn(
                    "flex space-x-2 my-4 ml-3",
                    i18n.language == "ar" && "space-x-reverse"
                  )}
                >
                  {<LogOutIcon size={20} className="text-primary" />}{" "}
                  <p className="text-sm">{t("menu.signOut")}</p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-72 sm:max-w-md opacity-100">
                <DialogHeader>
                  <DialogTitle>{t("signOut.confirmSignOut")}</DialogTitle>
                </DialogHeader>
                <DialogFooter className="sm:justify-start flex flex-col space-y-2 sm:space-y-0 pt-5">
                  <Button
                    className="hover:bg-[#FF599B]/90"
                    onClick={async () => {
                      queryClient.invalidateQueries();
                      signOut();
                      await OneSignal.logout();
                      // setReadList({});
                    }}
                  >
                    {t("signOut.yes")}
                  </Button>
                  <DialogClose asChild>
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
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TopBar2;
