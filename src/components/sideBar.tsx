import logo from "@/assets/logo.svg";
import links from "@/lib/sideBar";
import { Button } from "./ui/button";
import { LogOutIcon, Settings2Icon } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";
import useHomepageViewStore from "@/zustand/home/homepageView";

const SideBar = () => {
  const signOut = useUserStore((state) => state.reset);
  const setSelectedProfileId = useHomepageViewStore((state) =>
    state.setSelectedProfileId
  );
  const [location] = useLocation();
  const navLinks = links.map((link, index) => {
    return (
      <li key={index} className="w-full">
        <Link
          className={cn(
            "h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2",
            location.endsWith(link.path)
              ? "font-semibold bg-accent"
              : "font-normal",
          )}
          href={link.path}
          onClick={() => {
            if (link.name == "Profile") {
              setSelectedProfileId(null);
            }
          }}
        >
          {
            <link.icon
              fill={location.endsWith(link.path) ? "black" : "white"}
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
        <ul>
          {navLinks}
        </ul>
      </div>
      <Link
        onClick={signOut}
        className="h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2"
        href={"/"}
      >
        {<LogOutIcon size={20} />} <p className="text-sm">Sign out</p>
      {<LogOutIcon size={20} />} <p className="text-sm">Sign out</p>
      </Link>
    </div>
  );
};

export default SideBar;
