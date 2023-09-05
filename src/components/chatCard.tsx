import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={cn(className, "space-x-2 md:space-x-4")}
    >
      {avatarFirst && <img width={36} src={img} alt="chat avatar" />}
      <div
        className={cn(
          "space-y-2 text-left w-48 md:w-96 bg-white p-4 font-normal md:h-max md:whitespace-normal",
          borderRadius
        )}
      >
        <div className="flex justify-between">
          <p className="text-[#CF6AA4] font-bold text-xs md:text-base">
            {name}
          </p>
          <p className="text-xs text-[#C9C3F6]">{time}</p>
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
