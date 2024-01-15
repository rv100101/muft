import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

const ChatCard = ({
  img,
  text,
  className,
  avatarFirst,
  name,
  time,
  borderRadius,
}: {
  img: string;
  text: string;
  className: string;
  avatarFirst: boolean;
  name: string;
  time: string;
  borderRadius: string;
}) => {
  const [location] = useLocation();
  const isAuthPage = location.includes("/auth/");
  const [, i18n] = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: avatarFirst ? (isAuthPage ? 1 : 3) : 0.5 }}
      className={cn(
        className,
        "space-x-2 md:space-x-4",
        i18n.language == "ar"
          ? "space-x-reverse md:-translate-x-12 lg:-translate-x-20"
          : "md:translate-x-12 lg:translate-x-20"
      )}
      viewport={{ once: true }}
    >
      {avatarFirst && <img width={36} src={img} alt="chat avatar" />}
      <div
        className={cn(
          "space-y-2 w-48 md:w-96 bg-white p-4 font-normal md:h-max md:whitespace-normal",
          borderRadius,
          i18n.language == "ar" ? "text-right" : "text-left"
        )}
      >
        <div className="flex justify-between">
          <p className="text-[#CF6AA4] font-bold text-xs md:text-base">
            {name}
          </p>
          <p dir="ltr" className="text-xs text-[#C9C3F6]">
            {time}
          </p>
        </div>
        <p className="text-[#33196B] text-xs font-semibold truncate md:h-max md:whitespace-normal">
          {text}
        </p>
      </div>
      {!avatarFirst && <img width={36} src={img} alt="chat avatar" />}
    </motion.div>
  );
};

export default ChatCard;
