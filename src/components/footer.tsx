import LogoWhite from "@/assets/logo-white.svg";
import { Button } from "./ui/button";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
const Footer = () => {
  return (
    <div className="mx-8 lg:mx-[200px] py-8 md:py-32 space-y-4 ">
      <div className="flex justify-center md:justify-start">
        <img src={LogoWhite} alt="white muffin logo" />
      </div>
      <nav className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between">
        <div className="flex flex-wrap space-x-2 md:space-x-4 hover">
          <Button
            className="hover:bg-transparent hover:text-slate-400 p-0 font-light text-white"
            variant={"ghost"}
          >
            Link One
          </Button>
          <Button
            className="hover:bg-transparent hover:text-slate-400 p-0 font-light text-white"
            variant={"ghost"}
          >
            Link Two
          </Button>
          <Button
            className="hover:bg-transparent hover:text-slate-400 p-0 font-light text-white"
            variant={"ghost"}
          >
            Link Three
          </Button>
          <Button
            className="hover:bg-transparent hover:text-slate-400 p-0 font-light text-white"
            variant={"ghost"}
          >
            Link Four
          </Button>
          <Button
            className="hover:bg-transparent hover:text-slate-400 p-0 font-light text-white"
            variant={"ghost"}
          >
            Link Five
          </Button>
        </div>
        <div className="flex space-x-4 justify-evenly items-center">
          <a href="/" color="white" className="text-white hover:text-slate-400">
            <Facebook />
          </a>
          <a href="/" color="white" className="text-white hover:text-slate-400">
            <Instagram />
          </a>
          <a href="/" color="white" className="text-white hover:text-slate-400">
            <Twitter />
          </a>
          <a href="/" color="white" className="text-white hover:text-slate-400">
            <Linkedin />
          </a>
        </div>
      </nav>
      <hr />
      <div className="flex justify-between text-white">
        <p className="hidden md:block">© 2023 Relume. All rights reserved.</p>
        <ul className="flex list-none space-x-4 underline text-xs md:text-md">
          <li>
            <a href="/" className="hover:text-slate-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/" className="hover:text-slate-400">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/" className="hover:text-slate-400">
              Cookies Settings
            </a>
          </li>
        </ul>
      </div>
      <p className="text-white text-xs text-center md:hidden block">
        © 2023 Relume. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
