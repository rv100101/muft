import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import logo from "@/assets/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

function NavBar() {
  return (
    <nav className="flex items-center justify-between my-4">
      <a href="/">
        <img className="w-24 md:w-full" src={logo} alt="muffin-logo" />
      </a>
      <div className="space-x-4 hidden md:block">
        <Button variant={"ghost"} className="font-light">
          Link One
        </Button>
        <Button variant={"ghost"} className="font-light">
          Link Two
        </Button>
        <Button variant={"ghost"} className="font-light">
          Link Three
        </Button>
        <Button
          className={cn(
            "rounded-[100px] hover:bg-[#d86392]",
            "font-semibold px-6"
          )}
        >
          Sign in
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="block md:hidden" asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Links</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Link 1</DropdownMenuItem>
            <DropdownMenuItem>Link 2</DropdownMenuItem>
            <DropdownMenuItem>Link 3</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={cn(
              "m-0 text text-white bg-primary hover:bg-[#d86392]",
              "font-semibold px-6"
            )}
          >
            Sign In
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default NavBar;
