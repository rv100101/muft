import "./App";
import { Route, useLocation } from "wouter";
import TopNav from "./components/topNav";
import Footer from "./components/footer";
import pageRoutes, { routesWithFooterAndTopNav } from "./lib/routes";
import { useEffect, useState } from "react";
import signUpPage from "./pages/auth/signUpPage";

function App() {
  const [location] = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    /* Navbar and footer is hidden on certain routes. See routesWithFooterAndTopNav */
    if (routesWithFooterAndTopNav.includes(location) && !show) {
      setShow(true);
    }
  }, [location, show]);

  return (
    <>
      {show && <TopNav />}
      <Route
        path={pageRoutes.landingPage.path}
        component={pageRoutes.landingPage.component}
      />
      <Route path="/auth/signup" component={signUpPage} />
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
      <Route
        path={pageRoutes.notificationsPage.path}
        component={pageRoutes.notificationsPage.component}
      />
      {show && (
        <div className="bg-[#0C1223]">
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
