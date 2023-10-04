import { MoreVertical } from "lucide-react";

const PostHeader = () => {
  return (
    <>
      <div className="flex flex-row w-full justify-between p-5">
        <p className="uppercase font-semibold">Home</p>
        <MoreVertical
          color="#98A2B3"
          size={20}
          className="mt-1 hover:cursor-pointer"
        />
      </div>
    </>
  );
};

export default PostHeader;
