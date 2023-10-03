import heroAvatar1 from "@/assets/hero-avatar1.png";
import { buttons } from "@/lib/chatButtons";
import { Button } from "../ui/button";
const MessageHeader = () => {
  const links = buttons.map((button, index) => (
    <Button key={index} variant={"ghost"}>
      {button.icon}
    </Button>
  ));
  return (
    <div className="flex justify-between h-max items-center border-b p-2">
      <div className="flex w-full h-full items-center space-x-2">
        <img className=" max-h-8" src={heroAvatar1} alt="avatar" />
        <p className="font-semibold">John Doe</p>
      </div>
      <div className="flex space-x-2 items-center">{links}</div>
    </div>
  );
};

export default MessageHeader;
