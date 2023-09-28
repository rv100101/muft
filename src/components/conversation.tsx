import ChatCard from "./chatCard";
import heroPhone from "@/assets/hero-phone.png";
import heroAvatar1 from "@/assets/hero-avatar1.svg";
import heroAvatar2 from "@/assets/hero-avatar2.svg";
import { motion } from "framer-motion";

type FirstChat = {
  firstTypedChat: string;
  firstChatIndex: number;
  firstChatToType: string;
};

type SecondChat = {
  secondTypedChat: string;
};

const Conversation = ({
  firstChat,
  secondChat,
}: {
  firstChat: FirstChat;
  secondChat: SecondChat;
}) => {
  return (
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
        alt="phone image"
      />
      <ChatCard
        className="absolute flex items-start md:w-full w-48 -translate-x-12 -translate-y-12 md:-translate-x-1  md:-translate-y-16"
        text={firstChat.firstTypedChat}
        img={heroAvatar1}
        avatarFirst={true}
        name="Emily"
        time="05:16 AM"
        borderRadius="rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-xl"
      />
      {firstChat.firstChatIndex >= firstChat.firstChatToType.length && (
        <ChatCard
          className="h-12 rounded-br-lg w-48 md:w-full md:h-max absolute flex items-start translate-y-14 md:translate-y-36 md:translate-x-12 lg:translate-x-20"
          text={secondChat.secondTypedChat}
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
