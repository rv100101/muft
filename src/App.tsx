import "./App";
import Hero from "@/components/hero";
import NavBar from "@/components/navbar";
import Benefits from "./components/benefits";

function App() {
  return (
    <>
      <div className="mx-[260px]">
        <NavBar />
        <Hero />
        <Benefits />
      </div>
    </>
  );
}

export default App;
