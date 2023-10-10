import { cn } from "@/lib/utils";
import messagingQuery from "@/queries/messaging";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-with-locales-es6";
import { useEffect, useRef } from "react";
import ChatMessagesLoadingSkeleton from "./chatMessagesLoadingSkeleton";

const ChatMessages = () => {
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  const latestConversation = useLatestConversationStore(
    (state) => state.conversation
  );

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["notificationsList", latestConversation],
    enabled: latestConversation != null,
    queryFn: () =>
      messagingQuery.getConversationHistory(
        latestConversation!.conversationId,
        latestConversation!.memberId
      ),
  });

  useEffect(() => {
    // Scroll to the bottom of the scrollable div when the component mounts or updates
    if (scrollableDivRef.current) {
      const scrollableDiv = scrollableDivRef.current;
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  }, [data]);

  const messages = data?.map((message, index) => {
    const gray = message.created_user == latestConversation?.memberId;
    const date = moment(message.created_date).fromNow();

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
          <p className="text-sm">{message.conversation_text}</p>
        </div>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    );
  });

  return (
    <div
      ref={scrollableDivRef}
      className={cn(
        "h-full w-full space-y-4 overflow-y-scroll p-4 bg-[#F7F8FA]",
        isLoading && "bg-white"
      )}
    >
      {isLoading && <ChatMessagesLoadingSkeleton />}
      {isSuccess && data && messages}
    </div>
  );
};

export default ChatMessages;
