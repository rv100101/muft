import LandingPage from "@/pages/landingPage";
import PrivacyPolicyPage from "@/pages/privacyPolicyPage";
import ReleaseNotesPage from "@/pages/releaseNotesPage";
import TermsPage from "@/pages/termsPage";
import MessagingPage from "@/pages/authenticatedPages/messagingPage";
import NotificationsPage from "@/pages/authenticatedPages/notificationsPage";
import SignUpPage from "@/pages/auth/signUpPage";
import SignInPage from "@/pages/auth/signInPage";
import HomePage from "@/pages/homePage";
// import ActivateAccount from "@/pages/authenticatedPages/accountActivationPage";
import AboutPage from "@/pages/aboutPage";
import SubscriptionPage from "@/pages/subscriptionPage";
import FavouritesPage from "@/pages/authenticatedPages/favouritesPage";
import LikesPage from "@/pages/authenticatedPages/likesPage";
import SettingsPage from "@/pages/authenticatedPages/settingsPage";

export const routesWithFooterAndTopNav = [
  "/",
  "/terms",
  "/release-notes",
  "/auth/signup",
  "/auth/signin",
  "/about",
  "/subscription",
];

export const noUserOnlyRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/about",
  "/subscription",
  "/privacy",
  "/terms",
  "/release-notes",
];

export const userOnlyRoutes = [
  "/messages",
  "/profile",
  "/members",
  "/likes",
  "/favourites",
  "/Settings",
  "/privacy",
  "/terms",
  "/release-notes",
];

const pageRoutes = {
  landingPage: {
    path: "/",
    component: LandingPage,
  },
  privacyPolicyPage: {
    path: "/privacy",
    component: PrivacyPolicyPage,
  },
  termsPage: {
    path: "/terms",
    component: TermsPage,
  },
  releaseNotesPage: {
    path: "/release-notes",
    component: ReleaseNotesPage,
  },
  messagingPage: {
    path: "/messages",
    component: MessagingPage,
  },
  notificationsPage: {
    path: "/notifications",
    component: NotificationsPage,
  },
  profilePage: {
    path: null,
    component: null,
  },
  signUp: {
    path: "/auth/signup",
    component: SignUpPage,
  },
  signIn: {
    path: "/auth/signin",
    component: SignInPage,
  },
  homePage: {
    path: "/home",
    component: HomePage,
  },
  likes: {
    path: "/likes",
    component: LikesPage,
  },
  Favorites: {
    path: "/favourites",
    component: FavouritesPage,
  },
  about: {
    path: "/about",
    component: AboutPage,
  },
  subscription: {
    path: "/subscription",
    component: SubscriptionPage,
  },
  settings: {
    path: "/settings",
    component: SettingsPage,
  },
};

export default pageRoutes;
