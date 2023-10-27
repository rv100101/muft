import SendResetPin from "./sendResetPin";
import EnterResetCode from "./enterResetCode";
import ChangePassword from "./changePassword";
import { usePasswordResetState } from "@/zustand/auth/passwordReset";

const ForgotPassword = () => {
  const passwordResetState = usePasswordResetState((state) => state.phase);

  if (passwordResetState === "SEND") {
    return <SendResetPin />;
  }

  if (passwordResetState === "VERIFY") {
    return <EnterResetCode />;
  }

  if (passwordResetState === "CHANGE") {
    return <ChangePassword />;
  }
};

export default ForgotPassword;
