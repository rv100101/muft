import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Post } from "./muffinAcademy";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { Skeleton } from "../ui/skeleton";

const MuffinAcademyPost = ({ uuid }: { uuid: string }) => {
  const [, i18n] = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("lang", i18n.language);
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
  }, [i18n.language, navigate, uuid]);

  if (isLoading || post == null) {
    return (
      <div dir={i18n.language == "ar" ? 'rtl' : 'ltr'} className="min-h-screen w-full px-8 sm:px-36 py-12">
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
    );
  }

  return (
    <div dir={i18n.language == "ar" ? 'rtl' : 'ltr'} className="px-8 sm:px-36 py-8">
      <Helmet>
        <title>{post!.post_title}</title>
        <link rel="canonical" href={`https://${window.location.hostname}${location}`} />
      </Helmet>
      <h1 className="mb-3 text-3xl font-semibold">{post!.post_title}</h1>
      <img
        src={`https://muffin0.blob.core.windows.net/posts/${post!.post_id}.png`}
        alt={post!.post_title}
        className="sm:w-1/2 mb-8 rounded-2xl object-cover"
      />
      <div dangerouslySetInnerHTML={{ __html: post!.post_text }} />
    </div>
  );
};

export default MuffinAcademyPost;
