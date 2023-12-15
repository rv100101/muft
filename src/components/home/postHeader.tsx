// import { MoreVertical } from "lucide-react";
import TopBar2 from "../topBar2";
// import TopBar from "../topBar";

const PostHeader = () => {
  return (
    <div className="pl-1 lg:hidden">
      <TopBar2>
        <div className="flex flex-row w-full justify-between lg:p-5 lg:border-l lg:border-r">
          <p className="uppercase font-semibold"></p>
        </div>
      </TopBar2>
    </div>
  );
};

export default PostHeader;
