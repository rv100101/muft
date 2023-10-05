import { motion } from "framer-motion";
import { banner } from "@/lib/homepage";
import GooglePlay from "@/assets/google-play.png";
import AppStore from "@/assets/app-store.png";
import Conversation from "./conversation";

const Hero = () => {
  return (
    <motion.div
      initial={{
        scale: 0,
      }}
      whileInView={{
        scale: 1,
      }}
      transition={{
        delay: 1.5,
      }}
      viewport={{ once: true }}
      className="bg-secondaryBackground py-6 md:py-12 px-[30px] md:px-[60px] rounded-3xl"
    >
      <div className="grid grid-cols-1 md:grid-rows-1 rows-auto md:grid-cols-2 md:gap-2">
        <div className="relative space-y-6 flex flex-col items-start lg:justify-center">
          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              delay: 3,
            }}
            viewport={{ once: true }}
            className="h-56 absolute rounded-full w-56 bg-[#FFDEEB] lg:-translate-y-36 lg:-translate-x-8 blur-2xl"
          />
          <motion.h1
            initial={{
              scale: 0,
            }}
            whileInView={{
              scale: 1,
            }}
            transition={{
              delay: 2,
            }}
            viewport={{ once: true }}
            className="z-20 text-3xl md:text-4xl font-semibold text-secondary"
          >
            {banner.header}
          </motion.h1>
          <motion.p
            initial={{
              scale: 0,
            }}
            whileInView={{
              scale: 1,
            }}
            transition={{
              delay: 2.5,
            }}
            viewport={{ once: true }}
            className="z-20"
          >
            {banner.body}
          </motion.p>
          <motion.div
            initial={{
              scale: 0,
            }}
            whileInView={{
              scale: 1,
            }}
            transition={{
              delay: 2.5,
            }}
            viewport={{ once: true }}
            className="z-20 flex space-x-2 w-64 md:w-80"
          >
            <a
              href="https://apps.apple.com/us/app/muffin/id1658172035"
              target="_blank"
            >
              <img className="w-full" src={AppStore} alt="app store" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.muffin.app"
              target="_blank"
            >
              <img className="w-full" src={GooglePlay} alt="google play" />
            </a>
          </motion.div>
        </div>
        <Conversation />
      </div>
    </motion.div>
  );
};

export default Hero;
