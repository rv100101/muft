// import { cn } from "@/lib/utils";
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
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
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

function TopNav() {
  const [location] = useLocation();

  return (
    <motion.nav className="flex items-center justify-between my-4 mx-8 md:mx-12 lg:mx-36">
      <motion.a
        initial={
          location == "/" ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }
        }
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        href="/"
      >
        <img className="w-24 md:w-36" src={logo} alt="muffin-logo" />
      </motion.a>
      <motion.ul
        variants={container}
        initial={location == "/" ? "hidden" : "none"}
        animate="show"
        className="space-x-4 hidden md:flex"
      >
        <motion.li variants={motionTop80}>
          <Button variant={"ghost"} className="font-light">
            <Link href="https://support.softnames.com/" target="_blank">
              Contact Us
            </Link>
          </Button>
        </motion.li>
        <motion.li variants={motionTop80}>
          <Link href="/auth/signin">
            <Button
              className={cn(
                "rounded-[100px] hover:bg-[#d86392]",
                "font-semibold px-6"
              )}
            >
              Sign in
            </Button>
          </Link>
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
              <Link href="https://support.softnames.com/">Contact Us</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />{" "}
          <Link href="/auth/signin">
            <DropdownMenuItem
              className={cn(
                "m-0 text text-white bg-primary hover:bg-[#d86392]",
                "font-semibold px-6"
              )}
            >
              Sign In
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.nav>
  );
}

export default TopNav;
