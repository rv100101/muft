import "./App";
import { Redirect, Route, useLocation } from "wouter";
import TopNav from "./components/topNav";
import Footer from "./components/footer";

import pageRoutes, {
  noUserOnlyRoutes,
  routesWithFooterAndTopNav,
} from "./lib/routes";
import { useUserStore } from "./zustand/auth/user";
import { cn } from "./lib/utils";
import ViewUser from "./components/profile/viewUser";
import { useEffect } from "react";
import runOneSignal from "./lib/oneSignal";

function App() {
  const [location] = useLocation();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    runOneSignal();
  }, []);

  return (
    <div
      className={cn(
        location == "/auth/signin" ? "h-screen flex flex-col" : "h-full"
      )}
    >
      <div className="h-max">
        {routesWithFooterAndTopNav.includes(location) && !user && <TopNav />}
      </div>
      <Route
        path="/"
        component={
          user
            ? pageRoutes.homePage.component
            : pageRoutes.landingPage.component
        }
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

      <Route
        path={pageRoutes.about.path}
        component={pageRoutes.about.component}
      />

      <Route
        path={pageRoutes.subscription.path}
        component={pageRoutes.subscription.component}
      />

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
          <Route path={"/profile/:id"}>
            {(params) => <ViewUser id={params.id} />}
          </Route>
          <Route
            path={pageRoutes.likes.path}
            component={pageRoutes.likes.component}
          />
          <Route
            path={pageRoutes.Favorites.path}
            component={pageRoutes.Favorites.component}
          />
          <Route path="/members/:id">
            {(params) => <ViewUser id={params.id} />}
          </Route>
        </>
      )}

      {!user && !noUserOnlyRoutes.includes(location) && location !== "/" && (
        <Redirect to="/auth/signin" />
      )}

      {user && noUserOnlyRoutes.includes(location) && <Redirect to="/" />}

      {user && !user.profile_completed && (
        <Redirect to={`/profile/${user.member_id}`} />
      )}

      {routesWithFooterAndTopNav.includes(location) && !user && (
        <div className="bg-[#0C1223] h-max">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
