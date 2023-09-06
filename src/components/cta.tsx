import GooglePlay from "@/assets/google-play.svg";
import AppStore from "@/assets/app-store.svg";
import CtaPhone from "@/assets/cta-phone.png";
import { motion } from "framer-motion";
import { callToAction } from "@/utils/homepage";
const staggerMotion = {
  hidden: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1,
    },
  },
};

const child = {
  hidden: { opacity: 0 },
  whileInView: { opacity: 1 },
};

const Cta = () => {
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
          <motion.div variants={child} className="flex space-x-4">
            <a href="https://play.google.com/store/apps" target="_blank">
              <img width={170} src={GooglePlay} alt="google play" />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank">
              <img width={160} src={AppStore} alt="app store" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Cta;
