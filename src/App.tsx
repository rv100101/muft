import "./App";
import Hero from "@/components/hero";
import NavBar from "@/components/navbar";
import Benefits from "./components/benefits";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
import Cta from "./components/cta";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <div className="mx-8 md:mx-12 lg:mx-48">
        <NavBar />
        <Hero />
        {/* <Benefits /> */}
        {/* <Features /> */}
        {/* <Testimonials /> */}
      </div>
      {/* <div className="bg-[#FF7AAF]">
        <Cta />
      </div>
      <div className="bg-[#0C1223]">
        <Footer />
      </div> */}
    </>
  );
}

export default App;
