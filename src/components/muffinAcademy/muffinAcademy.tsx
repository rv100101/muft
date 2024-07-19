import { useEffect, useState } from "react";
import axios from "axios";
import academyHeader from "@/assets/academy-header.png";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Grid2x2, List, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { useToast } from "../ui/use-toast";
import countryCodes from "country-codes-list";

export interface Post {
  authorized: boolean;
  ip_address: string;
  post_id: string;
  post_uuid: string;
  post_title: string;
  post_text: string;
  post_language: string;
}

const MuffinAcademy = ({ countryCode }: { countryCode: string | null }) => {
  const [location, navigate] = useLocation();
  const [, i18n] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFlag, setShowFlag] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (countryCode !== null) {
      const cc = countryCodes.customArray();
      const isFound = cc.filter((code) => { return code.value == countryCode.toUpperCase() }).length !== 0;
      // const isFound = langs.includes(countryCode);
      console.log(isFound);
      if (!isFound) {
        const link = `/academy/${i18n.language}`
        navigate(link);
      }
    }
    // if (countryCode != i18n.language) {
    //   const urlSplit = location.split('/');
    //   urlSplit[2] = countryCode == 'ar' ? 'en' : 'ar';
    //   const link = urlSplit.join('/');
    //   navigate(link);
    // }
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", countryCode ?? i18n.language);
    formData.append("country", countryCode ?? "");
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://muffinapi.azurewebsites.net/posts.php",
          formData
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [countryCode, i18n.language, location, navigate]);

  const handleShare = (e: React.MouseEvent, postUuid: string) => {
    e.preventDefault();
    const url = `${window.location.origin}/academy/post/${postUuid}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "Share the link with your friends!",
      variant: "success",
      duration: 1000
    });
  };

  return (
    <div dir={i18n.language == 'ar' ? "rtl" : "ltr"} className="min-h-screen w-full">
      <div className="w-full h-full relative">
        <div className="w-full h-full absolute flex justify-center items-center text-white flex-col">
          <h1 className="text-3xl sm:text-6xl font-semibold">Muffin Academy</h1>
          <p className="mt-4">
            <span className="font-light">Home</span> / Muffin Academy
          </p>
        </div>
        <img className="h-48 object-cover sm:h-full" src={academyHeader} alt="academy-header" />
      </div>
      <div className="w-full h-full px-8 sm:px-36 sm:py-12">
        <div className="hidden sm:flex w-full justify-between p-4 rounded-lg bg-[#F5F5F5]">
          <div className={cn("flex items-center text-[#1B2950]")}>
            <Button
              variant={"ghost"}
              className="font-semibold w-min p-0"
              onClick={() => setView("grid")}
            >
              <Grid2x2 className={cn(i18n.language == "ar" ? "ml-2" : "mr-2")} />
              Grid
            </Button>
            <div className="w-[1px] h-full bg-[#CACACA]/50 mx-2" />
            <Button
              variant={"ghost"}
              className="font-semibold w-min p-0"
              onClick={() => setView("list")}
            >
              <List className={cn(i18n.language == "ar" ? "ml-2" : "mr-2")} />
              List
            </Button>
            <div className="w-[1px] mx-2 h-full bg-[#CACACA]/50" />
            {/* <Button variant={"ghost"} className="font-semibold w-min p-0">
              <BoxIcon className="mr-2" />
              Categories
            </Button> */}
          </div>
          {!isLoading && showFlag && (
            <img
              className="w-14 h-10 bg-white p-2 rounded-sm"
              alt={"post country flag"}
              src={`https://muffin0.blob.core.windows.net/flags/${countryCode}.png`}
              onError={() => {
                setShowFlag(false);
              }}
            />
          )}
          {/* <Select>
            <SelectTrigger className="w-[180px] rounded-full text-[#1B2950] border-[#1B2950]">
              <SelectValue placeholder="Default sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>
        <div className={`sm:grid w-full ${view === "grid" ? "sm:grid-cols-3 gap-4" : "sm:grid-cols-1"} mt-8`}>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="p-4 border overflow-clip rounded-lg gap-2 bg-white">
                <Skeleton className="w-full h-52 rounded-2xl object-cover" />
                <Skeleton className="mt-4 h-6 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </div>
            ))
          ) : (
            posts.map((post) => (
              <Link
                href={`/academy/${i18n.language}/post/${post.post_uuid}`}
                key={post.post_id}
                className={cn(
                  "text-[#1B2950] p-4 rounded-lg w-full bg-white",
                  view == "list" ? "sm:flex justify-start items-center" : "block"
                )}
              >
                <img
                  src={`https://muffin0.blob.core.windows.net/post/${post.post_id}.png`}
                  alt={post.post_title}
                  className="w-full h-52 rounded-2xl object-cover"
                />
                <div className={cn("p-4 w-full", view == "list" ? "flex-grow" : "")}>
                  <p className="font-light mt-2 text-sm">11 Jan 2024</p>
                  <div className="flex items-start justify-between w-full">
                    <h3 className="text-xl font-bold w-3/4">{post.post_title}</h3>
                    <button
                      className="h-6 w-1/4"
                      onClick={(e) => handleShare(e, post.post_uuid)}
                    >
                      <Share2 />
                    </button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        {/* {!isLoading && (
          <div className="w-full flex justify-center">
            <Button disabled={isLoading} className="rounded-full">
              Load More
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default MuffinAcademy;
