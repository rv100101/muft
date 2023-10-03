import logo from "@/assets/logo.svg";
import links from "@/lib/sideBar";
import { Button } from "./ui/button";
import { Settings2Icon } from "lucide-react";
import { Link } from "wouter";

const SideBar = () => {
  const navLinks = links.map((link, index) => {
    return (
      <li key={index} className="w-full">
        {" "}
        <Button variant={"ghost"} className="w-full justify-start py-7">
          <a
            className="flex justify-start items-center space-x-2"
            href={link.path}
          >
            {<link.icon />} <p>{link.name}</p>
          </a>
        </Button>
      </li>
    );
  });

  return (
    <div className="h-full border-r flex flex-col justify-between ">
      <div>
        <Link href="/">
          <img className="h-max w-max my-8 mx-4" src={logo} alt="logo" />
        </Link>
        <ul>{navLinks}</ul>
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
