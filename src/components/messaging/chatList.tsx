import { Button } from "../ui/button";
import useMobileMessagingViewStore from "@/zustand/messaging/mobileStateView";
import { useQuery } from "@tanstack/react-query";
import messagingQuery from "@/queries/messaging";
import { getImagePath } from "@/lib/images";
import moment from "moment-with-locales-es6";
import ChatListLoadingSkeleton from "./chatListLoadingSkeleton";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSearchFilterStore } from "@/zustand/messaging/searchFilter";

const ChatList = () => {
  const matches = useMediaQuery("(min-width: 640px)");
  const setConversation = useLatestConversationStore(
    (state) => state.setConversation
  );
  const selectedConversation = useLatestConversationStore(
    (state) => state.conversation
  );
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => messagingQuery.getConversations(69),
  });

  const searchFilterValue = useSearchFilterStore((state) => state.value);

  // This is used for page view switching in mobile view
  const updateMessagingPageView = useMobileMessagingViewStore(
    (state) => state.toggle
  );

  useEffect(() => {
    if (!selectedConversation && data && data.length !== 0) {
      setConversation(
        data[0].initiator_id,
        data[0].conversation_id,
        data[0].gallery_uuid,
        data[0].gender,
        data[0].recipient_uuid,
        data[0].recipient_nickname,
        data[0].conversation_uuid
      );
    }
  }, [data, selectedConversation, setConversation]);
  console.log(data);

  const conversations = data
    ?.sort((a, b) => {
      const dateA: Date = new Date(a.created_date);
      const dateB: Date = new Date(b.created_date);
      return dateA.getTime() - dateB.getTime();
    })
    .filter((conversation) =>
      searchFilterValue.length === 0
        ? true
        : conversation.recipient_nickname
            .toLowerCase()
            .includes(searchFilterValue.toLowerCase())
    )
    .map((conversation, index) => {
      return (
        <li key={index}>
          <Button
            variant={"ghost"}
            className="flex space-x-2 w-full h-max items-start justify-start text-left"
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
                conversation.recipient_nickname,
                conversation.conversation_uuid
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
