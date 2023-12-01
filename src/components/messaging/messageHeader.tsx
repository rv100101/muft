// import { buttons } from "@/lib/chatButtons";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import useMobileMessagingViewStore from "@/zustand/messaging/mobileStateView";
import useConversationHistoryStore from "@/zustand/messaging/showConversation";
import { getImagePath } from "@/lib/images";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { Link } from "wouter";
const MessageHeader = () => {
  const selectedHistoryMemberId = useLatestConversationStore(
    (state) => state.selectedHistoryMemberId,
  );
  const updateMessagingPageView = useMobileMessagingViewStore(
    (state) => state.toggle,
  );
  const currentConversationData = useConversationHistoryStore(
    (state) => state.conversation,
  );

  // const links = buttons.map((button, index) => (
  //   <Button size={"sm"} key={index} variant={"ghost"}>
  //     {<button.icon />}
  //   </Button>
  // ));
  // console.log(currentConversationData);

  return (
    <div className="flex justify-between h-max w-full items-center border-b p-2">
      <div className="flex h-full items-center space-x-2">
        <Button
          variant={"ghost"}
          className="sm:hidden p-0 hover:bg-transparent"
          onClick={updateMessagingPageView}
        >
          <ArrowLeftIcon />
        </Button>
        <Link href={selectedHistoryMemberId ? `/members/${selectedHistoryMemberId}` : ''}>
          <img
            className="hover:cursor-pointer rounded-full w-8 max-h-8 object-cover"
            src={getImagePath(
              currentConversationData?.gallery_uuid,
              currentConversationData?.gender,
              currentConversationData?.recipient_uuid,
            )}
            alt="avatar"
          />
        </Link>
        <p className="font-semibold">{currentConversationData?.username}</p>
      </div>
      <Link href={`/members/${selectedHistoryMemberId}`}>
        <Button disabled={!selectedHistoryMemberId} className="w-max text-xs hover:bg-[#FF8AB3]">
          View Profile
        </Button>
      </Link>
    </div>
  );
};

export default MessageHeader;
