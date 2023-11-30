import { SendHorizonalIcon, SmileIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useMessageInputStore } from "@/zustand/messaging/messageInput";
import messagingQuery from "@/queries/messaging";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelectedConversationData } from "@/zustand/messaging/selectedConversationData";
import { useSenderInfo } from "@/zustand/messaging/senderData";
import { useEffect, useState } from "react";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { toast } from "../ui/use-toast";
import { useUserStore } from "@/zustand/auth/user";
const ChatInput = () => {
  const currentSelectedConversation = useLatestConversationStore(
    (state) => state.conversation,
  );
  const setSelectedConversation = useLatestConversationStore(
    (state) => state.setConversation,
  );
  const [uuid, setUuid] = useState(
    currentSelectedConversation?.conversation_uuid,
  );
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const setInputMessage = useMessageInputStore((state) => state.setInputValue);
  const inputMessageValue = useMessageInputStore((state) => state.value);
  const [finalInputMessage, setfinalInputMessage] = useState(inputMessageValue);
  const updateLastSentMessageStatus = useSelectedConversationData(
    (status) => status.updateMessageStatus,
  );
  const senderInfo = useSenderInfo((state) => state.senderInfo);

  const appendNewMessage = useSelectedConversationData(
    (state) => state.appendNewMessage,
  );

  useEffect(
    () => {
      setUuid(currentSelectedConversation?.conversation_uuid);
    },
    [currentSelectedConversation],
  );

  const getConversationUuid = async () => {
    try {
      console.log(
        user!.member_id,
        currentSelectedConversation!.memberId,
      );

      const res: {
        data: {
          recipient_id: number;
          conversation_id: number;
          gallery_uuid: string;
          gender: string;
          recipient_uuid: string;
          recipient_nickname: string;
          conversation_uuid: string;
        };
      } = await messagingQuery.getConversation(
        user!.member_id,
        currentSelectedConversation!.memberId,
      );
      // setUuid(res.data.conversation_uuid);
      console.log();

      setSelectedConversation(
        user!.member_id,
        res.data.conversation_id,
        res.data.gallery_uuid,
        res.data.gender,
        res.data.recipient_uuid,
        res.data.recipient_nickname,
        res.data.conversation_uuid,
      );

      return res.data.conversation_uuid;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cannot create new conversation",
      });
      return null;
    }
  };

  useEffect(() => {
    if ( user && currentSelectedConversation &&
      user!.member_id !==
        currentSelectedConversation!.memberId
    ) {
      getConversationUuid();
    }
  }, []);

  const sendMessage = async () => {
    console.log(currentSelectedConversation);
    let newChatUuid = null;
    // if (currentSelectedConversation?.conversation_uuid.length === 0) {
    //   newChatUuid = await getConversationUuid();
    // }

    console.log(newChatUuid);

    await messagingQuery.sendMessage(
      newChatUuid ?? uuid!,
      finalInputMessage,
      user!.member_id,
    );
  };

  // const sendNewConversationFirstMessage = async () => {
  //   await messagingQuery.newConversation(
  //     currentConversation!.conversation_uuid,
  //     finalInputMessage,
  //     currentConversation!.memberId,
  //   );
  // };

  const mutateConversation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-selected-conversation"],
      });
    },
    onError: () => {
      console.log("failed to send message");
      updateLastSentMessageStatus("failed");
    },
  });

  useEffect(() => {
    setInputMessage("");
  }, [currentSelectedConversation, setInputMessage]);

  const handleMessageSend = async () => {
    console.log(senderInfo, inputMessageValue);

    if (inputMessageValue.length !== 0) {
      console.log("here");

      // if (senderInfo === null) {
      //
      // }

      if (senderInfo) {
        appendNewMessage({
          ...senderInfo,
          conversation_text: inputMessageValue,
          created_date: "isLoading",
        });
      }

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
