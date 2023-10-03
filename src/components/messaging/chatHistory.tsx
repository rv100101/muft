import ChatList from "./chatList";
import SearchInput from "../searchInput";
import TopBar from "../topBar";
import heroAvatar1 from "@/assets/hero-avatar1.png";

const ChatHistory = () => {
  return (
    <div className="space-y-4 w-full h-full">
      <div className="p-4 space-y-4">
        <TopBar>
          <div className="flex items-center space-x-2">
            <img className="h-8" src={heroAvatar1} alt="avatar" />
            <p className="font-semibold">John Doe</p>
          </div>
        </TopBar>
        <SearchInput />
      </div>
      <ChatList />
    </div>
  );
};

export default ChatHistory;
