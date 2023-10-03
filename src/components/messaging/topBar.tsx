import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import heroAvatar1 from "@/assets/hero-avatar1.png";

const TopBar = () => {
  return (
    <div className="flex h-8 items-center space-x-4">
      <Button variant={"ghost"} className="hover:bg-white p-0">
        <ArrowLeft />
      </Button>
      <div className="flex items-center space-x-2">
        <img className="h-8" src={heroAvatar1} alt="avatar" />
        <p className="font-semibold">John Doe</p>
      </div>
    </div>
  );
};

export default TopBar;
