import React, { useState } from "react";
import Gift from "@/assets/messages/gift.png";
import ImgAdd from "@/assets/messages/imgadd.png";
import CloseCircle from "@/assets/messages/circle-x.png";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ArrowRightCircle, SmileIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@radix-ui/react-dialog";
import Lottie from "lottie-react";
import animationData from "@/assets/messages/animation/happydog.json";
interface CollapsibleIconsProps {
  inputMessageValue: string;
  setInputMessage: (value: string) => void;
  currentSelectedConversation: any;
  messageInput: React.RefObject<HTMLTextAreaElement>;
}

const CollapsibleIcons: React.FC<CollapsibleIconsProps> = ({
  inputMessageValue,
  setInputMessage,
  currentSelectedConversation,
  messageInput,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [, setOpenSticker] = useState(false);

  const handleStickerClick = () => {
    // Append the URL or identifier of the sticker to the message input
    setOpenSticker(false);
    setOpenEmoji(false); // Close the emoji dialog
    setInputMessage(inputMessageValue + " [sticker:happy-dog]"); // Add a unique identifier for the sticker
    messageInput.current?.focus();
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-500 p-2 focus:outline-none"
      >
        <ArrowRightCircle
          className={`w-10 h-10 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {isOpen && (
        <div className="flex space-x-4 ml-4">
          <Dialog open={openEmoji} onOpenChange={setOpenEmoji}>
            <DialogTrigger
              className="hover:cursor-pointer"
              disabled={!currentSelectedConversation}
            >
              <SmileIcon className="text-primary" height={30} width={30} />
            </DialogTrigger>
            <DialogContent className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
              <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full">
                {/* Close Button */}
                <DialogClose className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                  <img
                    src={CloseCircle}
                    alt="img-add-icon"
                    className="hover:cursor-pointer"
                  />
                </DialogClose>

                {/* Sticker Section */}
                <div className="w-full mb-4 flex flex-col items-start">
                  <span className="font-bold text-gray-700 mb-2 block">
                    Select Sticker
                  </span>
                  <div className="border border-gray-300 rounded-lg p-4 w-full">
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      className="w-12 h-12 cursor-pointer"
                      onClick={handleStickerClick}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  {" "}
                  {/* Add padding top to avoid overlap */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Select Emoji</h2>
                  </div>
                  <EmojiPicker
                    onEmojiClick={(emoji: EmojiClickData) => {
                      setOpenEmoji(false);
                      setInputMessage(inputMessageValue + emoji.emoji);
                      messageInput.current?.focus();
                    }}
                    height={500}
                    width={"100%"}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <button className="text-blue-500 p-2 focus:outline-none">
            <img src={Gift} alt="gift-icon" className="hover:cursor-pointer" />
          </button>

          <button className="text-blue-500 p-2 focus:outline-none">
            <img
              src={ImgAdd}
              alt="img-add-icon"
              className="hover:cursor-pointer"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default CollapsibleIcons;
