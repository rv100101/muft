import SignInForm from "@/components/auth/signInForm";
import Conversation from "@/components/conversation";

const SignInPage = () => {
  return (
    <div className="grid h-[calc(100vh-70px)] md:min-h-screen h-max grid-cols-1 lg:grid-cols-2 lg:gap-4 w-full lg:px-32 border-t">
      <div className="flex lg:items-center h-full justify-center ">
        <SignInForm />
      </div> 
      <div className="hidden lg:flex">
        <Conversation />
      </div>
    </div>
  );
};

export default SignInPage;
