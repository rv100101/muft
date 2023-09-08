import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import logo from "@/assets/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
const container = {
  none: { opacity: 1 },
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1,
    },
  },
};

const motionTop80 = {
  hidden: { scale: 0, top: 200 },
  show: { scale: 1, top: 80 },
};

function NavBar() {
  const [location] = useLocation();

  return (
    <motion.nav className="flex items-center justify-between my-4">
      <motion.a
        initial={
          location == "/" ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }
        }
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        href="/"
      >
        <img className="w-24 md:w-full" src={logo} alt="muffin-logo" />
      </motion.a>
      <motion.ul
        variants={container}
        initial={location == "/" ? "hidden" : "none"}
        animate="show"
        className="space-x-4 hidden md:flex"
      >
        <motion.li variants={motionTop80}>
          <Button variant={"ghost"} className="font-light">
            <a href="https://support.softnames.com/">Contact Us</a>
          </Button>
        </motion.li>
        <motion.li variants={motionTop80}>
          <Button
            className={cn(
              "rounded-[100px] hover:bg-[#d86392]",
              "font-semibold px-6"
            )}
          >
            Sign in
          </Button>
        </motion.li>
      </motion.ul>
      <DropdownMenu>
        <DropdownMenuTrigger className="block md:hidden" asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Muffin</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <a href="https://support.softnames.com/">Contact Us</a>
            </DropdownMenuItem>
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
    </motion.nav>
  );
}

export default NavBar;
