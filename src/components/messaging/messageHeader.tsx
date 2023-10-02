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
    <div className="flex justify-between h-max border-b pb-2">
      <div className="flex items-center space-x-2">
        <img className="h-12" src={heroAvatar1} alt="avatar" />
        <p className="font-semibold">John Doe</p>
      </div>
      <div className="flex space-x-2 items-center">{links}</div>
    </div>
  );
};

export default MessageHeader;
