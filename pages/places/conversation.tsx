import ChatCard from "./chatCard";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery, useTimeout } from "usehooks-ts";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import React from "react";

const Conversation = () => {
  const [t, i18n] = useTranslation();
  const [visible, setVisible] = useState(false);
  const router = useRouter();
    const { pathname } = router;
  const hide = () => setVisible(true);
  const isAuthPage = pathname.includes("/auth/");

  useTimeout(hide, isAuthPage ? 0 : 3000);

  const matches = useMediaQuery("(min-width: 768px)");

  const firstTextToType = matches
    ? t("landingPage.emilyFlirtQuestion")
    : t("landingPage.mobileEmilyFlirtQuestion");
  const secondTextToType = matches
    ? t("landingPage.mikeResponse")
    : t("landingPage.mobileMikeResponse");

  const [firstTypedChat, setFirstTypedChat] = useState("");
  const [secondTypedChat, setSecondTypedChat] = useState("");
  const [firstChatIndex, setFirstChatIndex] = useState(0);
  const [secondChatIndex, setSecondChatIndex] = useState(0);

  useEffect(() => {
    setFirstTypedChat("");
    setSecondTypedChat("");
    setFirstChatIndex(0);
    setSecondChatIndex(0);
  }, [i18n.language]);

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
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className="select-none flex h-full justify-center md:justify-end items-center relative"
    >
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
        src={"/hero-phone.png"}
        alt="phone image"
      />
      <ChatCard
        className="select-none absolute flex items-start md:w-full w-48 -translate-x-12 -translate-y-12 md:-translate-x-1  md:-translate-y-16"
        text={firstTypedChat}
        img={"/hero-avatar1"}
        avatarFirst={true}
        name={t("landingPage.emily")}
        time="05:16 AM"
        borderRadius="rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-xl"
      />
      {firstChatIndex >= firstTextToType.length && (
        <ChatCard
          className="h-12 rounded-br-lg w-48 md:w-full md:h-max absolute flex items-start translate-y-14 md:translate-y-36"
          text={secondTypedChat}
          img={"/hero-avatar2"}
          avatarFirst={false}
          name={t("landingPage.mike")}
          time="10:23 AM"
          borderRadius="rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-xl"
        />
      )}
    </div>
  );
};

export default Conversation;
