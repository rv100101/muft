import "./App";
import { Redirect, Route, useLocation } from "wouter";
import TopNav from "./components/topNav";
import Footer from "./components/footer";

import pageRoutes, {
  noUserOnlyRoutes,
  routesWithFooterAndTopNav,
  userOnlyRoutes,
} from "./lib/routes";
import { useUserStore } from "./zustand/auth/user";
import { cn } from "./lib/utils";
import ViewUser from "./components/profile/viewUser";
import { ErrorBoundary } from "@sentry/react";
import { useSettingsStore } from "./zustand/settings/displaySettingsStore";
import { useEffect } from "react";
// import runOneSignal from "./lib/oneSignal";
import * as Sentry from "@sentry/react";
import { useUpdateEffect } from "usehooks-ts";
function App() {
  const [location] = useLocation();
  const user = useUserStore((state) => state.user);
  const toggleSystemDark = useSettingsStore((state) => state.toggleSystemDark);

  const displaySettings = useSettingsStore((state) => state.settings);

  // useEffect(() => {
  //   runOneSignal();
  // });

  useUpdateEffect(() => {
    if (user) {
      Sentry.configureScope(function (scope) {
        scope.setTag("user", "muffin_user");
        scope.setUser({
          id: user.member_id,
          email: user.email_address,
        });
      });
    } else {
      Sentry.setUser(null);
    }
  }, [user]);

  useEffect(() => {
    if (displaySettings?.darkModeSwitch) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (displaySettings?.lightModeSwitch) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        // setSystemDark(true);
        toggleSystemDark(true);
        // User prefers dark mode
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        // setSystemDark(false);
        toggleSystemDark(false);
        // User prefers light mode
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, [displaySettings, toggleSystemDark]);

  return (
    <ErrorBoundary>
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

        {/* <Route
          path={pageRoutes.subscription.path}
          component={pageRoutes.subscription.component}
        /> */}

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
              {(params) =>
                user!.member_id.toString() == params.id ? (
                  <ViewUser id={params.id} />
                ) : (
                  <Redirect to="/" />
                )
              }
            </Route>
            <Route
              path={pageRoutes.likes.path}
              component={pageRoutes.likes.component}
            />
            <Route
              path={pageRoutes.Favorites.path}
              component={pageRoutes.Favorites.component}
            />
            <Route
              path={pageRoutes.settings.path}
              component={pageRoutes.settings.component}
            />
            {(location == "/members" || location == "/profile") && (
              <Redirect to="/" />
            )}
            <Route path="/members/:id">
              {(params) => <ViewUser id={params.id} />}
            </Route>
          </>
        )}

        {!user && !noUserOnlyRoutes.includes(location) && location !== "/" && (
          <Redirect to="/auth/signin" />
        )}

        {user &&
          !userOnlyRoutes.includes(location) &&
          !location.startsWith("/profile") &&
          !location.startsWith("/members") && <Redirect to="/" />}

        {user && (!user.profile_completed || !user.is_active) && (
          <Redirect to={`/profile/${user.member_id}`} />
        )}

        {routesWithFooterAndTopNav.includes(location) && !user && (
          <div className="bg-[#0C1223] h-max">
            <Footer />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
