import SignInForm from "@/components/auth/signInForm";
import Conversation from "@/components/conversation";
import { Helmet } from "react-helmet";

const SignInPage = () => {
  return (
    <div className="grid h-[calc(100vh-70px)] md:h-[calc(100vh-90px)] grid-cols-1 lg:grid-cols-2 lg:gap-4 w-full lg:px-32 border-t">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <div className="flex h-max md:h-[calc(100vh-90px)] lg:items-center justify-center">
        <SignInForm />
      </div>
      <div className="overflow-clip hidden md:h-[calc(100vh-90px)] items-center justify-center lg:flex">
        <Conversation />
      </div>
    </div>
  );
};

export default SignInPage;
