import LogoWhite from "@/assets/logo-white.svg";
import { Button } from "./ui/button";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
const Footer = () => {
  return (
    <div className="mx-8 md:mx-[200px] py-8 md:py-32 space-y-4 flex flex-col">
      <img src={LogoWhite} alt="white muffin logo" />
      <nav className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between">
        <div className="flex flex-wrap space-x-2 md:space-x-4">
          <Button className="p-0 font-light text-white" variant={"ghost"}>
            Link One
          </Button>
          <Button className="p-0 font-light text-white" variant={"ghost"}>
            Link Two
          </Button>
          <Button className="p-0 font-light text-white" variant={"ghost"}>
            Link Three
          </Button>
          <Button className="p-0 font-light text-white" variant={"ghost"}>
            Link Four
          </Button>
          <Button className="p-0 font-light text-white" variant={"ghost"}>
            Link Five
          </Button>
        </div>
        <div className="flex space-x-4 justify-evenly items-center">
          <a href="/" color="white" className="text-white">
            <Facebook />
          </a>
          <a href="/" color="white" className="text-white">
            <Instagram />
          </a>
          <a href="/" color="white" className="text-white">
            <Twitter />
          </a>
          <a href="/" color="white" className="text-white">
            <Linkedin />
          </a>
        </div>
      </nav>
      <hr />
      <div className="flex justify-between text-white">
        <p className="hidden md:block">© 2023 Relume. All rights reserved.</p>
        <ul className="flex list-none space-x-4 underline text-xs md:text-md">
          <li>
            <a href="/">Privacy Policy</a>
          </li>
          <li>
            <a href="/">Terms of Service</a>
          </li>
          <li>
            <a href="/">Cookies Settings</a>
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
