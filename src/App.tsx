import "./App";
import logo from "@/assets/logo.svg";
import { Button } from "./components/ui/button";
function App() {
  return (
    <>
      <nav className="flex items-center justify-between">
        <img src={logo} alt="muffin-logo" />
        <div className="space-x-8">
          <Button variant={"ghost"}>Link One</Button>
          <Button variant={"ghost"}>Link Two</Button>
          <Button variant={"ghost"}>Link Three</Button>
          <Button>Sign in</Button>
        </div>
      </nav>
    </>
  );
}

export default App;
