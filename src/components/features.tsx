import FeatureCard from "./featureCard";
import FeatureIcone1 from "@/assets/feature-icon-1.svg";
import FeatureIcone2 from "@/assets/feature-icon-2.svg";
import FeatureIcone3 from "@/assets/feature-icon-3.svg";
import FeatureIcone4 from "@/assets/feature-icon-4.svg";
import PinkBg from "@/assets/features_section/pink-bg.svg";
import Phone from "@/assets/features_section/phone.png";
import BottomNav from "@/assets/features_section/bottom-nav.png";
import AddToStory from "@/assets/features_section/add-to-story.png";

import { motion } from "framer-motion";
const imageContainer = {
  hidden: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1,
    },
  },
};

const leftFeatureDescriptionsContainer = {
  hidden: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 1,
    },
  },
};

const rightFeatureDescriptionsContainer = {
  hidden: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 2,
    },
  },
};

const itemA = {
  hidden: { opacity: 0 },
  whileInView: { opacity: 1 },
};

const Features = () => {
  return (
    <section className="mt-12">
      <div className="grid md:grid-cols-3 gap-4 md:gap-12 h-max w-full">
        <motion.div
          variants={leftFeatureDescriptionsContainer}
          initial="hidden"
          animate="whileInView"
          className="space-y-8 flex flex-col justify-start"
        >
          <motion.div variants={itemA}>
            <FeatureCard
              title="Describe feature one"
              description="Highlight Unique Selling Propositions with a short summary of the key feature and how it benefits customers."
              img={FeatureIcone1}
            />
          </motion.div>
          <motion.div variants={itemA}>
            <FeatureCard
              title="Describe feature two"
              description="Highlight Unique Selling Propositions with a short summary of the key feature and how it benefits customers."
              img={FeatureIcone2}
            />
          </motion.div>
        </motion.div>
        <motion.div
          variants={imageContainer}
          initial="hidden"
          animate="whileInView"
          className="md:justify-center md:items-center relative md:flex hidden"
        >
          <motion.img variants={itemA} src={PinkBg} alt="pink-vector" />
          <motion.img
            variants={itemA}
            className="absolute z-20"
            src={Phone}
            alt="phone"
          />
          <motion.img
            variants={itemA}
            className="w-24 lg:w-48 absolute z-30 -translate-x-12 lg:-translate-x-24 md:-translate-y-12 lg:-translate-y-20"
            src={BottomNav}
            alt="Bottom nav phone image"
          />
          <motion.img
            variants={itemA}
            className="w-24 lg:w-48 absolute z-30 translate-x-24 translate-y-12"
            src={AddToStory}
            alt="Add to story image"
          />
        </motion.div>
        <motion.div
          variants={rightFeatureDescriptionsContainer}
          initial="hidden"
          animate="whileInView"
          className="space-y-8 flex flex-col justify-end"
        >
          <motion.div variants={itemA}>
            <FeatureCard
              title="Describe feature three"
              description="Highlight Unique Selling Propositions with a short summary of the key feature and how it benefits customers."
              img={FeatureIcone3}
            />
          </motion.div>
          <motion.div variants={itemA}>
            <FeatureCard
              title="Describe feature four"
              description="Highlight Unique Selling Propositions with a short summary of the key feature and how it benefits customers."
              img={FeatureIcone4}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
