import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight, Grid2x2, List, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { useToast } from "../ui/use-toast";
import MuffinAcademyHeader from "./muffinAcademyHeader";
import SidePanel from "./sidePanel";
import languages from "./libs/languages";
import AcademyChangeLanguage from "./changeLanguage";
import AcademyMobileMenu from "./mobileMenu";
import { useUserStore } from "@/zustand/auth/user";

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
  const [t, i18n] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFlag, setShowFlag] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (countryCode !== null) {
      const isFound = languages.filter((e) => { return e.code == countryCode.toLowerCase() }).length !== 0;
      if (!isFound) {
        const link = `/academy/${i18n.language}`
        navigate(link);
      }
    }

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
  }, [countryCode, i18n, i18n.language, location, navigate]);

  const user = useUserStore(state => state.user);

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
    <div className="min-h-screen w-full">
      {
        !isLoading &&
        <div className="sm:hidden">
          <AcademyChangeLanguage lang={countryCode!} buttonSize="w-min" />
        </div>
      }
      <MuffinAcademyHeader lang={countryCode ?? "en"} />
      {
        user &&
        <div dir={countryCode == 'ar' ? "rtl" : "ltr"} className="w-full pt-4 px-8 sm:hidden flex justify-between items-center">
          {location.startsWith("/academy") && (
            <Link
              href="/academy"
              className={cn("flex w-full text-sm items-center sm:hidden py-2 ",
                i18n.language == "ar" ? "right-4 sm:right-12" : "left-4 sm:left-12"
              )
              }
            >
              <Button variant={"ghost"} className="hover:text-black/80 p-0">
                {countryCode == "ar" ? <ArrowRight className="sm:ml-1 h-4" /> : <ArrowLeft className="sm:mr-1 h-4" />} <span>{t("academy.home")}</span>
              </Button>
            </Link>
          )}
          <div className="w-min">
            <AcademyMobileMenu lang={countryCode!} />
          </div>
        </div>
      }
      <div className="flex w-full h-full">
        <SidePanel lang={countryCode ?? 'en'} />
        <div dir={countryCode !== null && countryCode == 'ar' ? "rtl" : "ltr"} className="w-full h-full px-8 sm:px-12 sm:py-12">
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
              <div className="w-[1px] mx-2 h-full bg-[#CACACA]/50">
              </div>
            </div>
            <div className="flex w-full items-center justify-end">
              {(!isLoading && showFlag) ? (
                <img
                  className="w-14 h-10 bg-white p-2 rounded-sm"
                  alt={"post country flag"}
                  src={`https://muffin0.blob.core.windows.net/flags/${countryCode == "en" ? "us" : countryCode}.png`}
                  onError={() => {
                    setShowFlag(false);
                  }}
                />
              ) : <div />}
            </div>
          </div>
          <div className={`sm:grid w-full ${view === "grid" ? "sm:grid-cols-3 gap-4" : "sm:grid-cols-1"} mt-0 sm:mt-8`}>
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
                    src={`https://muffin0.blob.core.windows.net/posts/${post.post_id}.png`}
                    alt={post.post_title}
                    className="w-full h-52 rounded-2xl object-cover"
                  />
                  <div className={cn("pt-2 sm:p-4 w-full", view == "list" ? "flex-grow" : "")}>
                    <div className="flex items-start justify-between w-full">
                      <h3 className="text-lg sm:text-xl font-bold sm:w-3/4">{post.post_title}</h3>
                      <button
                        className="h-6 sm:w-1/4"
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
        </div>
      </div>
    </div>
  );
};

export default MuffinAcademy;
