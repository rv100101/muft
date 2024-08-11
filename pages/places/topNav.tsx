// import { cn } from "@/lib/utils";
import { Button } from "../../src/components/ui/button";
// import logo from "@/assets/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu";
import { HelpCircle, Menu } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "../../src/lib/utils";
import { useTranslation } from "react-i18next";
import PreferredLanguageDialog from "./preferredLanguageDialog";
import React from "react";
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
  const router = useRouter();
  const { pathname } = router;
  const [t, i18n] = useTranslation();
  return (
    <motion.nav
      className={cn(
        "flex items-center justify-between mx-8 md:mx-12 lg:mx-36",
        pathname === "/auth" ? "my-2" : "my-4"
      )}
    >
      <Link href="/">
        <motion.div
          className="hover:cursor-pointer"
          initial={
            pathname == "/"
              ? { opacity: 0, scale: 0 }
              : { opacity: 1, scale: 1 }
          }
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <img
            className={cn(
              "w-24",
              pathname === "/auth" ? "md:w-24" : "md:w-36"
            )}
            src={"/logo.svg"}
            alt="muffin-logo"
          />
        </motion.div>
      </Link>
      <motion.ul
        variants={container}
        initial={pathname === "/" ? "hidden" : "none"}
        animate="show"
        className="md:space-x-4 flex"
      >
        {pathname === "/auth" && (
          <div>
            <motion.li variants={motionTop80}>
              <Button
                variant={"ghost"}
                className="font-light flex flex-row space-x-2"
              >
                <a
                  className={cn(
                    pathname === "/auth" ? "text-xs" : "text-md"
                  )}
                  href="https://support.softnames.com/"
                  target="_blank"
                >
                  {t("signIn.help")}
                </a>
                <HelpCircle
                  color="#1B2950"
                  size={20}
                  className="hover:cursor-pointer"
                />
              </Button>
            </motion.li>
          </div>
        )}
        {pathname !== "/auth" && (
          <>
            <div className="hidden md:flex">
              {/* <motion.li variants={motionTop80}>
                <Button variant={"ghost"} className="font-light">
                  <a
                    className={cn(
                      "text-md",
                    )}
                    href="/about"
                  >
                    About Us
                  </a>
                </Button>
              </motion.li>
              <motion.li variants={motionTop80}>
                <Button variant={"ghost"} className="font-light">
                  <a
                    className={cn(
                      "text-md",
                    )}
                    href="/subscription"
                  >
                    Subscription
                  </a>
                </Button>
              </motion.li> */}
              <motion.li variants={motionTop80}>
                <Button variant={"ghost"} className="font-light">
                  <a
                    className={cn("text-md")}
                    href="https://support.muffin.ae"
                    target="_blank"
                  >
                    {t("landingPage.faq")}
                  </a>
                </Button>
              </motion.li>
              <motion.li variants={motionTop80}>
                <Button variant={"ghost"} className="font-light">
                  <a
                    className={cn("text-md")}
                    href="https://support.muffin.ae"
                    target="_blank"
                  >
                    {t("landingPage.contact")}
                  </a>
                </Button>
              </motion.li>
              <motion.li variants={motionTop80}>
                <Button variant={"ghost"} className="font-light">
                  <a
                    className={cn("text-md")}
                    href="https://support.muffin.ae"
                    target="_blank"
                  >
                    {t("landingPage.support")}
                  </a>
                </Button>
              </motion.li>
            </div>
            <motion.li variants={motionTop80}>
              <PreferredLanguageDialog
                showTrigger={true}
                triggerTitle={i18n.language == "en" ? "العربية" : "English"}
                isLandingPage={true}
                triggerVariant="default"
              />
            </motion.li>
          </>
        )}
        {/* <motion.li variants={motionTop80}>
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
        </motion.li> */}
        <motion.li>
          <DropdownMenu dir={i18n.language == "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger className="block md:hidden ml-2" asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {/* <DropdownMenuLabel>Muffin</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              <DropdownMenuGroup>
                {/* <DropdownMenuItem>
              <a href="/about">{t("landingPage.aboutUs")}</a>
            </DropdownMenuItem> */}
                {/* <DropdownMenuItem>
              <a href="/subscription">
                Subscription
              </a>
            </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <a target="_blank" href="https://support.softnames.com/">
                    {t("landingPage.faq")}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a target="_blank" href="https://support.softnames.com/">
                    {t("landingPage.contactUs")}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a target="_blank" href="https://support.softnames.com/">
                    {t("landingPage.support")}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {/* <Link href="/auth/signin">
            <DropdownMenuItem
              className={cn(
                "m-0 text text-white bg-primary hover:bg-[#d86392]",
                "font-semibold px-6"
              )}
            >
              Sign In
            </DropdownMenuItem>
          </Link> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
}

export default TopNav;