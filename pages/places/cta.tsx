// import GooglePlay from "@/assets/google-play.png";
// import AppStore from "@/assets/app-store.png";

import { motion } from "framer-motion";
import { Button } from "../../src/components/ui/button";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import React from "react";
const staggerMotion = {
  hidden: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const child = {
  hidden: { opacity: 0 },
  whileInView: { opacity: 1 },
};

const Cta = () => {
  const [t, i18n] = useTranslation();
  return (
    <motion.div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className="mx-8 lg:mx-36 mt-8 md:mt-12 lg:mt-64"
    >
      <motion.div
        variants={staggerMotion}
        viewport={{ once: true }}
        initial="hidden"
        whileInView="whileInView"
        className="grid lg:grid-cols-3 relative gap-4 py-14 md:py-28"
      >
        <motion.div
          variants={child}
          className="lg:flex justify-end hidden w-full h-full"
        >
          <img
            className="absolute -translate-y-72 "
            src={"/cta-phone.png"}
            alt="phone"
          />
        </motion.div>
        <motion.div
          variants={child}
          className="space-y-4 col-span-2 text-secondary"
        >
          <p className="text-4xl font-semibold text-white">
            {t("landingPage.letsBakeLoveTogether")}
          </p>
          <p className="text-white font-light">
            {t("landingPage.experienceLoveAnew")}
          </p>

          <motion.div variants={child} className="flex space-x-2">
            <Link href="/auth/signin">
              <Button className="dark:hover:bg-[#FF599B]/80 hover:bg-[#FF599B]/90 dark:bg-[#FF599B] dark:text-white">
                {t("landingPage.signIn")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cta;
