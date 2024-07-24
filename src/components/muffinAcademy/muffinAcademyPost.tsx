import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Post } from "./muffinAcademy";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";
import { Skeleton } from "../ui/skeleton";
import MuffinAcademyHeader from "./muffinAcademyHeader";
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import SidePanel from "./sidePanel";
import languages from "./libs/languages";
import AcademyMobileMenu from "./mobileMenu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import AcademyChangeLanguage from "./changeLanguage";

const MuffinAcademyPost = ({ lang, uuid }: { lang: string, uuid: string }) => {
  const [t, i18n] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [location, navigate] = useLocation();
  // const cc = countryCodes.customArray();
  const { toast } = useToast();

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

  useEffect(() => {
    const isFound = languages.filter((e) => { return e.code == lang.toLowerCase() }).length !== 0;
    if (!isFound) {
      const link = `/academy/${i18n.language}`
      navigate(link);
    }

    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", lang);
    formData.append("uuid", uuid);

    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://muffinapi.azurewebsites.net/post_details.php",
          formData
        );
        const post = response.data[0];
        if (post == null || post == undefined) {
          navigate('/academy');
          return;
        }
        setPost({ ...post, post_text: DOMPurify.sanitize(post.post_text) });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPost();
  }, [i18n, i18n.language, lang, location, navigate, uuid]);

  if (isLoading || post == null) {
    return (
      <div className="w-full h-full z-10">
        <MuffinAcademyHeader lang={lang} />
        <div dir={(lang == "ar") ? 'rtl' : 'ltr'} className="min-h-screen w-full px-8 sm:px-36 py-12">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-40 sm:w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <Helmet>
        <title>{post!.post_title}</title>
        <link rel="canonical" href={`https://${window.location.hostname}${location}`} />
      </Helmet>
      <MuffinAcademyHeader lang={lang} />
      <div dir={lang == 'ar' ? "rtl" : "ltr"} className="w-full py-4 px-8 sm:hidden flex justify-between items-center">
        {location.includes("/post") && (
          <Link
            href="/academy"
            className={cn("flex w-full text-sm items-center sm:hidden py-2 ",
              i18n.language == "ar" ? "right-4 sm:right-12" : "left-4 sm:left-12"
            )
            }
          >
            <Button variant={"ghost"} className="hover:text-black/80 p-0">
              {i18n.language == "ar" ? <ArrowRight className="sm:ml-1 h-4" /> : <ArrowLeft className="sm:mr-1 h-4" />} <span>{t("academy.back")}</span>
            </Button>
          </Link>
        )}
        <div className="w-min">
          <AcademyMobileMenu lang={lang} />
        </div>
      </div>
      <div className="w-full h-full flex">
        <div className="h-full w-full hidden sm:flex sticky top-0">
          <SidePanel lang={lang} />
        </div>
        <div className="sm:hidden z-90">
          <AcademyChangeLanguage lang={lang} buttonSize="w-min" />
        </div>
        <div dir={(i18n.language == "ar" || lang == "ar") ? 'rtl' : 'ltr'} className="px-8 sm:px-16 sm:py-12">
          <div className="w-full items-start flex justify-between">
            <h1 className="mb-3 flex text-md sm:text-3xl font-semibold w-72 sm:w-full">{post!.post_title} <span>
              <button
                className="h-6 w-min sm:w-1/4 sm:mx-2 flex"
                onClick={(e) => handleShare(e, post.post_uuid)}
              >
                <Share2 className="text-primary w-min sm:w-32 sm:mt-2 hover:text-[#ff599b]/90" />
              </button>
            </span>
            </h1>

          </div>
          <img
            src={`https://muffin0.blob.core.windows.net/posts/${post!.post_id}.png`}
            alt={post!.post_title}
            className="sm:w-1/2 mb-8 rounded-2xl object-cover"
          />
          <div dangerouslySetInnerHTML={{ __html: post!.post_text }} />
        </div>
      </div>
    </div>
  );
};

export default MuffinAcademyPost;
