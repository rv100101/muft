import { scrollToTop } from "@/lib/utils";
import { Link } from "wouter";

const FooterLinks = () => {
  return (
    <ul className="flex justify-center list-none space-x-4 text-xs md:text-md">
      <li>
        <Link onClick={scrollToTop} href="/privacy">
          <a className="text-white underline font-light hover:text-slate-400">
            Privacy Policy
          </a>
        </Link>
      </li>
      <li>
        <Link onClick={scrollToTop} href="/terms">
          <a className="text-white underline font-light hover:text-slate-400">
            Terms of Service
          </a>
        </Link>
      </li>
      {/* <li>
        <Link onClick={scrollToTop} href="/release-notes">
          <a className="text-white underline font-light hover:text-slate-400">
            Release Notes
          </a>
        </Link>
      </li> */}
    </ul>
  );
};

export default FooterLinks;
