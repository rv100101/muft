import LandingPage from "@/pages/landingPage";
import PrivacyPolicyPage from "@/pages/privacyPolicyPage";
import ReleaseNotesPage from "@/pages/releaseNotesPage";
import TermsPage from "@/pages/termsPage";
import MessagingPage from "@/pages/authenticatedPages/messagingPage";
import NotificationsPage from "@/pages/authenticatedPages/notificationsPage";
import SignUpPage from "@/pages/auth/signUpPage";
import SignInPage from "@/pages/auth/signInPage";

export const routesWithFooterAndTopNav = [
  "/",
  "/privacy-policy",
  "/terms",
  "/release-notes",
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
  signUp: {
    path: "/auth/signup",
    component: SignUpPage,
  },
  signIn: {
    path: "/auth/signin",
    component: SignInPage,
  },
};

export default pageRoutes;
