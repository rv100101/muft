import user from "@/assets/auth/sample-user-icon.png";
import { DialogTrigger } from "../ui/dialog";

type userInfoProps = {
  first_name: "";
  last_name: "";
  email: "";
};
type ConfirmAccountProps = {
  userInfo: userInfoProps;
  setUserFound: (dat: boolean) => void;
  setActivateAccount: (dat: boolean) => void;
};
const ConfirmAccount = ({
  userInfo,
  setUserFound,
  setActivateAccount,
}: ConfirmAccountProps) => {
  return (
    <div className="flex flex-col items-center justfiy-center space-y-3">
      <img src={user} alt="user-image" />
      <p className="text-lg font-bold">{`${userInfo.first_name} ${userInfo.last_name}`}</p>
      <p className="text-sm text-slate-500">{userInfo.email}</p>
      <button
        onClick={() => setUserFound(false)}
        className="text-xs text-blue-500 hover:underline"
      >
        Not you?
      </button>
      <div className="w-full border-t-2 mt-10 border-[#E0E0E0] flex flex-row justify-end float-right space-x-3 pt-5">
        <DialogTrigger
          asChild
          className="text-white rounded-full py-2 bg-white border border-primary text-[#FF599B] p-5"
        >
          <button onClick={() => setUserFound(false)}>Cancel</button>
        </DialogTrigger>
        <button
          onClick={() => {
            setActivateAccount(true);
            setUserFound(false);
          }}
          type="submit"
          className="text-white rounded-full py-2 bg-primary p-5 text-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ConfirmAccount;
