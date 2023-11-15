import { SendHorizonalIcon, SmileIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useMessageInputStore } from "@/zustand/messaging/messageInput";
import useConversationHistoryStore from "@/zustand/messaging/showConversation";
import messagingQuery from "@/queries/messaging";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelectedConversationData } from "@/zustand/messaging/selectedConversationData";
import { useSenderInfo } from "@/zustand/messaging/senderData";
import { useEffect, useState } from "react";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
const ChatInput = () => {
  const currentSelectedConversation = useLatestConversationStore(
    (state) => state.conversation
  );
  const queryClient = useQueryClient();
  const setInputMessage = useMessageInputStore((state) => state.setInputValue);
  const inputMessageValue = useMessageInputStore((state) => state.value);
  const [finalInputMessage, setfinalInputMessage] = useState(inputMessageValue);
  const currentConversation = useConversationHistoryStore(
    (state) => state.conversation,
  );
  const updateLastSentMessageStatus = useSelectedConversationData(
    (status) => status.updateMessageStatus,
  );
  const senderInfo = useSenderInfo((state) => state.senderInfo);

  const appendNewMessage = useSelectedConversationData(
    (state) => state.appendNewMessage,
  );

  const sendMessage = async () => {
    await messagingQuery.sendMessage(
      currentConversation!.conversation_uuid,
      finalInputMessage,
      currentConversation!.memberId,
    );
  };

  const mutateConversation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      console.log("invalidated");
      queryClient.invalidateQueries({
        queryKey: ["current-selected-conversation"],
      });
    },
    onError: () => {
      console.log("failed to send message");
      updateLastSentMessageStatus("failed");
    },
  });

  useEffect(()=>{
    setInputMessage('');
  }, [currentSelectedConversation, setInputMessage]);

  const handleMessageSend = () => {
    if (senderInfo && inputMessageValue.length !== 0) {
      appendNewMessage({
        ...senderInfo,
        conversation_text: inputMessageValue,
        created_date: "isLoading",
      });
      setfinalInputMessage(inputMessageValue);
      setInputMessage("");
      mutateConversation.mutate();
    }
  };

  return (
    <div className="flex w-full items-end rounded-lg h-max bg-[#F7F8FA]">
      <div className="h-max w-full flex items-end justify-start mb-4 mt-1">
        <div className="flex flex-col items-center justify-center mx-2 ">
          <Popover>
            <PopoverTrigger>
              <SmileIcon className="text-primary" />
            </PopoverTrigger>
            <PopoverContent>
              <EmojiPicker
                onEmojiClick={(emoji: EmojiClickData) => {
                  setInputMessage(inputMessageValue + emoji.emoji);
                }}
                height={300}
                width={"100%"}
              />
            </PopoverContent>
          </Popover>
        </div>
        <textarea
          className="focus:outline-none p-2 w-full border-2 rounded-lg max-h-full overflow-y-auto caret-primary resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleMessageSend();
            }
          }}
          data-emojiable={true}
          value={inputMessageValue}
          name="text"
          rows={3}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          placeholder="Type a message"
        />
      </div>
      <Button
        onClick={handleMessageSend}
        className="rounded-full h-max w-max hover:bg-transparen ml-4 px-2 mr-4 mb-4"
      >
        <SendHorizonalIcon height={16} />
      </Button>
    </div>
  );
};

export default ChatInput;
