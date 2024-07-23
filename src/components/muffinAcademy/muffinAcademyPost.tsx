import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Post } from "./muffinAcademy";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { Skeleton } from "../ui/skeleton";
import MuffinAcademyHeader from "./muffinAcademyHeader";
import { Share2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import SidePanel from "./sidePanel";
import languages from "./libs/languages";

const MuffinAcademyPost = ({ lang, uuid }: { lang: string, uuid: string }) => {
  const [, i18n] = useTranslation();
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
    console.log(lang);
    const isFound = languages.filter((e) => { return e.code == lang.toLowerCase() }).length !== 0;
    if (!isFound) {
      const link = `/academy/${i18n.language}`
      navigate(link);
    }
    // if (lang != null) {
    //   console.log("triggered");
    //   i18n.changeLanguage(
    //     lang
    //     ?? 'en');
    // }
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
      <div className="w-full h-full">
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
      <div className="w-full h-full flex">
        <div className="h-full w-full flex sticky top-0">
          <SidePanel />
        </div>
        <div dir={(i18n.language == "ar" || lang == "ar") ? 'rtl' : 'ltr'} className="px-8 sm:px-16 py-12">
          <h1 className="mb-3 text-3xl font-semibold">{post!.post_title} <span>
            <button
              className="h-6 w-1/4 mx-2"
              onClick={(e) => handleShare(e, post.post_uuid)}
            >
              <Share2 className="text-primary hover:text-[#ff599b]/90" />
            </button>
          </span>
          </h1>
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
