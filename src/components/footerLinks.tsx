import { Link } from "wouter";

const FooterLinks = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
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
  );
};

export default FooterLinks;
