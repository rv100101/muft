import "./App";
import Hero from "@/components/hero";
import NavBar from "@/components/navbar";
import Benefits from "./components/benefits";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
import Cta from "./components/cta";

function App() {
  return (
    <>
      <div className="mx-[200px]">
        <NavBar />
        <Hero />
        <Benefits />
        <Features />
        <Testimonials />
      </div>
      <div className="bg-[#FF7AAF]">
        <Cta />
      </div>
    </>
  );
}

export default App;
