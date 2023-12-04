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
import { useSenderInfo } from "@/zustand/messaging/senderData";
import { useUserStore } from "@/zustand/auth/user";
import { cn } from "@/lib/utils";

const ChatList = () => {
  const selectedHistoryMemberId = useLatestConversationStore(
    (state) => state.selectedHistoryMemberId,
  );
  const matches = useMediaQuery("(min-width: 640px)");
  const setConversation = useLatestConversationStore(
    (state) => state.setConversation,
  );
  const user = useUserStore((state) => state.user);
  const selectedConversation = useLatestConversationStore(
    (state) => state.conversation,
  );
  const setSelectedHistoryMemberId = useLatestConversationStore(
    (state) => state.setSelectedHistoryMemberId,
  );
  const setSenderUserInfo = useSenderInfo((state) => state.setInfo);
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => messagingQuery.getConversations(user!.member_id),
  });

  const searchFilterValue = useSearchFilterStore((state) => state.value);

  // This is used for page view switching in mobile view
  const updateMessagingPageView = useMobileMessagingViewStore(
    (state) => state.toggle,
  );

  useEffect(() => {
    if (!selectedConversation && data && data.length !== 0) {
      // setConversation(
      //   data[0].initiator_id,
      //   data[0].conversation_id,
      //   data[0].gallery_uuid,
      //   data[0].gender,
      //   data[0].recipient_uuid,
      //   data[0].recipient_nickname,
      //   data[0].conversation_uuid,
      // );
      setSenderUserInfo({
        conversation_history_id: data[0].conversation_id,
        conversation_text: "",
        created_date: data[0].created_date,
        created_user: data[0].initiator_id,
        nickname: data[0].initiator_nickname,
        gender: user!.gender!,
      });
    }
  }, [data, selectedConversation, setConversation, setSenderUserInfo, user]);

  const conversations = data
    ?.sort((a, b) => {
      const dateA: Date = new Date(a.created_date);
      const dateB: Date = new Date(b.created_date);
      return dateA.getTime() - dateB.getTime();
    })
    .filter((conversation) =>
      searchFilterValue.length === 0 ? true : conversation.recipient_nickname
        .toLowerCase()
        .includes(searchFilterValue.toLowerCase())
    ).filter((conversation) => {
      return conversation.recipient_id !== conversation.initiator_id;
    })
    .map((conversation, index) => {
      return (
        <li key={index}>
          <Button
            variant={"ghost"}
            className={cn(
              "w-full h-max items-start text-left",
              selectedHistoryMemberId === conversation.recipient_id &&
                "bg-accent",
            )}
            onClick={() => {
              if (!matches) {
                updateMessagingPageView();
              }
              console.log(conversation);

              setConversation(
                conversation.initiator_id,
                conversation.conversation_id,
                conversation.gallery_uuid,
                conversation.gender,
                conversation.recipient_uuid,
                conversation.recipient_nickname,
                conversation.conversation_uuid,
              );
              setSelectedHistoryMemberId(
                conversation.recipient_id,
              );
            }}
          >
            <img
              className="w-12 h-12 mr-2 object-cover rounded-full "
              src={getImagePath(
                conversation.gallery_uuid,
                conversation.gender,
                conversation.recipient_uuid,
              )}
              alt="user profile"
            />
            <div className="w-full flex flex-col justify-start">
              <div className="flex justify-between items-center w-full">
                <p className="font-semibold">
                  {conversation.recipient_nickname}
                </p>
                <p className="text-xs">
                  {moment(`${conversation.created_date}Z`).fromNow()}
                </p>
              </div>
            </div>
          </Button>
        </li>
      );
    });

  return (
    <ul className="space-y-1 overflow-y-scroll h-full p-1">
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
