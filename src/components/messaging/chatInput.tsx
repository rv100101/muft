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
import { useEffect, useRef, useState } from "react";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { toast } from "../ui/use-toast";
import { useUserStore } from "@/zustand/auth/user";
import { useTranslation } from "react-i18next";
const ChatInput = () => {
  const [t] = useTranslation();

  const currentSelectedConversation = useLatestConversationStore(
    (state) => state.conversation
  );
  const setSelectedConversation = useLatestConversationStore(
    (state) => state.setConversation
  );
  const [uuid, setUuid] = useState(
    currentSelectedConversation?.conversation_uuid
  );
  const [openEmoji, setOpenEmoji] = useState(false);
  const messageInput = useRef<HTMLTextAreaElement>(null);
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const setInputMessage = useMessageInputStore((state) => state.setInputValue);
  const inputMessageValue = useMessageInputStore((state) => state.value);
  const [finalInputMessage, setfinalInputMessage] = useState(inputMessageValue);
  const updateLastSentMessageStatus = useSelectedConversationData(
    (status) => status.updateMessageStatus
  );
  const senderInfo = useSenderInfo((state) => state.senderInfo);

  const appendNewMessage = useSelectedConversationData(
    (state) => state.appendNewMessage
  );

  useEffect(() => {
    setUuid(currentSelectedConversation?.conversation_uuid);
  }, [currentSelectedConversation]);

  const getConversationUuid = async () => {
    if (!currentSelectedConversation) {
      return;
    }

    try {
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
        currentSelectedConversation!.memberId
      );
      // setUuid(res.data.conversation_uuid);

      setSelectedConversation(
        user!.member_id,
        res.data.conversation_id,
        res.data.gallery_uuid,
        res.data.gender,
        res.data.recipient_uuid,
        res.data.recipient_nickname,
        res.data.conversation_uuid
      );

      return res.data.conversation_uuid;
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("alerts.cannotCreateConversation"),
      });
      return null;
    }
  };

  useEffect(() => {
    if (
      user &&
      currentSelectedConversation &&
      user!.member_id !== currentSelectedConversation!.memberId
    ) {
      getConversationUuid();
    }
  }, []);

  const sendMessage = async () => {
    const newChatUuid = null;
    await messagingQuery.sendMessage(
      newChatUuid ?? uuid!,
      finalInputMessage,
      user!.member_id
    );
  };

  const mutateConversation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-selected-conversation"],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
    onError: () => {
      updateLastSentMessageStatus("failed");
    },
  });

  useEffect(() => {
    setInputMessage("");
  }, [currentSelectedConversation, setInputMessage]);

  const handleMessageSend = async () => {
    if (inputMessageValue.length !== 0) {
      if (senderInfo) {
        appendNewMessage({
          ...senderInfo,
          created_user: user!.member_id,
          conversation_text: inputMessageValue,
          created_date: "isLoading",
        });
      }
      setfinalInputMessage(inputMessageValue);
      setInputMessage("");
      mutateConversation.mutate();
    }
  };

  const { selectedMemberName } = useLatestConversationStore();
  return (
    <div className="flex w-full items-end rounded-lg h-max bg-[#F7F8FA] dark:text-white dark:bg-[#020817] pb-4 sm:pb-0">
      {selectedMemberName.length > 1 && user?.temporarily_deactivated ? (
        <p className="w-full flex justify-center text-red-700 m-8">
          You must Reactivate your account To continue chatting with
          <span className="ml-1 text-primary">{selectedMemberName}.</span>
        </p>
      ) : !currentSelectedConversation ? (
        <></>
      ) : (
        <>
          <div className="h-max w-full flex items-end justify-start sm:mb-4 mt-1">
            <div className="flex flex-col items-center justify-center mx-2">
              {currentSelectedConversation ? (
                <Popover
                  open={openEmoji}
                  onOpenChange={(val) => {
                    setOpenEmoji(val);
                  }}
                >
                  <PopoverTrigger
                    className="hover:cursor-pointer"
                    disabled={!currentSelectedConversation}
                  >
                    <SmileIcon className="text-primary" height={28} width={28} />
                  </PopoverTrigger>
                  <PopoverContent>
                    <EmojiPicker
                      onEmojiClick={(emoji: EmojiClickData) => {
                        setOpenEmoji(false);
                        setInputMessage(inputMessageValue + emoji.emoji);
                        messageInput.current?.focus();
                      }}
                      height={300}
                      width={"100%"}
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <SmileIcon className="text-gray-500 flex-shrink-0" height={28} width={28} />
              )}
            </div>
            <textarea
              ref={messageInput}
              className="focus:outline-none p-2 w-full border-2 rounded-lg max-h-full overflow-y-auto caret-primary resize-none dark:text-white dark:bg-[#020817]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleMessageSend();
                }
              }}
              disabled={!currentSelectedConversation}
              data-emojiable={true}
              value={inputMessageValue}
              name="text"
              rows={3}
              onChange={(e) => {
                setInputMessage(e.target.value);
              }}
              placeholder={t("messages.typeAMessage")}
            />{" "}
            <Button
              disabled={!currentSelectedConversation}
              onClick={handleMessageSend}
              className="rounded-full flex h-max w-max hover:bg-transparen ml-4 px-2 mr-4"
            >
              <SendHorizonalIcon className="flex-shrink-0" height={16} width={19} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInput;
