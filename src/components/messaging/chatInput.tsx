import { SendHorizonalIcon, SmileIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import EmojiPicker from "emoji-picker-react";
const ChatInput = () => {
  return (
    <div className="flex w-full items-end rounded-lg h-max bg-[#F7F8FA]">
      <div className="h-max w-full flex items-end justify-start mb-4 mt-1">
        <div className="flex flex-col items-center justify-center mx-2 ">
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-input"
          />
          <label htmlFor="image-input">
            <Button
              variant={"ghost"}
              className="hover:bg-transparent p-0"
              onClick={() => {}}
            >
              <ImageIcon className="text-primary" />
            </Button>
          </label> */}
          <Popover>
            <PopoverTrigger>
              <SmileIcon className="text-primary" />
            </PopoverTrigger>
            <PopoverContent>
              <EmojiPicker height={300} width={"100%"} />
            </PopoverContent>
          </Popover>
        </div>
        <textarea
          name="text"
          rows={5}
          className="focus:outline-none p-2 w-full rounded-lg max-h-full overflow-y-auto caret-primary resize-none"
          placeholder="Type a message"
        />
      </div>
      <Button className="rounded-full h-max w-max hover:bg-transparen ml-4 px-2 mr-4 mb-4">
        <SendHorizonalIcon height={16} />
      </Button>
    </div>
  );
};

export default ChatInput;
