import { getImagePath } from "@/lib/images";
import { useUserAvatar } from "@/zustand/auth/avatar";
import { useUserStore } from "@/zustand/auth/user";
import TopBar2 from "../topBar2";
import { useUserNickname } from "@/zustand/auth/username";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const ChatMobileNav = () => {
  const [, i18n] = useTranslation();
  const user = useUserStore((state) => state.user);
  const userPhoto = useUserAvatar((state) => state.gallery_uuid);
  const nickname = useUserNickname((state) => state.nickname);
  return (
    <div className="lg:hidden">
      <TopBar2>
        <div className={cn("flex items-center space-x-2", i18n.language == "ar" && 'space-x-reverse')}>
          <img
            className="h-8 w-8 object-cover rounded-full"
            src={getImagePath(userPhoto, user?.gender, user?.member_uuid)}
            alt="avatar"
          />
          <p className="font-semibold">{nickname}</p>
        </div>
      </TopBar2>
    </div>
  );
};

export default ChatMobileNav;
