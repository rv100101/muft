import { cn } from "@/lib/utils";
import messagingQuery from "@/queries/messaging";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-with-locales-es6";
import { useEffect, useRef } from "react";
import ChatMessagesLoadingSkeleton from "./chatMessagesLoadingSkeleton";
import { useSelectedConversationData } from "@/zustand/messaging/selectedConversationData";
import { useUserStore } from "@/zustand/auth/user";
const ChatMessages = () => {
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const user = useUserStore((state) => state.user);
  const latestConversation = useLatestConversationStore(
    (state) => state.conversation
  );
  const conversationMessages = useSelectedConversationData(
    (state) => state.messages
  );
  const setConversationMessages = useSelectedConversationData(
    (state) => state.setMessages
  );

  const fetchMessages = async () => {
    return await messagingQuery.getConversationHistory(
      latestConversation!.conversationId,
      latestConversation!.memberId
    );
  };

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["current-selected-conversation", latestConversation],
    enabled: latestConversation != null,
    // refetchInterval: 500,
    refetchIntervalInBackground: true,
    queryFn: fetchMessages,
  });

  useEffect(() => {
    if (data) {
      setConversationMessages(data);
    }
  }, [data, setConversationMessages]);

  useEffect(() => {
    // Scroll to the bottom of the scrollable div when the component mounts or updates
    if (scrollableDivRef.current) {
      const scrollableDiv = scrollableDivRef.current;
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  }, [data, conversationMessages]);

  useEffect(() => {
    const conversationHistory = async () => {
      await messagingQuery.getConversationHistory(630, user!.member_id);
    };

    if (
      conversationMessages !== null &&
      conversationMessages.length !== 0 &&
      conversationMessages![conversationMessages!.length - 1] &&
      conversationMessages![conversationMessages!.length - 1].created_user !==
      user!.member_id
    ) {
      conversationHistory();
    }
  }, [conversationMessages, user]);

  const messages = conversationMessages?.map((message, index) => {
    const gray = message.created_user == user!.member_id;
    let date = moment(message.created_date, moment.ISO_8601, true).isValid()
      ? `${message.created_date}Z`
      : "isLoading";

    if (date !== "isLoading" && date !== "failed") {
      date = moment(date).fromNow();
    }

    // if (date == "failed") {
    // }

    return (
      <div
        className={cn(
          "flex flex-col w-full space-y-1 ",
          gray ? "items-end" : "items-start"
        )}
        key={index}
      >
        <div
          className={cn(
            "p-4 rounded-lg",
            gray
              ? "items-start bg-[#E8ECEF] dark:bg-slate-800"
              : "items-end bg-primary text-white"
          )}
        >
          <p dir="ltr" className="text-sm">{message.conversation_text}</p>
        </div>
        {date === "isLoading" && (
          <p dir="ltr" className={cn("text-xs text-gray-500")}>Sending...</p>
        )}
        {date === "failed" && (
          <p className={cn("text-xs text-red-500")}>Failed to send message</p>
        )}
        {date !== "isLoading" && date !== "failed" && (
          <p dir="ltr" className={cn("text-xs text-gray-500")}>{date}</p>
        )}
      </div>
    );
  });

  return (
    <div
      ref={scrollableDivRef}
      className={cn(
        "h-full w-full space-y-4 overflow-y-auto no-scrollbar p-4 bg-[#F7F8FA] dark:text-white dark:bg-[#020817]",
        isLoading && "bg-white",
        !latestConversation && "bg-[#F7F8FA] overflow-y-auto"
      )}
    >
      {latestConversation && isLoading && <ChatMessagesLoadingSkeleton />}
      {isSuccess && data && messages}
    </div>
  );
};

export default ChatMessages;
