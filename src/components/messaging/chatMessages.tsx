import chatMessages from "@/lib/dummies/chatMessagesData";
import { cn } from "@/lib/utils";

const ChatMessages = () => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
  } as const;

  const user = "John Doe";
  const messages = chatMessages.map((message, index) => {
    const gray = message.sender.toLowerCase() == user.toLowerCase();
    const date = new Date(message.timestamp);
    const formattedDate = date.toLocaleString("en-US", options);
    return (
      <div
        className={cn(
          "flex flex-col w-full space-y-1",
          gray ? "items-start" : "items-end"
        )}
        key={index}
      >
        <div
          className={cn(
            "p-4 rounded-lg",
            gray
              ? "items-start bg-[#E8ECEF]"
              : "items-end bg-primary text-white"
          )}
        >
          <p className="text-sm">{message.message}</p>
        </div>
        <p className="text-xs text-gray-500">{formattedDate}</p>
      </div>
    );
  });

  return (
    <div className="h-full w-full space-y-4 overflow-y-scroll p-4 bg-[#F7F8FA]">
      {messages}
    </div>
  );
};

export default ChatMessages;
