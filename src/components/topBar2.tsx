import { LogOutIcon, MenuIcon } from "lucide-react";
import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "wouter";
import logo from "@/assets/logo.svg";
import links from "@/lib/sideBar";
import { useUserStore } from "@/zustand/auth/user";

const TopBar2 = ({ children }: { children: ReactNode }) => {
  const signOut = useUserStore((state) => state.reset);
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
        <Link
          onClick={signOut}
          className="h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2"
          href={"/"}
        >
          {<LogOutIcon size={20} />} <p className="text-sm">Sign out</p>
        </Link>
        {/* <Settings2Icon /> <p>Settings</p> */}
      </Link>
    </li>,
  ];

  return (
    <div className="flex lg:h-full h-8 lg:items-start items-center lg:space-x-0 space-x-4  lg:pl-0 pl-5 lg:border-0 border-b">
      <Sheet>
        <SheetTrigger className="block sm:hidden">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side={"left"}>
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
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {children}
    </div>
  );
};

export default TopBar2;
