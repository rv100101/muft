import { Flag, MoreVerticalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { getImagePath } from "@/lib/images";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLocation } from "wouter";
import HomepageSearchInput from "./homeSearchUsersInput";
import { useMutation } from "@tanstack/react-query";
import axiosQuery from "@/queries/axios";
import useHomepageViewStore from "@/zustand/home/homepageView";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

import { useUserStore } from "@/zustand/auth/user";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import messagingQuery from "@/queries/messaging";
import useLatestConversationStore from "@/zustand/messaging/showConversation";
import { useTranslation } from "react-i18next";

type Member = {
  age: number;
  authorized: boolean;
  country_code: string;
  country_name: string;
  gallery_uuid: string;
  gender: string;
  imagePath: string;
  ip_address: string;
  isLiked: boolean;
  isFavorite: boolean;
  last_active: string;
  member_id: number;
  member_uuid: string;
  nationality: string;
  nickname: string;
  state_name: string;
  countryName: string;
};

const Suggestions = ({ members }: { members: Member[] }) => {
  const [t] = useTranslation();
  const setSelectedConversation = useLatestConversationStore(
    (state) => state.setConversation,
  );
  const likeTriggered = useHomepageViewStore((state) => state.isLiked);
  const favoriteTriggered = useHomepageViewStore((state) => state.isFavored);
  const toggleLikeIcon = useHomepageViewStore((state) => state.toggleIsLiked);

  const [reportReason, setReportReason] = useState("");
  const [reportProcessing, setReportProcessing] = useState(false);
  const { user } = useUserStore();
  const setSelectedHistoryMemberId = useLatestConversationStore(
    (state) => state.setSelectedHistoryMemberId,
  );
  const toggleFavoriteIcon = useHomepageViewStore(
    (state) => state.toggleIsFavored,
  );

  const [, setLocation] = useLocation();
  const toggleLike = useMutation({
    mutationFn: async ({
      member,
      liked,
    }: {
      member: number;
      liked: number;
    }) => {
      toggleLikeIcon();
      const res = await axiosQuery.post("/Like", {
        member: member,
        liked: liked,
      });
      return res.data;
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: async ({
      member,
      favored,
    }: {
      member: number;
      favored: number;
    }) => {
      toggleFavoriteIcon();
      const res = await axiosQuery.post("/Favorite", {
        member: member,
        favored: favored,
      });
      return res.data;
    },
  });

  // // TODO: add this feature once you are able to retrieve list of block users
  // const toggleBlock = useMutation({
  //   mutationFn: async ({
  //     member,
  //     blocked,
  //   }: {
  //     member: number;
  //     blocked: number;
  //   }) => {
  //     toggleLikeIcon();
  //     const res = await axiosQuery.post("/Block", {
  //       member: member,
  //       blocked: blocked,
  //     });
  //     return res.data;
  //   },
  // });

  const handleSuggestionSelect = (suggestion: Member) => {
    setLocation(`/members/${suggestion.member_id}`);
  };

  // report ⛳
  const handleReportSubmit = async (reported: number) => {
    try {
      console.log(reported);
      setReportProcessing(true);
      // const res = await axiosQuery.post("/ReportAbuse", {
      //   member: user!.member_id,
      //   reported: reported,
      //   reason: reportReason,
      // });

      setReportProcessing(false);
      toast({
        title: t("alerts.reported"),
        description: t("alerts.changesTakeAwhile"),
        // variant: "success",
      });

      // if (res.data) {
      //   setReportProcessing(false);
      // }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getConversationUuid = async (userId: number, gallery_uuid: string) => {
    try {
      const res: {
        data: {
          recipient_id: number;
          conversation_id: number;
          gallery_uuid: string;
          gender: string;
          recipient_uuid: string;
          recipient_nickname: string;
          conversation_uuid: string;
        };
      } = await messagingQuery.getConversation(
        user!.member_id,
        userId,
      );

      console.log(res);

      setSelectedConversation(
        user!.member_id,
        res.data.conversation_id,
        gallery_uuid,
        res.data.gender,
        res.data.recipient_uuid,
        res.data.recipient_nickname!,
        res.data.conversation_uuid,
      );
      setSelectedHistoryMemberId(userId);
      setLocation("/messages");
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("alerts.cannotCreateConversation"),
      });
      return null;
    }
  };

  const suggestions = members
    ?.slice(0, 3)
    .map((suggestion: Member, index: number) => {
      // console.log(suggestion);

      const imagePath = getImagePath(
        suggestion.gallery_uuid,
        suggestion.gender,
        suggestion.member_uuid,
      );
      console.log(suggestion);

      return (
        <li
          key={index}
          className="h-36 border rounded-xl lg:h-340 w-full relative"
        >
          <img
            className="h-full w-full rounded-xl "
            src=""
            alt="cover photo"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const imgElement = e.target as HTMLImageElement;
              imgElement.src =
                "https://dummyimage.com/600x400/f6f6f6/f6f6f6.png";
            }}
          />
          <div className="absolute top-0 right-0 mt-2 mr-1">
            <Dialog>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                  <MoreVerticalIcon height={20} />
                  {" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col">
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      toggleLike.mutate({
                        member: user!.member_id,
                        liked: suggestion.member_id,
                      })}
                  >
                    {suggestion.isLiked && !likeTriggered
                      ? "Unlike"
                      : !suggestion.isLiked && likeTriggered
                        ? "Unlike"
                        : "Like"}
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      toggleFavorite.mutate({
                        member: user!.member_id,
                        favored: suggestion.member_id,
                      })}
                  >
                    {suggestion.isFavorite && !favoriteTriggered
                      ? "UnFavorite"
                      : !suggestion.isFavorite && favoriteTriggered
                        ? "UnFavorite"
                        : "Favorite"}
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={async () => {
                      await getConversationUuid(
                        suggestion.member_id,
                        suggestion.gallery_uuid,
                      );
                    }}
                  >
                    Send Message
                  </Button>
                  <DropdownMenuSeparator />
                  <Button variant={"ghost"}>Block</Button>
                  {/* <DialogTrigger asChild> */}
                  <DialogTrigger asChild>
                    <Button variant={"destructive"}>Report</Button>
                  </DialogTrigger>
                  {/* </DialogTrigger> */}
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <Dialog> */}
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Report Abuse</DialogTitle>
                  <DialogDescription>
                    Help keep our platform safe and enjoyable. Use this modal to
                    quickly report any abusive content or behavior.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="member_id"
                      value={suggestion.member_id}
                      placeholder="member id"
                      className="col-span-3"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="username"
                      value={suggestion.nickname}
                      placeholder="username here"
                      className="col-span-3"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="username"
                      value={reportReason}
                      onChange={(state) => setReportReason(state.target.value)}
                      placeholder="enter reason here"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button
                      type="submit"
                      className="bg-red-500 flex flex-row space-x-1"
                      onClick={() => handleReportSubmit(suggestion.member_id)}
                    // disabled={reportProcessing}
                    >
                      <p>{reportProcessing ? "Reporting" : "Report"}</p>{" "}
                      <Flag size={15} />
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
              {/* </Dialog> */}
            </Dialog>
          </div>
          <div className="absolute flex bottom-4 left-4 z-20 space-x-2 items-end hover:underline">
            <img
              onClick={() => handleSuggestionSelect(suggestion)}
              className="rounded-full h-10 lg:h-16 ring-2 ring-primary hover:cursor-pointer"
              src={imagePath}
              alt="user avatar"
            />
            <div>
              <p
                onClick={() => handleSuggestionSelect(suggestion)}
                className="font-semibold text-xs  hover:cursor-pointer lg:text-lg"
              >
                {suggestion.nickname},{" "}
                <span className="font-bold">{suggestion.age}</span>
              </p>
              <p
                onClick={() => handleSuggestionSelect(suggestion)}
                className="text-xs lg:text-md  hover:cursor-pointer"
              >
                {suggestion.country_name}
              </p>
            </div>
          </div>
        </li>
      );
    });

  return (
    <div className="w-[380px] h-max pt-4 px-5 lg:p-4 sm:flex flex-col hidden ">
      <HomepageSearchInput />
      <div className="h-max w-full flex justify-between mt-4 items-center">
        <p className=" lg:text-md px-5 py-2 font-semibold">SUGGESTIONS</p>
        {
          // <div className="flex px-5">
          //   <Button variant={"ghost"} className="p-0">
          //     <ChevronLeftIcon size={20} />
          //   </Button>
          //   <Button variant={"ghost"} className="p-0">
          //     <ChevronRightIcon size={20} />
          //   </Button>
          // </div>
        }
      </div>
      <ul className="no-scrollbar border border-top h-max p-2 space-y-2 lg:space-y-4 overflow-y-clip rounded-lg mb-5">
        {members.length > 0
          ? suggestions
          : <div className="p-3">No Suggestions</div>}
      </ul>
      {
        // <div className="w-full border-t pt-2 hidden lg:block">
        //   <ul className="flex items-center justify-center list-none space-x-4 text-xs md:text-md">
        //     <li>
        //       <Link onClick={scrollToTop} href="/privacy-policy">
        //         <a className=" font-light hover:text-slate-700">Privacy Policy</a>
        //       </Link>
        //     </li>
        //     <li className="w-1 h-1 rounded-full bg-slate-400" />
        //     <li>
        //       <Link onClick={scrollToTop} href="/terms">
        //         <a className=" font-light hover:text-slate-700">
        //           Terms of Service
        //         </a>
        //       </Link>
        //     </li>
        //     <li className="w-1 h-1 rounded-full bg-slate-400" />
        //     <li>
        //       <Link onClick={scrollToTop} href="/release-notes">
        //         <a className="font-light hover:text-slate-700">Release Notes</a>
        //       </Link>
        //     </li>
        //   </ul>
        // </div>
      }
    </div>
  );
};

export default Suggestions;
