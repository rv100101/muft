import "./App";
import { Route } from "wouter";
import LandingPage from "./pages/landingPage";
function App() {
  return (
    <>
      <Route path="/" component={LandingPage} />
      <Route path="/privacy-policy" component={LandingPage} />
      <Route path="/terms" component={LandingPage} />
      <Route path="/release-notes" component={LandingPage} />
    </>
  );
}

export default App;
