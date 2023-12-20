import Hero from "@/components/hero";
import Benefits from "@/components/benefits";
import Features from "@/components/features";
import Cta from "@/components/cta";
// import GetApp from "@/components/getApp";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <>
      {/*<GetApp /> */}
      <div className="mx-8 md:mx-12 lg:mx-36">
        <Hero />
        <Benefits />
        <Features />
        {/* <Testimonials /> */}
      </div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
        }}
        viewport={{ once: true }}
        className="bg-[#FF7AAF]"
      >
        <Cta />
      </motion.div>
    </>
  );
};

export default LandingPage;
