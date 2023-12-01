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

export const routesWithFooterAndTopNav = [
  "/",
  "/privacy-policy",
  "/terms",
  "/release-notes",
  "/auth/signup",
  "/auth/signin",
  // "/activate",
  "/about",
  "/subscription",
];

const pageRoutes = {
  landingPage: {
    path: "/",
    component: LandingPage,
  },
  privacyPolicyPage: {
    path: "/privacy-policy",
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

  // activateAccount: {
  //   path: "/activate",
  //   component: ActivateAccount,
  // },
  about: {
    path: "/about",
    component: AboutPage,
  },
  subscription: {
    path: "/subscription",
    component: SubscriptionPage,
  },
};

export default pageRoutes;
