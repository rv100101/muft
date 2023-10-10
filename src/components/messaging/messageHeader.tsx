// import { buttons } from "@/lib/chatButtons";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import useMobileMessagingViewStore from "@/zustand/messaging/mobileStateView";
import useConversationHistoryStore from "@/zustand/messaging/showConversation";
import { getImagePath } from "@/lib/images";
const MessageHeader = () => {
  const updateMessagingPageView = useMobileMessagingViewStore(
    (state) => state.toggle
  );

  const currentConversationData = useConversationHistoryStore(
    (state) => state.conversation
  );

  // const links = buttons.map((button, index) => (
  //   <Button size={"sm"} key={index} variant={"ghost"}>
  //     {<button.icon />}
  //   </Button>
  // ));
  console.log(currentConversationData);

  return (
    <div className="flex justify-between h-max items-center border-b p-2">
      <div className="flex w-full h-full items-center space-x-2">
        <Button
          variant={"ghost"}
          className="sm:hidden p-0 hover:bg-transparent"
          onClick={updateMessagingPageView}
        >
          <ArrowLeftIcon />
        </Button>
        <img
          className="rounded-full max-h-8 object-cover"
          src={getImagePath(
            currentConversationData?.gallery_uuid,
            currentConversationData?.gender,
            currentConversationData?.recipient_uuid
          )}
          alt="avatar"
        />
        <p className="font-semibold">{currentConversationData?.username}</p>
      </div>
      {/* <div className="flex sm:space-x-2 items-center">{links}</div> */}
    </div>
  );
};

export default MessageHeader;
