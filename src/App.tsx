import "./App";
import Hero from "@/components/hero";
import NavBar from "@/components/navbar";
import Benefits from "./components/benefits";

function App() {
  return (
    <>
      <div className="mx-[200px] space-y-4">
        <NavBar />
        <Hero />
        <Benefits />
      </div>
    </>
  );
}

export default App;
