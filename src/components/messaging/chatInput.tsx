import { SendHorizonalIcon, XCircle } from "lucide-react"; // Add XCircle icon
import { Button } from "../ui/button";
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
import CollapsibleIcons from "../ui/messageColasible";
import Lottie from "lottie-react";
import animationData from "@/assets/messages/animation/happydog.json";

const ChatInput = () => {
  const [t] = useTranslation();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const currentSelectedConversation = useLatestConversationStore(
    (state) => state.conversation
  );
  const setSelectedConversation = useLatestConversationStore(
    (state) => state.setConversation
  );
  const [uuid, setUuid] = useState(
    currentSelectedConversation?.conversation_uuid
  );
  const [showAnimationDog, setShowAnimationDog] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
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
      const res = await messagingQuery.getConversation(
        user!.member_id,
        currentSelectedConversation!.memberId
      );

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
    const formData = new FormData();
    formData.append("conversation", newChatUuid ?? uuid!);
    formData.append("text", finalInputMessage);
    formData.append("member", user!.member_id.toString());

    // Append images to form data
    imageFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    return await messagingQuery.sendMessage(formData);
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
      // Clear imageFiles and imagePreviews after sending
      setImageFiles([]);
      setImagePreviews([]);
    },
    onError: () => {
      updateLastSentMessageStatus("failed");
    },
  });

  useEffect(() => {
    setInputMessage("");
  }, [currentSelectedConversation, setInputMessage]);

  const handleMessageSend = async () => {
    const message = inputMessageValue.trim();
    if (message.length !== 0) {
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
      setShowAnimationDog(false);
      setShowCloseButton(false);
      mutateConversation.mutate();
    } else {
      setInputMessage("");
    }
  };

  const handleCloseClick = () => {
    setShowAnimationDog(false);
    setShowCloseButton(false);
  };

  const handleImageRemove = (index: number) => {
    setImageFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
    setImagePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const { selectedMemberName } = useLatestConversationStore();

  useEffect(() => {
    // Create previews for selected files
    const previews: string[] = [];
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === imageFiles.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [imageFiles]);

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
          <div className="h-max w-full flex items-end justify-between sm:mb-4 mt-1">
            <div className="flex items-center mx-2">
              <CollapsibleIcons
                inputMessageValue={inputMessageValue}
                setInputMessage={setInputMessage}
                currentSelectedConversation={currentSelectedConversation}
                messageInput={messageInput}
                setShowAnimationDog={(value) => {
                  setShowAnimationDog(value);
                  setShowCloseButton(value);
                }}
                setImageFiles={setImageFiles} // Pass the handler
              />
            </div>
            <div className="relative flex-grow">
              <textarea
                ref={messageInput}
                className="focus:outline-none p-2 border-2 rounded-lg max-h-full overflow-y-auto caret-primary resize-none dark:text-white dark:bg-[#020817]"
                style={{ width: "75%" }} // Adjust the percentage or use px, em, etc.
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
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
              />
              <Button
                disabled={!currentSelectedConversation}
                onClick={handleMessageSend}
                className="absolute right-0 bottom-0 rounded-full flex h-max w-max hover:bg-transparent ml-4 px-2 mr-4"
              >
                {showAnimationDog && (
                  <>
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      className="absolute -top-14 -left-2 w-12 h-12 z-10"
                    />
                    {showCloseButton && (
                      <XCircle
                        className="absolute -top-16 -right-1 w-4 h-4 text-red-500 z-20 cursor-pointer"
                        onClick={handleCloseClick}
                      />
                    )}
                  </>
                )}
                <SendHorizonalIcon
              
                  height={16}
                  width={19}
                />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInput;
