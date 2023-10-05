import SignInForm from "@/components/auth/signInForm";
import Conversation from "@/components/conversation";

const SignInPage = () => {
  return (
    <div className="grid grid-cols-2 gap-8 justify-center items-center h-full px-32 py-4 border-t">
      <SignInForm />
      <Conversation />
    </div>
  );
};

export default SignInPage;
