import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

const TopBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-8 items-center space-x-4">
      <Button variant={"ghost"} className="hover:bg-white p-0">
        <ArrowLeft />
      </Button>
      {children}
    </div>
  );
};

export default TopBar;
