import ChatList from "./chatList";
import SearchInput from "./searchInput";
import TopBar from "./topBar";

const ChatHistory = () => {
  return (
    <div className="space-y-4 w-full h-full">
      <div className="p-4 space-y-4">
        <TopBar />
        <SearchInput />
      </div>
      <ChatList />
    </div>
  );
};

export default ChatHistory;
