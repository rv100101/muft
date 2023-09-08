import heroPhone from "@/assets/hero-phone.png";
import heroAvatar1 from "@/assets/hero-avatar1.svg";
import heroAvatar2 from "@/assets/hero-avatar2.svg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ChatCard from "./chatCard";
import { banner } from "@/utils/homepage";
import GooglePlay from "@/assets/google-play.svg";
import AppStore from "@/assets/app-store.svg";

const Hero = () => {
  const firstTextToType =
    "Hey, Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const secondTextToType =
    " Hey, Lorem ipsum dolor sit amet truy, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.";
  const [firstTypedText, setFirstTypedText] = useState("");
  const [secondTypedText, setSecondTypedText] = useState("");
  const [firstCurrentIndex, setFirstCurrentIndex] = useState(0);
  const [secondCurrentIndex, setSecondCurrentIndex] = useState(0);

  useEffect(() => {
    const firstTypingInterval = setInterval(() => {
      if (firstCurrentIndex < firstTextToType.length) {
        setFirstTypedText(
          (prevText) => prevText + firstTextToType[firstCurrentIndex]
        );
        setFirstCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(firstTypingInterval);
      }
    }, 50);

    const secondTypingInterval = setInterval(() => {
      if (
        firstCurrentIndex >= firstTextToType.length &&
        secondCurrentIndex < secondTextToType.length
      ) {
        setSecondTypedText(
          (prevText) => prevText + secondTextToType[secondCurrentIndex]
        );
        setSecondCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(secondTypingInterval);
      }
    }, 50);

    return () => {
      clearInterval(firstTypingInterval);
      clearInterval(secondTypingInterval);
    };
  }, [firstCurrentIndex, secondCurrentIndex]);

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
            className="flex space-x-4"
          >
            <a href="https://www.apple.com" target="_blank">
              <img width={160} src={AppStore} alt="app store" />
            </a>
            <a href="https://play.google.com" target="_blank">
              <img width={170} src={GooglePlay} alt="google play" />
            </a>
          </motion.div>
        </div>
        <div className="flex justify-center md:justify-end items-center relative">
          <motion.img
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
            src={heroPhone}
            alt="hero phone image"
          />
          <ChatCard
            className="absolute flex items-start md:w-full w-48 -translate-x-12 -translate-y-12 md:-translate-x-1  md:-translate-y-16"
            text={firstTypedText}
            img={heroAvatar1}
            avatarFirst={true}
            name="Daryl"
            time="05:16 AM"
            borderRadius="rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-xl"
          />
          {firstCurrentIndex >= firstTextToType.length && (
            <ChatCard
              className="h-12 rounded-br-lg w-48 md:w-full md:h-max absolute flex items-start translate-y-14 md:translate-y-36 md:translate-x-12 lg:translate-x-20"
              text={secondTypedText}
              img={heroAvatar2}
              avatarFirst={false}
              name="James"
              time="10:23 AM"
              borderRadius="rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-xl"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
