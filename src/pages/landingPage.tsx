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

const LandingPage = ({ uuid = null }: { uuid: string | null }) => {
  const [, i18n] = useTranslation();
  const [location, setLocation] = useLocation();
  const [showLoading, setShowLoading] = useState(uuid !== null);
  const [headerTitle, setHeaderTitle] = useState(null)
  const [pageTitle, setPageTitle] = useState(null)
  const [headerDescription, setHeaderDecription] = useState(null)
  useEffect(() => {
    if (uuid) {
      const formData = new FormData();
      formData.append(
        "auth",
        "0DB31DEE22DC4C03AD7DAAA9C29518FF3C08D931992A4A5CB0A4FF4CF4707DC6"
      );
      formData.append("landing_uuid", uuid);
      const fetchPlaces = async () => {
        try {
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
        } catch (error) {
          console.log(error);
        }
        setShowLoading(false);
      }
      fetchPlaces();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      </Helmet>

      <div className="mx-8 md:mx-12 lg:mx-36">
        <Hero headerTitle={headerTitle} headerDescription={headerDescription} />
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
