import ChatList from "./chatList";
import SearchInput from "../searchInput";
import { useUserStore } from "@/zustand/auth/user";
import { getImagePath } from "@/lib/images";
import { useUserAvatar } from "@/zustand/auth/avatar";
import ChatMobileNav from "./chatMobileNav";
import { useUserNickname } from "@/zustand/auth/username";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
// import { useSenderInfo } from "@/zustand/messaging/senderData";

const ChatHistory = () => {
  const [, i18n] = useTranslation();
  const user = useUserStore((state) => state.user);
  const userPhoto = useUserAvatar((state) => state.gallery_uuid);
  const nickname = useUserNickname((state) => state.nickname);
  return (
    <div className="h-screen">
      <ChatMobileNav />
      <div className="w-full h-full flex flex-col">
        <div className="h-min p-4 space-y-4">
          <div
            className={cn(
              "items-center h-min space-x-2 lg:flex hidden pl-2",
              i18n.language == "ar" && "space-x-reverse"
            )}
          >
            <img
              className="h-8 w-8 object-cover rounded-full"
              src={getImagePath(userPhoto, user?.gender, user?.member_uuid)}
              alt="avatar"
            />
            <p className="font-semibold">{nickname}</p>
          </div>
          <div className="h-min">
            <SearchInput />
          </div>
        </div>
        <ChatList />
      </div>
    </div>
  );
};

export default ChatHistory;
