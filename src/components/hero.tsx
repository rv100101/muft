import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import heroPhone from "@/assets/hero-phone.svg";
import heroAvatar1 from "@/assets/hero-avatar1.svg";
import heroAvatar2 from "@/assets/hero-avatar2.svg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const textToType = "This is a typing animation.";
  const [typedText, setTypedText] = useState(
    "Hey, Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < textToType.length) {
        setTypedText((prevText) => prevText + textToType[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 70); // Adjust the delay as needed for typing speed

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <div className="bg-secondaryBackground py-6 md:py-12 px-[30px] md:px-[60px] rounded-3xl">
      <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2">
        <div className="space-y-6 flex flex-col items-start justify-center">
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
        <div className="flex justify-end items-center relative h-full w-full">
          <img src={heroPhone} alt="hero phone image" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute flex space-x-4 items-start -translate-y-24 md:-translate-y-32 md:-translate-x-24"
          >
            <img width={36} src={heroAvatar1} alt="user avatar 1" />
            <p className="text-xs w-64 bg-white p-2 rounded-lg font-normal">
              {typedText}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="h-12 md:h-max absolute flex space-x-4 items-start translate-y-12 md:translate-y-36 md:translate-x-6"
          >
            <p className="text-xs md:h-max w-64 bg-blue-600 p-2 text-white rounded-lg font-extralight truncate md:whitespace-normal">
              Hey, Lorem ipsum dolor sit amet truy, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <img width={36} src={heroAvatar2} alt="user avatar 2" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
