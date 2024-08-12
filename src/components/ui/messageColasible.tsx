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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /* eslint-disable @typescript-eslint/no-explicit-any */
  currentSelectedConversation: any;
  messageInput: React.RefObject<HTMLTextAreaElement>;
  setShowAnimationDog: (value: boolean) => void;
  setImageFiles: (files: File[]) => void;
}

const CollapsibleIcons: React.FC<CollapsibleIconsProps> = ({
  inputMessageValue,
  setInputMessage,
  currentSelectedConversation,
  messageInput,
  setShowAnimationDog,
  setImageFiles,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [, setOpenSticker] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleStickerClick = () => {
    setOpenSticker(false);
    setOpenEmoji(false);
    setShowAnimationDog(true);
    setInputMessage(inputMessageValue + " >sticker:happy-dog<");
    messageInput.current?.focus();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImageFiles(files);

    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleImageRemove = (url: string) => {
    setUploadedImages((prevImages) => prevImages.filter((img) => img !== url));
  };

  return (
    <div className="flex flex-col">
      {/* Image preview section */}
      {uploadedImages.length > 0 && (
        <div className="flex overflow-x-auto space-x-2 p-2 mb-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`uploaded-img-${index}`}
                className="w-14 h-14 object-cover"
              />
              <button
                onClick={() => handleImageRemove(image)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Collapsible menu */}
      <div className="flex items-center justify-start">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-500 p-2 focus:outline-none"
        >
          <ArrowRightCircle
            className={`w-10 h-10 transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
        {isOpen && (
          <div className="flex space-x-4 ml-2">
            <Dialog open={openEmoji} onOpenChange={setOpenEmoji}>
              <DialogTrigger
                className="hover:cursor-pointer flex items-center justify-center ml-1"
                disabled={!currentSelectedConversation}
              >
                <SmileIcon className="text-primary" height={30} width={29} />
              </DialogTrigger>
              <DialogContent className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4 sm:flex-col sm:justify-end">
                <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full">
                  <DialogClose className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                    <img
                      src={CloseCircle}
                      alt="close-icon"
                      className="hover:cursor-pointer"
                    />
                  </DialogClose>

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
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold">Select Emoji</h2>
                    </div>
                    <EmojiPicker
                      onEmojiClick={(emoji: EmojiClickData) => {
                        setOpenEmoji(false);
                        setInputMessage(
                          `${inputMessageValue} [${emoji.imageUrl}]`
                        );
                        messageInput.current?.focus();
                      }}
                      height={500}
                      width={"100%"}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <button className="text-blue-500 p-1 h-12 w-12 flex items-center justify-center focus:outline-none">
              <img
                src={Gift}
                alt="gift-icon"
                className="hover:cursor-pointer w-full h-full object-contain"
              />
            </button>

            <button className="text-blue-500 p-2 h-12 w-12 flex items-center justify-center focus:outline-none">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center"
              >
                <img
                  src={ImgAdd}
                  alt="img-add-icon"
                  className="hover:cursor-pointer"
                />
              </label>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapsibleIcons;
