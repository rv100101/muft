import { ArrowLeft, MoreVertical } from "lucide-react";

const profileTopNav = () => {
  return (
    <>
      <div className="flex flex-row w-full justify-between p-5 border-b">
        <div className="flex justify-center space-x-5">
          <ArrowLeft
            // color="#98A2B3"
            size={20}
            className="mt-1 hover:cursor-pointer"
          />
          <p className="uppercase font-semibold uppercase mt-1">profile</p>
        </div>
        <MoreVertical
          // color="#98A2B3"
          size={20}
          className="mt-1 hover:cursor-pointer"
        />
      </div>
    </>
  );
};

export default profileTopNav;
