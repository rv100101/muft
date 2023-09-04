import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import logo from "@/assets/logo.svg";
function NavBar() {
  return (
    <nav className="flex items-center justify-between my-4">
      <a href="/">
        <img src={logo} alt="muffin-logo" />
      </a>
      <div className="space-x-4">
        <Button variant={"ghost"} className="font-light">
          Link One
        </Button>
        <Button variant={"ghost"} className="font-light">
          Link Two
        </Button>
        <Button variant={"ghost"} className="font-light">
          Link Three
        </Button>
        <Button className={cn("rounded-[100px]", "font-semibold px-6")}>
          Sign in
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
