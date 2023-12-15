import { getImagePath } from "@/lib/images";
import { useUserAvatar } from "@/zustand/auth/avatar";
import { useUserStore } from "@/zustand/auth/user";
import TopBar2 from "../topBar2";

const ChatMobileNav = () => {
  const user = useUserStore((state) => state.user);
  const userPhoto = useUserAvatar((state) => state.gallery_uuid);
  return (
    <div className=" lg:hidden">
      <TopBar2>
        <div className="flex items-center space-x-2">
          <img
            className="h-8 w-8 object-cover rounded-full"
            src={getImagePath(userPhoto, user?.gender, user?.member_uuid)}
            alt="avatar"
          />
          <p className="font-semibold">{user?.first_name}</p>
        </div>
      </TopBar2>
    </div>
  );
};

export default ChatMobileNav;
