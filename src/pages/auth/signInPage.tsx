import SignInForm from "@/components/auth/signInForm";
import Conversation from "@/components/conversation";

const SignInPage = () => {
  return (
    <div className="grid h-[calc(100vh-120px)] grid-cols-2 gap-8 w-full px-32 border-t">
      <div className="flex items-center h-full justify-center ">
        <SignInForm />
      </div>
      <Conversation />
    </div>
  );
};

export default SignInPage;
