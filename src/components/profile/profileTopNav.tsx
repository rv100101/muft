import { ArrowLeft, MoreVertical } from "lucide-react";
// import TopBar2 from "../topBar2";

const profileTopNav = () => {
  return (
    // <TopBar2>
    <div className="flex flex-row w-full justify-between p-5 lg:border-b">
      <div className="flex justify-center space-x-5 ">
        <ArrowLeft
          // color="#98A2B3"
          size={20}
          className="mt-1 hover:cursor-pointer hidden lg:flex"
        />
        <p className="uppercase font-semibold uppercase mt-1">profile</p>
      </div>
      <MoreVertical
        // color="#98A2B3"
        size={20}
        className="mt-1 hover:cursor-pointer"
      />
    </div>
    // </TopBar2>
  );
};

export default profileTopNav;
