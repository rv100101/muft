import Hero from "@/components/hero";
import Benefits from "@/components/benefits";
import Features from "@/components/features";
import Cta from "@/components/cta";
// import GetApp from "@/components/getApp";
import logo from "@/assets/single-logo.png";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import LandingPosts, { Post } from "./landingPosts";

const LandingPage = ({ uuid = null }: { uuid: string | null }) => {
  const [, i18n] = useTranslation();
  const [location, setLocation] = useLocation();
  const [showLoading, setShowLoading] = useState(uuid !== null);
  const [headerTitle, setHeaderTitle] = useState(null)
  const [pageTitle, setPageTitle] = useState(null)
  const [headerDescription, setHeaderDecription] = useState(null)
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append("landing_uuid", uuid ?? i18n.language == "ar" ? "81CDBADD-4EC1-4C28-A2DA-149D51A11A66" : "583CB433-1EFA-470A-9DD5-17EC63EBADF7");
    const fetchPlaces = async () => {
      try {
        if (uuid) {
          const res = await axios.post('https://muffinapi.azurewebsites.net/landing.php', formData);
          if (res?.data?.length == 0) {
            setLocation('/');
          } else {
            setHeaderTitle(res.data[0].landing_title)
            setHeaderDecription(res.data[0].landing_description)
            setPageTitle(res.data[0].page_title);
            // setPrefferedLanguage(res.data[0].landing_language)
            i18n.changeLanguage(res.data[0].landing_language);
          }
        }
        const places = await axios.post('https://muffinapi.azurewebsites.net/landing_posts.php', formData);
        setPosts(places.data);
      } catch (error) {
        console.log(error);
      }
      setShowLoading(false);
    }
    fetchPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  if (showLoading) {
    return <div className="h-screen w-full flex flex-col justify-center items-center">
      <img src={logo} className="animate-bounce h-64" alt="muffin-logo" />
      <p className="font-semibold text-xl">Getting ready for you...</p>
    </div>
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle ?? "Muffin | Find your Love"}</title>
        <link rel="canonical" href={`https://${window.location.hostname}${location}`} />
        <meta property="og:site_name" content="Muffin" />
        <meta property="og:title" content={pageTitle ?? "Muffin | Find your Love"} />
        <meta
          property="og:description"
          content="Unlock true romance with Muffin. Transform swipes into meaningful connections. Join us and make every moment count in your journey to love."
        />
        <meta property="og:url" content="http://www.muffin.ae/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://muffin.ae/public/logo.png" />
      </Helmet>

      <div className="mx-8 md:mx-12 lg:mx-36">
        <Hero headerTitle={headerTitle} headerDescription={headerDescription} />
        {
          posts.length !== 0 && <>
            <hr className="mt-4 block" />
            <LandingPosts posts={posts as Post[]} />
            <hr className="mt-4 sm:mt-4 block" />
          </>
        }
        <Benefits />
        <Features />
        {/* <Testimonials /> */}
      </div>
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
        }}
        viewport={{ once: true }}
        className="bg-[#FF7AAF]"
      >
        <Cta />
      </motion.div>
    </>
  );
}
export default LandingPage;
