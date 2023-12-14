import { Button } from "./ui/button";
import { ArrowLeft, MenuIcon, Settings2Icon } from "lucide-react";
import { ReactNode } from "react";
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

const TopBar = ({ children }: { children: ReactNode }) => {
  const [location] = useLocation();
  let navLinks = links.map((link, index) => {
    return (
      <li key={index} className="w-full">
        <Link
          className="h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2"
          href={link.path}
        >
          {<link.icon />} <p>{link.name}</p>
        </Link>
      </li>
    );
  });

  navLinks = [
    ...navLinks,
    <li key={navLinks.length + 1} className="w-full">
      <Link
        className="h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2"
        href={"/settings"}
      >
        <Settings2Icon /> <p>Settings</p>
      </Link>
    </li>,
  ];

  return (
    <div className="flex h-8 items-center space-x-4">
      <Sheet>
        <SheetTrigger className="block sm:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              <Link href="/">
                <img
                  className="hover:cursor-pointer my-8 mx-4"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </SheetTitle>
            <ul>{navLinks}</ul>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      {location !== "/notifications" && (
        <Button
          onClick={() => {
            window.history.go(-1);
          }}
          variant={"ghost"}
          className="hidden sm:block hover:bg-white p-0"
        >
          <ArrowLeft />
        </Button>
      )}
      {children}
    </div>
  );
};

export default TopBar;
