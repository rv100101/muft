import "./App";
import { Route, useLocation } from "wouter";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import pageRoutes, { routesWithFooter } from "./lib/routes";
import { useEffect, useState } from "react";

// import UnderMaintenancePage from "./pages/underMaintenancePage";

function App() {
  const [location] = useLocation();
  const [showFooter, setShowFooter] = useState(false);
  useEffect(() => {
    if (routesWithFooter.includes(location) && !showFooter) {
      setShowFooter(true);
    }
  }, [location, showFooter]);

  return (
    <>
      <NavBar />
      <Route
        path={pageRoutes.landingPage.path}
        component={pageRoutes.landingPage.component}
      />
      <div className="md:mx-12 lg:mx-36">
        <Route
          path={pageRoutes.privacyPolicyPage.path}
          component={pageRoutes.privacyPolicyPage.component}
        />
        <Route
          path={pageRoutes.termsPage.path}
          component={pageRoutes.termsPage.component}
        />
        <Route
          path={pageRoutes.releaseNotesPage.path}
          component={pageRoutes.releaseNotesPage.component}
        />
      </div>
      <Route
        path={pageRoutes.messagingPage.path}
        component={pageRoutes.messagingPage.component}
      />
      {showFooter && (
        <div className="bg-[#0C1223]">
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
