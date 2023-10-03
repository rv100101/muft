import "./App";
import { Route, useLocation } from "wouter";
import TopNav from "./components/topNav";
import Footer from "./components/footer";

import SignUpPage from "./pages/auth/signUpPage";
import SignInPage from "./pages/auth/signInPage";
import pageRoutes, { routesWithFooterAndTopNav } from "./lib/routes";


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
      <Route path="/auth/signup" component={SignInPage} />
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
      {show && (
        <div className="bg-[#0C1223]">
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
