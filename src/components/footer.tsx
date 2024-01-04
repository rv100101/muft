import LogoWhite from "@/assets/logo-white.svg";
import { Mail } from "lucide-react";

import FooterLinks from "./footerLinks";
import { useLocation } from "wouter";
import SmallFooter from "./smallFooter";

const Footer = () => {
  const [location] = useLocation();

  if (location.includes("/auth/")) {
    return (
      <div className="w-full h-max">
        <SmallFooter />
      </div>
    );
  }

  return (
    <div className="mx-8 h-max lg:mx-36 py-8 md:py-32 space-y-4 ">
      <nav className="flex flex-row md:space-y-0 md:flex-row justify-between">
        <div className="flex justify-center md:justify-start">
          <img
            className="w-28 md:w-max"
            src={LogoWhite}
            alt="white muffin logo"
          />
        </div>
        <div className="flex justify-center items-center space-x-2 md:space-x-4 hover">
          <a
            className="flex space-x-2 hover:bg-transparent hover:text-slate-400 p-0 font-light text-white"
            href="https://support.softnames.com/"
            target="_blank"
          >
            <p>Contact Us</p>
            <Mail />
          </a>
        </div>
      </nav>
      <hr />
      <div className="flex justify-between text-white">
        <p className="hidden md:block text-xs">
          &copy; 2023 Softnames. All Rights Reserved.
        </p>
        <FooterLinks />
      </div>
      <p className="text-white text-xs text-center md:hidden block">
        &copy; 2023 Softnames. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
