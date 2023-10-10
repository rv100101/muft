import { Button } from "../ui/button";
import useMobileMessagingViewStore from "@/zustand/messaging/mobileStateView";
import { useQuery } from "@tanstack/react-query";
import messagingQuery from "@/queries/messaging";
import { getImagePath } from "@/lib/images";
import moment from "moment-with-locales-es6";
import ChatListLoadingSkeleton from "./chatListLoadingSkeleton";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { useEffect } from "react";
import { useUserStore } from "@/zustand/auth/user";
import { useMediaQuery } from "usehooks-ts";

const ChatList = () => {
  const matches = useMediaQuery("(min-width: 640px)");
  const user = useUserStore((state) => state.user);
  const setConversation = useLatestConversationStore(
    (state) => state.setConversation
  );
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => messagingQuery.getConversations(69),
  });

  console.log(user);

  // This is used for page view switching in mobile view
  const updateMessagingPageView = useMobileMessagingViewStore(
    (state) => state.toggle
  );

  useEffect(() => {
    if (data && data.length !== 0) {
      setConversation(
        data[0].initiator_id,
        data[0].conversation_id,
        data[0].gallery_uuid,
        data[0].gender,
        data[0].recipient_uuid,
        data[0].recipient_nickname
      );
    }
  }, [data, setConversation]);

  const conversations = data
    ?.sort((a, b) => {
      const dateA: Date = new Date(a.created_date);
      const dateB: Date = new Date(b.created_date);
      return dateA.getTime() - dateB.getTime();
    })
    .map((conversation, index) => {
      return (
        <li key={index}>
          <Button
            variant={"ghost"}
            className="flex space-x-2 w-full h-max items-start justify-start text-left"
            key={index}
            onClick={() => {
              if (!matches) {
                updateMessagingPageView();
              }
              setConversation(
                conversation.initiator_id,
                conversation.conversation_id,
                conversation.gallery_uuid,
                conversation.gender,
                conversation.recipient_uuid,
                conversation.recipient_nickname
              );
            }}
          >
            <div className="relative flex items-center">
              <img
                className="w-12 relative h-max rounded-full"
                src={getImagePath(
                  conversation.gallery_uuid,
                  conversation.gender,
                  conversation.recipient_uuid
                )}
                alt="user profile"
              />
              {/* <div className="w-2 h-2 bg-green-400 rounded-full absolute right-0 translate-y-3" /> */}
            </div>

            <div className="w-full flex flex-col justify-start">
              <div className="flex justify-between items-center w-full">
                <p className="font-semibold">
                  {conversation.recipient_nickname}
                </p>
                <p className="text-xs">
                  {moment(conversation.created_date).fromNow()}
                </p>
              </div>
            </div>
          </Button>
        </li>
      );
    });

  return (
    <ul className="space-y-1 overflow-y-auto">
      {isSuccess && conversations}
      {isLoading && <ChatListLoadingSkeleton />}
      {!isLoading && conversations?.length == 0 && (
        <li className="h-full w-full flex items-center justify-center">
          <h1>No conversations</h1>
        </li>
      )}
    </ul>
  );
};

export default ChatList;
