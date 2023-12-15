import { MoreVertical } from "lucide-react";
import TopBar2 from "../topBar2";

const LikesMobileNav = () => {
  return (
    <div className="lg:hidden">
      <TopBar2>
        <div className="w-full h-full flex items-center justify-between">
          <h1 className="font-semibold">LIKES</h1>
          <MoreVertical />
        </div>
      </TopBar2>
    </div>
  );
};

export default LikesMobileNav;
