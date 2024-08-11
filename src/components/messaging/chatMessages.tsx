import { cn } from "@/lib/utils";
import messagingQuery from "@/queries/messaging";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-with-locales-es6";
import { useEffect, useRef, useState } from "react";
import ChatMessagesLoadingSkeleton from "./chatMessagesLoadingSkeleton";
import { useSelectedConversationData } from "@/zustand/messaging/selectedConversationData";
import { useUserStore } from "@/zustand/auth/user";
import { useUserAvatar } from "@/zustand/auth/avatar";
import { getImagePath } from "@/lib/images";
import useConversationHistoryStore from "@/zustand/messaging/showConversation";
import animationDog from "@/assets/messages/animation/happydog.json";
import Lottie from "lottie-react";

// Utility function to check if a URL is an image
const isImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: { Accept: "image/*" },
    });
    return (
      (response.ok &&
        response.headers.get("Content-Type")?.startsWith("image/")) ||
      false
    );
  } catch {
    return false;
  }
};

const ChatMessages = () => {
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const user = useUserStore((state) => state.user);
  const selectedHistoryMemberId = useLatestConversationStore(
    (state) => state.selectedHistoryMemberId
  );
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
    refetchIntervalInBackground: true,
    queryFn: fetchMessages,
  });

  useEffect(() => {
    if (data) {
      setConversationMessages(data);
    }
  }, [data, setConversationMessages]);

  useEffect(() => {
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

  const userPhoto = useUserAvatar((state) => state.gallery_uuid);
  const currentConversationData = useConversationHistoryStore(
    (state) => state.conversation
  );

  const [imageValidationResults, setImageValidationResults] = useState<
    Map<string, boolean>
  >(new Map());

  useEffect(() => {
    const validateImages = async () => {
      const results = new Map<string, boolean>();

      if (conversationMessages) {
        const urls = conversationMessages
          .map((message) => {
            const matches = message.conversation_text.match(/\[(.*?)\]/);
            return matches ? matches[1].trim() : null;
          })
          .filter((url): url is string => url !== null);

        await Promise.all(
          urls.map(async (url) => {
            results.set(url, await isImageUrl(url));
          })
        );

        setImageValidationResults(results);
      }
    };

    validateImages();
  }, [conversationMessages]);

  const messages = conversationMessages?.map((message, index) => {
    const gray = message.created_user == user!.member_id;
    let date = moment(message.created_date, moment.ISO_8601, true).isValid()
      ? `${message.created_date}Z`
      : "isLoading";

    if (date !== "isLoading" && date !== "failed") {
      date = moment(date).fromNow();
    }

    const content = (() => {
      const matches = message.conversation_text.match(/\[(.*?)\]/);
      if (matches) {
        const extractedValue = matches[1].trim();
        const isImage = imageValidationResults.get(extractedValue);

        if (isImage === undefined) {
          // Loading state or placeholder
          return <p>Loading...</p>;
        }

        if (isImage) {
          return (
            <img
              src={extractedValue}
              alt="message content"
              className="max-w-full h-auto rounded-lg"
            />
          );
        } else {
          return <p className="text-sm">{`[${extractedValue}]`}</p>;
        }
      }

      if (message.conversation_text.includes("[sticker:happy-dog]")) {
        return <Lottie animationData={animationDog} className="w-16 h-16" />;
      }

      return (
        <p
          dir="ltr"
          className={cn(
            "p-4 rounded-lg text-sm",
            gray ? "bg-[#E8ECEF] dark:bg-slate-800" : "bg-primary text-white"
          )}
        >
          {message.conversation_text}
        </p>
      );
    })();

    return (
      <div className={cn("w-full space-y-1 ")} key={index}>
        <div
          className={cn(
            "flex space-x-2 w-full",
            !gray ? "justify-start " : "justify-end"
          )}
        >
          {!gray && (
            <Link
              href={
                selectedHistoryMemberId
                  ? `/members/${selectedHistoryMemberId}`
                  : ""
              }
            >
              <img
                className="hover:cursor-pointer rounded-full w-8 max-h-8 object-cover"
                src={getImagePath(
                  currentConversationData?.gallery_uuid,
                  currentConversationData?.gender,
                  currentConversationData?.recipient_uuid
                )}
                alt="avatar"
              />
            </Link>
          )}
          <div
            className={cn(
              "flex flex-col space-y-1",
              gray ? "items-end" : "items-start"
            )}
          >
            {content}
            {date === "isLoading" && (
              <p dir="ltr" className={cn("text-xs text-gray-500")}>
                Sending...
              </p>
            )}
            {date === "failed" && (
              <p className={cn("text-xs text-red-500")}>
                Failed to send message
              </p>
            )}
            {date !== "isLoading" && date !== "failed" && (
              <p dir="ltr" className={cn("text-xs text-gray-500")}>
                {date}
              </p>
            )}
          </div>
          {gray && (
            <img
              alt="avatar"
              className="object-fit h-8 w-8"
              src={getImagePath(userPhoto, user?.gender, user?.member_uuid)}
            />
          )}
        </div>
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
