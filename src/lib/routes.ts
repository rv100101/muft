import LandingPage from "@/pages/landingPage";
import PrivacyPolicyPage from "@/pages/privacyPolicyPage";
import ReleaseNotesPage from "@/pages/releaseNotesPage";
import TermsPage from "@/pages/termsPage";
import MessagingPage from "@/pages/messagingPage";
import NotificationsPage from "@/pages/notificationsPage";

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
};

export default pageRoutes;
