import "./App";
import Hero from "@/components/hero";
import NavBar from "@/components/navbar";
import Benefits from "./components/benefits";
import Features from "./components/features";

function App() {
  return (
    <>
      <div className="mx-[200px]">
        <NavBar />
        <Hero />
        <Benefits />
        <Features />
      </div>
    </>
  );
}

export default App;
