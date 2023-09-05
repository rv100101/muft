import "./App";
import Hero from "@/components/hero";
import NavBar from "@/components/navbar";
import Benefits from "./components/benefits";
import Features from "./components/features";
import Cta from "./components/cta";
import Footer from "./components/footer";
import GooglePlay from "@/assets/google-play-logo.png";
import Apple from "@/assets/apple-logo.png";

function App() {
  return (
    <>
      <div className="w-full h-full relative justify-end md:flex hidden">
        <button className="fixed bottom-24 -right-1 bg-white py-2 pl-2 pr-4 space-x-4 flex justify-end items-center border-black border h-max w-max rounded-l-lg">
          <p className="font-bold text-xs text-[#1B2950]">GET APP</p>
          <div className="flex space-x-2">
            <a href="/">
              <img src={GooglePlay} alt="google play logo" />
            </a>
            <a href="/">
              <img src={Apple} alt="apple logo" />
            </a>
          </div>
        </button>
      </div>
      <div className="mx-8 md:mx-12 lg:mx-36">
        <NavBar />
        <Hero />
        <Benefits />
        <Features />
        {/* <Testimonials /> */}
      </div>
      <div className="bg-[#FF7AAF]">
        <Cta />
      </div>
      <div className="bg-[#0C1223]">
        <Footer />
      </div>
    </>
  );
}

export default App;
