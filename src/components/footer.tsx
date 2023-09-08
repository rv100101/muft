import LogoWhite from "@/assets/logo-white.svg";
import { Mail } from "lucide-react";
import { Link } from "wouter";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="mx-8 lg:mx-36 py-8 md:py-32 space-y-4 ">
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
          >
            <p>Contact Us</p>
            <Mail />
          </a>
        </div>
      </nav>
      <hr />
      <div className="flex justify-between text-white">
        <p className="hidden md:block text-xs">
          &copy; 2023 Softnames. All Right Reserved.
        </p>
        <ul className="flex list-none space-x-4 underline text-xs md:text-md">
          <li>
            <Link onClick={scrollToTop} href="/privacy-policy">
              <a className="hover:text-slate-400">Privacy Policy</a>
            </Link>
          </li>
          <li>
            <Link onClick={scrollToTop} href="/terms">
              <a className="hover:text-slate-400">Terms of Service</a>
            </Link>
          </li>
          <li>
            <Link onClick={scrollToTop} href="/release-notes">
              <a className="hover:text-slate-400">Release Notes</a>
            </Link>
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
