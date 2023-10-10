import ChatList from "./chatList";
import SearchInput from "../searchInput";
import TopBar from "../topBar";
import { useUserStore } from "@/zustand/auth/user";
import { getImagePath } from "@/lib/images";
import { useUserAvatar } from "@/zustand/auth/avatar";

const ChatHistory = () => {
  const user = useUserStore((state) => state.user);
  const userPhoto = useUserAvatar((state) => state.gallery_uuid);
  return (
    <div className="space-y-4 w-full h-full">
      <div className="p-4 space-y-4">
        <TopBar>
          <div className="flex items-center space-x-2">
            <img
              className="h-8 rounded-full"
              src={getImagePath(userPhoto, user?.gender, user?.member_uuid)}
              alt="avatar"
            />
            <p className="font-semibold">{user?.first_name}</p>
          </div>
        </TopBar>
        <SearchInput />
      </div>
      <ChatList />
    </div>
  );
};

export default ChatHistory;
