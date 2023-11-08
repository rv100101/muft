import ChatCard from "./chatCard";
import heroPhone from "@/assets/hero-phone.png";
import heroAvatar1 from "@/assets/hero-avatar1.png";
import heroAvatar2 from "@/assets/hero-avatar2.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery, useTimeout } from "usehooks-ts";
import { useLocation } from "wouter";

const Conversation = () => {
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();
  const hide = () => setVisible(true);
  const isAuthPage = location.includes("/auth/");

  useTimeout(hide, isAuthPage ? 0 : 3000);

  const matches = useMediaQuery("(min-width: 768px)");

  const firstTextToType = matches
    ? "What was it about my profile that caught your attention and made flirt?"
    : "What caught your eye?";
  const secondTextToType = matches
    ? "Your captivating smile drew me in, and your intriguing interests made me want to flirt."
    : "Smile and interests.";

  const [firstTypedChat, setFirstTypedChat] = useState("");
  const [secondTypedChat, setSecondTypedChat] = useState("");
  const [firstChatIndex, setFirstChatIndex] = useState(0);
  const [secondChatIndex, setSecondChatIndex] = useState(0);

  useEffect(() => {
    const firstTypingInterval = setInterval(() => {
      if (visible && firstChatIndex < firstTextToType.length) {
        setFirstTypedChat(
          (prevText) => prevText + firstTextToType[firstChatIndex]
        );
        setFirstChatIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(firstTypingInterval);
      }
    }, 50);

    const secondTypingInterval = setInterval(() => {
      if (
        visible &&
        firstChatIndex >= firstTextToType.length &&
        secondChatIndex < secondTextToType.length
      ) {
        setSecondTypedChat(
          (prevText) => prevText + secondTextToType[secondChatIndex]
        );
        setSecondChatIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(secondTypingInterval);
      }
    }, 50);

    return () => {
      clearInterval(firstTypingInterval);
      clearInterval(secondTypingInterval);
    };
  }, [
    firstChatIndex,
    firstTextToType,
    secondChatIndex,
    secondTextToType,
    visible,
  ]);

  return (
    <div className="flex h-full justify-center md:justify-end items-center relative">
      <motion.img
        initial={{
          scale: 0,
        }}
        whileInView={{
          scale: 1,
        }}
        transition={{
          delay: isAuthPage ? 0.5 : 2.5,
        }}
        viewport={{ once: true }}
        src={heroPhone}
        alt="phone image"
      />
      <ChatCard
        className="absolute flex items-start md:w-full w-48 -translate-x-12 -translate-y-12 md:-translate-x-1  md:-translate-y-16"
        text={firstTypedChat}
        img={heroAvatar1}
        avatarFirst={true}
        name="Emily"
        time="05:16 AM"
        borderRadius="rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-xl"
      />
      {firstChatIndex >= firstTextToType.length && (
        <ChatCard
          className="h-12 rounded-br-lg w-48 md:w-full md:h-max absolute flex items-start translate-y-14 md:translate-y-36 md:translate-x-12 lg:translate-x-20"
          text={secondTypedChat}
          img={heroAvatar2}
          avatarFirst={false}
          name="Mike"
          time="10:23 AM"
          borderRadius="rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-xl"
        />
      )}
    </div>
  );
};

export default Conversation;
