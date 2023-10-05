import logo from "@/assets/logo.svg";
import links from "@/lib/sideBar";
import { Button } from "./ui/button";
import { LogOutIcon, Settings2Icon } from "lucide-react";
import { Link } from "wouter";
import { useUserStore } from "@/zustand/auth/user";

const SideBar = () => {
  const signOut = useUserStore((state) => state.reset);

  const navLinks = links.map((link, index) => {
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

  return (
    <div className="h-full border-r sm:flex sm:flex-col justify-between hidden">
      <div>
        <Link href="/">
          <img
            className="hover:cursor-pointer h-max w-max my-8 mx-4"
            src={logo}
            alt="logo"
          />
        </Link>
        <ul>
          {navLinks}
          <li className="w-full">
            <Link
              onClick={signOut}
              className="h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-start items-center space-x-2"
              href={"/"}
            >
              {<LogOutIcon />} <p>Sign out</p>
            </Link>
          </li>
        </ul>
      </div>
      <Button variant={"ghost"} className="w-full justify-start py-7">
        <a
          className="flex justify-start items-center space-x-2"
          href={"/settings"}
        >
          <Settings2Icon />
          <p>Settings</p>
        </a>
      </Button>
    </div>
  );
};

export default SideBar;
