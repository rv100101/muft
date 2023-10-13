import "./App";
import { Route, useLocation, Redirect } from "wouter";
import TopNav from "./components/topNav";
import Footer from "./components/footer";

import pageRoutes, { routesWithFooterAndTopNav } from "./lib/routes";
import { useUserStore } from "./zustand/auth/user";

function App() {
  const [location] = useLocation();
  const user = useUserStore((state) => state.user);

  return (
    <>
      {routesWithFooterAndTopNav.includes(location) && !user && <TopNav />}
      <Route
        path={"/"}
        component={
          user
            ? pageRoutes.homePage.component
            : pageRoutes.landingPage.component
        }
      />
      <Route
        path={pageRoutes.signUp.path}
        component={pageRoutes.signUp.component}
      />
      <Route
        path={pageRoutes.signIn.path}
        component={pageRoutes.signIn.component}
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

      {/* Authenticated routes */}
      {user ? (
        <>
          <Route
            path={pageRoutes.messagingPage.path}
            component={pageRoutes.messagingPage.component}
          />
          <Route
            path={pageRoutes.notificationsPage.path}
            component={pageRoutes.notificationsPage.component}
          />
          <Route
            path={pageRoutes.profilePage.path}
            component={pageRoutes.profilePage.component}
          />
        </>
      ) : (
        (location == pageRoutes.messagingPage.path ||
          location == pageRoutes.notificationsPage.path) && (
          <Redirect to="/auth/signin" />
        )
      )}
      {routesWithFooterAndTopNav.includes(location) && !user && (
        <div className="bg-[#0C1223]">
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
