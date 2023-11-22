// import { MoreVertical } from "lucide-react";
import TopBar2 from "../topBar2";
// import TopBar from "../topBar";

const PostHeader = () => {
  return (
    <div className="">
      <TopBar2>
        <div className="flex flex-row w-full justify-between lg:p-5 lg:border-l lg:border-r">
          <p className="uppercase font-semibold">Home</p>
          {/* <MoreVertical
            color="#98A2B3"
            size={20}
            className="mt-1 hover:cursor-pointer"
          /> */}
        </div>
      </TopBar2>
    </div>
  );
};

export default PostHeader;
