import FeatureCard from "./featureCard";
import React from "react";
// import PinkBg from "@/assets/features_section/pink-bg.svg";
// import Phone from "@/assets/features_section/phone.png";
// import BottomNav from "@/assets/features_section/bottom-nav.png";
// import AddToStory from "@/assets/features_section/add-to-story.png";
import { motion } from "framer-motion";
import { features } from "./homepage";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useUpdateEffect } from "usehooks-ts";

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
  const [t, i18n] = useTranslation();
  const [muffinFeats, setMuffinFeats] = useState([
    {
      title: t("landingPage.smartMatches"),
      description: t("landingPage.advancedAlgorithm"),
      img: features.data[0].icon,
    },
    {
      title: t("landingPage.secureAndPrivate"),
      description: t("landingPage.safetyFirst"),
      img: features.data[1].icon,
    },
    {
      title: t("landingPage.inDepthProfiles"),
      description: t("landingPage.unlockUniqueCompatibility"),
      img: features.data[2].icon,
    },
    {
      title: t("landingPage.globalReach"),
      description: t("landingPage.leverageComprehensiveMemberProfiles"),
      img: features.data[3].icon,
    },
  ]);

  useUpdateEffect(() => {
    setMuffinFeats([
      {
        title: t("landingPage.smartMatches"),
        description: t("landingPage.advancedAlgorithm"),
        img: features.data[0].icon,
      },
      {
        title: t("landingPage.secureAndPrivate"),
        description: t("landingPage.safetyFirst"),
        img: features.data[1].icon,
      },
      {
        title: t("landingPage.inDepthProfiles"),
        description: t("landingPage.unlockUniqueCompatibility"),
        img: features.data[2].icon,
      },
      {
        title: t("landingPage.globalReach"),
        description: t("landingPage.leverageComprehensiveMemberProfiles"),
        img: features.data[3].icon,
      },
    ]);
  }, [t]);

  const featureComponents = muffinFeats.map((feature) => {
    return (
      <motion.div variants={itemA}>
        <FeatureCard
          title={feature.title}
          description={feature.description}
          img={feature.img}
        />
      </motion.div>
    );
  });

  return (
    <section dir={i18n.language == "ar" ? "rtl" : "ltr"} className="mt-12">
      <motion.div
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-4 md:gap-12 h-max w-full"
      >
        <motion.div
          variants={leftFeatureDescriptionsContainer}
          initial="hidden"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-8 flex flex-col justify-start"
        >
          {featureComponents[0]}
          {featureComponents[1]}
        </motion.div>
        <motion.div
          variants={imageContainer}
          initial="hidden"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="md:justify-center md:items-center relative md:flex hidden"
        >
          <motion.img variants={itemA} src={"/pink-bg.svg"} alt="pink-vector" />
          <motion.img
            variants={itemA}
            className="absolute z-20"
            src={"/phone.png"}
            alt="phone"
          />
          <motion.img
            variants={itemA}
            className="w-24 lg:w-48 absolute z-30 -translate-x-12 lg:-translate-x-24 md:-translate-y-12 lg:-translate-y-20"
            src={"/bottom-nav.png"}
            alt="Bottom nav phone image"
          />
          <motion.img
            variants={itemA}
            className="w-24 lg:w-48 absolute z-30 translate-x-24 translate-y-12"
            src={"/add-to-story.png"}
            alt="Add to story image"
          />
        </motion.div>
        <motion.div
          variants={rightFeatureDescriptionsContainer}
          initial="hidden"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-8 flex flex-col justify-end"
        >
          {featureComponents[2]}
          {featureComponents[3]}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;
