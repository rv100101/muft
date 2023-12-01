import useHomepageViewStore from "@/zustand/home/homepageView";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
const ProfileTopNav = () => {
  const setSelectedHistoryMemberId = useLatestConversationStore(
    (state) => state.setSelectedHistoryMemberId,
  );
  const setSelectedProfileId = useHomepageViewStore((state) =>
    state.setSelectedProfileId
  );

  return (
    <div className="flex flex-row w-full justify-between p-5 lg:border-b">
      <div className="flex justify-center space-x-5 ">
        <Button
          variant={"ghost"}
          className="bg-transparent m-0 p-0 h-min"
          onClick={() => {
            window.history.go(-1);
            setSelectedHistoryMemberId(null);
            setSelectedProfileId(null);
          }}
        >
          <ArrowLeft
            size={20}
            className="mt-1 hover:cursor-pointer hidden lg:flex"
          />
        </Button>
        <p className="uppercase font-semibold uppercase mt-1">profile</p>
      </div>
    </div>
  );
};

export default ProfileTopNav;
