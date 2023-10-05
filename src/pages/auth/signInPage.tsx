import SignInForm from "@/components/auth/signInForm";
import Conversation from "@/components/conversation";

const SignInPage = () => {
  return (
    <div className="grid grid-cols-2 gap-8 h-full w-full px-32 border-t">
      <div className="flex items-center justify-center ">
        <SignInForm />
      </div>
      <Conversation />
    </div>
  );
};

export default SignInPage;
