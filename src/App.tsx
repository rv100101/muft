import "./App";
import { Route, useLocation } from "wouter";
import TopNav from "./components/topNav";
import Footer from "./components/footer";

import pageRoutes, { routesWithFooterAndTopNav } from "./lib/routes";

function App() {
  const [location] = useLocation();
  return (
    <>
      {routesWithFooterAndTopNav.includes(location) && <TopNav />}
      <Route
        path={pageRoutes.landingPage.path}
        component={pageRoutes.landingPage.component}
      />
      <Route
        path={pageRoutes.signUp.path}
        component={pageRoutes.signUp.component}
      />
      <Route
        path={pageRoutes.signIn.path}
        component={pageRoutes.signIn.component}
      />
      <Route
        path={pageRoutes.homePage.path}
        component={pageRoutes.homePage.component}
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
      <Route
        path={pageRoutes.notificationsPage.path}
        component={pageRoutes.notificationsPage.component}
      />
      {routesWithFooterAndTopNav.includes(location) && (
        <div className="bg-[#0C1223]">
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
