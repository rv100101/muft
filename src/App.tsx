import "./App";
import { Redirect, Route, useLocation } from "wouter";
import TopNav from "./components/topNav";
import Footer from "./components/footer";

import pageRoutes, { routesWithFooterAndTopNav } from "./lib/routes";
import { useUserStore } from "./zustand/auth/user";
import { cn } from "./lib/utils";
import ViewUser from "./components/profile/viewUser";
import { useEffect } from "react";

function App() {
  const [location, setLocation] = useLocation();
  const user = useUserStore((state) => state.user);
  console.log(user);

  useEffect(() => {
    if (user) {
      if (!user.is_active) {
        setLocation("/activate");
      }
    }
  }, [user]);

  return (
    <div
      className={cn(
        location == "/auth/signin" ? "h-screen flex flex-col" : "h-full",
      )}
    >
      <div className="h-max">
        {routesWithFooterAndTopNav.includes(location) && (!user || !user.is_active) && <TopNav />}
      </div>
      <Route
        path="/"
        component={user
          ? pageRoutes.homePage.component
          : pageRoutes.landingPage.component}
      />
      <div className="flex-auto h-full">
        <Route
          path={pageRoutes.signUp.path}
          component={pageRoutes.signUp.component}
        />
        <Route
          path={pageRoutes.signIn.path}
          component={pageRoutes.signIn.component}
        />
        <Route
          path={pageRoutes.activateAccount.path}
          component={pageRoutes.activateAccount.component}
        />
      </div>

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
      {user && (
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
          <Route
            path={pageRoutes.likesAndFavorites.path}
            component={pageRoutes.likesAndFavorites.component}
          />
          <Route path="/users/:id">
            {(params) => <ViewUser id={params.id} />}
          </Route>
        </>
      )}

      {!user &&
        (location === pageRoutes.messagingPage.path ||
          location === pageRoutes.notificationsPage.path) &&
        <Redirect to="/auth/signin" />}

      {routesWithFooterAndTopNav.includes(location) && (!user || !user.is_active) && (
        <div className="bg-[#0C1223] h-max">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
