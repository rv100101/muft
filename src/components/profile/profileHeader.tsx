import { Copy, Pen } from "lucide-react";
import profileImg from "../../assets/profile/sample-profile.png";
const ProfileHeader = () => {
  return (
    <div className="flex flex-row w-full justify-between items-start p-5 border-b">
      <div className="flex flex-row space-x-5 ">
        <div className="rounded-full h-28 w-28 border-4 border-[#ff5c9d]">
          <img
            className="rounded-full object-cover h-full w-full"
            src={profileImg}
            // width={100}
            // height={50}
            alt="profile photo"
          />
        </div>
        {/* another div here */}
        <div className="flex flex-col">
          <p className="font-semibold text-[#171717] text-lg">Shanaz, 32</p>
          <p className="text-[#727272] text-sm">@us23452</p>
          {/* badges */}
          <div className="flex flex-row w-full">
            <div className="pt-5 flex flex-row space-x-2">
              <p className="rounded-full bg-[#FFF2F7] text-[#FF599B] text-sm px-5 py-1">
                5'7"
              </p>
              <p className="rounded-full bg-[#FFF2F7] text-[#FF599B] text-sm px-5 py-1">
                Libra
              </p>
              <p className="rounded-full bg-[#FFF2F7] text-[#FF599B] text-sm px-5 py-1">
                UAE
              </p>
              <p className="rounded-full bg-[#FFF2F7] text-[#FF599B] text-sm px-5 py-1">
                Single
              </p>
              <p className="rounded-full bg-[#FFF2F7] text-[#FF599B] text-sm px-5 py-1">
                Model
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* options here */}
      <div className="flex flex-row justify-center w-1/3 space-x-4">
        <div className="flex flex-row rounded-full justify-center hover:cursor-pointer px-5 text-sm space-x-2 bg-[#E8ECEF] py-2">
          <Pen color="#727272" size={20} className="hover:cursor-pointer" />
          <p className="text-[#727272]">Edit Profile</p>
        </div>
        <Copy color="#727272" size={20} className="mt-2 hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default ProfileHeader;
