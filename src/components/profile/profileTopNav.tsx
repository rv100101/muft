import useHomepageViewStore from "@/zustand/home/homepageView";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Link } from "wouter";

const ProfileTopNav = () => {
  const setSelectedProfileId = useHomepageViewStore((state) => state.setSelectedProfileId);
  return (
    <div className="flex flex-row w-full justify-between p-5 lg:border-b">
      <div className="flex justify-center space-x-5 ">
        <Link
          href="/"
          onClick={() => {
            setSelectedProfileId(null);
          }}
        >
          <ArrowLeft
            size={20}
            className="mt-1 hover:cursor-pointer hidden lg:flex"
          />
        </Link>
        <p className="uppercase font-semibold uppercase mt-1">profile</p>
      </div>
      <MoreVertical
        size={20}
        className="mt-1 hover:cursor-pointer"
      />
    </div>
  );
};

export default ProfileTopNav;
