import SignInForm from "@/components/auth/signInForm";
import Conversation from "@/components/conversation";
import SmallFooter from "@/components/smallFooter";
import { Helmet } from "react-helmet-async";

const SignInPage = () => {
  return (
    <div className="grid h-full md:h-[calc(100vh-57px)] lg:h-[calc(100vh-90px)] grid-cols-1 lg:grid-cols-2 lg:gap-4 w-full lg:px-32 border-t">
      <Helmet>
        <title>Sign in</title>
        <meta name="description" content="Keep Your Love Story Going" />
        <link
          rel="canonical"
          href={`https://${window.location.hostname}/auth/signin`}
        />
      </Helmet>
      <div className="flex flex-col h-full w-full lg:h-[calc(100vh-90px)] lg:items-center justify-center">
        <div className="flex-1 h-full items-center justify-center w-full flex">
          <SignInForm />
        </div>
        <div className="flex bg-[#0C1223] px-8 lg:hidden h-min dark:bg-[#0C1223] w-full">
          <SmallFooter />
        </div>
      </div>
      <div className="overflow-clip hidden md:h-[calc(100vh-90px)] items-center justify-center lg:flex">
        <Conversation />
      </div>
    </div>
  );
};

export default SignInPage;
