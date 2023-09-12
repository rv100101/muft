import "./App";
// import { Route } from "wouter";
// import LandingPage from "./pages/landingPage";
// import NavBar from "@/components/navbar";
// import PrivacyPolicyPage from "./pages/privacyPolicyPage";
// import ReleaseNotesPage from "./pages/releaseNotesPage";
// import TermsPage from "./pages/termsPage";
// import Footer from "./components/footer";
import UnderMaintenancePage from "./pages/underMaintenancePage";

function App() {
  return (
    <>
      <UnderMaintenancePage />
      {/* <NavBar />
      <Route path="/" component={LandingPage} />
      <div className="md:mx-12 lg:mx-36">
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/release-notes" component={ReleaseNotesPage} />
      </div>
      <div className="bg-[#0C1223]">
        <Footer />
      </div> */}
    </>
  );
}

export default App;
