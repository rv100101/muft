import chatHistoryData from "@/lib/dummies/chatHistoryData";
import { Button } from "../ui/button";

const ChatList = () => {
  const conversations = chatHistoryData.map((history, index) => {
    return (
      <Button
        variant={"ghost"}
        className="flex space-x-2 w-full h-max items-start justify-start text-left"
        key={index}
      >
        <div className="relative flex items-center">
          <img
            className="w-12 relative h-max rounded-full"
            src={history.image}
            alt="user profile"
          />
          <div className="w-2 h-2 bg-green-400 rounded-full absolute right-0 translate-y-3" />
        </div>

        <div className="w-full flex flex-col justify-start">
          <div className="flex justify-between items-center w-full">
            <p className="font-semibold">{history.name}</p>
            <p className="text-xs">{history.lastMessageTime}</p>
          </div>
          <p className="truncate text-xs font-light">{history.lastMessage}</p>
        </div>
      </Button>
    );
  });
  return <ul className="space-y-1">{conversations}</ul>;
};

export default ChatList;
