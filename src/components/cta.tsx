// import GooglePlay from "@/assets/google-play.png";
// import AppStore from "@/assets/app-store.png";
import CtaPhone from "@/assets/cta-phone.png";
import { motion } from "framer-motion";
import { callToAction } from "@/lib/homepage";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
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
  const [t] = useTranslation();
  return (
    <motion.div className="mx-8 lg:mx-36 mt-8 md:mt-12 lg:mt-64">
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
            src={CtaPhone}
            alt="phone"
          />
        </motion.div>
        <motion.div
          variants={child}
          className="space-y-4 col-span-2 text-secondary"
        >
          <p className="text-4xl font-semibold text-white">
            {callToAction.header}
          </p>
          <p className="text-white font-light">{callToAction.description}</p>

          <motion.div variants={child} className="flex space-x-2">
            <Button className="hover:bg-[#FF599B]/90">
              <a href="/auth/signin">{t("landingPage.signIn")}</a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cta;
