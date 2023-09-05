import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import heroPhone from "@/assets/hero-phone.svg";
import heroAvatar1 from "@/assets/hero-avatar1.svg";
import heroAvatar2 from "@/assets/hero-avatar2.svg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
    <motion.div className="bg-secondaryBackground py-6 md:py-12 px-[30px] md:px-[60px] rounded-3xl">
      <div className="grid grid-cols-1 md:grid-rows-1 rows-auto md:grid-cols-2 md:gap-2">
        <div className="space-y-6 flex flex-col items-start lg:justify-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-secondary">
            Medium length section heading goes here
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
          <Button
            className={cn(
              "border-primary rounded-xl text-primary hover:text-[#FF267C] hover:ring-1 ring-primary"
            )}
            variant={"outline"}
          >
            Read more
          </Button>
        </div>
        <div className="flex justify-center md:justify-end items-center relative">
          <img src={heroPhone} alt="hero phone image" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute flex space-x-4 items-start w-48 -translate-x-12 md:-translate-x-1 md:w-full md:-translate-y-32"
          >
            <img width={36} src={heroAvatar1} alt="user avatar 1" />
            <p className="text-xs w-64 bg-white p-2 rounded-lg font-normal truncate md:h-max md:whitespace-normal">
              {firstTypedText}
            </p>
          </motion.div>
          {firstCurrentIndex >= firstTextToType.length && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-12 w-48 md:w-full md:h-max absolute flex space-x-4 items-start translate-y-12 md:translate-y-36 translate-x-12 md:translate-x-6"
            >
              <p className="text-xs w-64 bg-blue-600 p-2 text-white rounded-lg font-extralight truncate md:h-max  md:whitespace-normal">
                {secondTypedText}
              </p>
              <img width={36} src={heroAvatar2} alt="user avatar 2" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
