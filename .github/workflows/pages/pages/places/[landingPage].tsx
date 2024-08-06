import Hero from "./hero";
import Benefits from "./benefits";
import TopNav from "./topNav";
import Features from "./features";
import Cta from "./cta";
// import GetApp from "@/components/getApp";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LandingPosts, { Post } from "./landingPosts";
import React from "react";
// import styles from "./styles/Place.module.css";
// import "../styles/globals.css";
import Footer from "./footer";
const LandingPage = ({ uuid = null }: { uuid: string | null }) => {
  const [, i18n] = useTranslation();

  const router = useRouter();

  const handleNavigate = (path) => {
    router.replace(path); // Use replace to avoid adding a new entry to the history stack
  };
  const [showLoading, setShowLoading] = useState(uuid !== null);
  const [headerTitle, setHeaderTitle] = useState(null);
  const [, setPageTitle] = useState(null);
  const [headerDescription, setHeaderDecription] = useState(null);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const formData = new FormData();
    formData.append(
      "auth",
      "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
    );
    formData.append(
      "landing_uuid",
      uuid ?? i18n.language == "ar"
        ? "81CDBADD-4EC1-4C28-A2DA-149D51A11A66"
        : "583CB433-1EFA-470A-9DD5-17EC63EBADF7"
    );
    const fetchPlaces = async () => {
      try {
        if (uuid) {
          const res = await axios.post(
            "https://muffinapi.azurewebsites.net/landing.php",
            formData
          );
          if (res?.data?.length == 0) {
            handleNavigate("/");
          } else {
            setHeaderTitle(res.data[0].landing_title);
            setHeaderDecription(res.data[0].landing_description);
            setPageTitle(res.data[0].page_title);
            // setPrefferedLanguage(res.data[0].landing_language)
            i18n.changeLanguage(res.data[0].landing_language);
          }
        }
        const places = await axios.post(
          "https://muffinapi.azurewebsites.net/landing_posts.php",
          formData
        );
        setPosts(places.data);
      } catch (error) {
        console.log(error);
      }
      setShowLoading(false);
    };
    fetchPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  if (showLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <img
          src={"/single-logo.png"}
          className="animate-bounce h-64"
          alt="muffin-logo"
        />
        <p className="font-semibold text-xl">Getting ready for you...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-8 md:mx-12 lg:mx-36">
        <TopNav />
        <Hero headerTitle={headerTitle} headerDescription={headerDescription} />
        {posts.length !== 0 && (
          <>
            <hr className="mt-4 block" />
            <LandingPosts posts={posts as Post[]} />
            <hr className="mt-4 sm:mt-4 block" />
          </>
        )}
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
      <Footer />
    </>
  );
};
export default LandingPage;
