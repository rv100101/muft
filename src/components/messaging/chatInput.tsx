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
const ChatInput = () => {
  const queryClient = useQueryClient();
  const setInputMessage = useMessageInputStore((state) => state.setInputValue);
  const inputMessageValue = useMessageInputStore((state) => state.value);
  const currentConversation = useConversationHistoryStore(
    (state) => state.conversation
  );

  console.log(currentConversation);

  const sendMessage = async () => {
    await messagingQuery.sendMessage(
      currentConversation!.conversation_uuid,
      inputMessageValue,
      currentConversation!.memberId
    );
  };

  const mutateConversation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["current-selected-conversation"],
      });
    },
  });

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
                  console.log(emoji);
                  setInputMessage(inputMessageValue + emoji.emoji);
                }}
                height={300}
                width={"100%"}
              />
            </PopoverContent>
          </Popover>
        </div>
        <textarea
          data-emojiable={true}
          disabled={mutateConversation.isLoading}
          value={inputMessageValue}
          name="text"
          rows={3}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          className="focus:outline-none p-2 w-full rounded-lg max-h-full overflow-y-auto caret-primary resize-none"
          placeholder="Type a message"
        />
      </div>
      <Button
        disabled={mutateConversation.isLoading}
        onClick={() => {
          mutateConversation.mutate();
        }}
        className="rounded-full h-max w-max hover:bg-transparen ml-4 px-2 mr-4 mb-4"
      >
        <SendHorizonalIcon height={16} />
      </Button>
    </div>
  );
};

export default ChatInput;
