import ChatList from "./chatList";
import SearchInput from "../searchInput";
import { useUserStore } from "@/zustand/auth/user";
import { getImagePath } from "@/lib/images";
import { useUserAvatar } from "@/zustand/auth/avatar";
import ChatMobileNav from "./chatMobileNav";

const ChatHistory = () => {
  const user = useUserStore((state) => state.user);
  const userPhoto = useUserAvatar((state) => state.gallery_uuid);
  return (
    <>
      <ChatMobileNav />
      <div className="space-y-2 w-full h-full">
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2 lg:flex hidden pl-2">
            <img
              className="h-8 w-8 object-cover rounded-full"
              src={getImagePath(userPhoto, user?.gender, user?.member_uuid)}
              alt="avatar"
            />
            <p className="font-semibold">{user?.first_name}</p>
          </div>
          <SearchInput />
        </div>
        <ChatList />
      </div>
    </>
  );
};

export default ChatHistory;
