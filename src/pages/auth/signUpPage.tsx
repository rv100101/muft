import logo from "@/assets/logo.svg";
import fbLogo from "@/assets/auth/facebook-logo.png";
import googleLogo from "@/assets/auth/google-logo.png";
import helpIcon from "@/assets/auth/help-icon.png";
import { UserIcon } from "lucide-react";
import { MailIcon } from "lucide-react";
import { LockIcon } from "lucide-react";

const signUpPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-full mt-10 my-[150px]">
        <div className="card flex flex-col justify-center items-center shadow-lg rounded-lg p-5 w-[450px] space-y-5">
          <div className="flex w-full justify-end">
            <img
              src={helpIcon}
              alt="help icon"
              className="w-8 md:w-8 hover:cursor-pointer"
            />
          </div>
          <div className="flex flex-col text-center">
            <img className="w-24 md:w-36" src={logo} alt="muffin-logo" />
            <p className="text-[#1B2950] font-bold">Welcome!</p>
          </div>
          {/* form */}
          <form action="post" className="space-y-5 w-full p-2">
            <div className="flex flex-col  space-y-1">
              <label htmlFor="firstname" className="text-sm text-semibold">
                First name
              </label>
              <div className="flex flex-row border rounded-full py-1 px-5 m-3">
                <UserIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="firstname" className="text-sm text-semibold">
                Last name
              </label>

              <div className="flex flex-row justify-left border rounded-full py-1 px-5 m-3">
                <UserIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="firstname" className="text-sm text-semibold">
                Email
              </label>
              <div className="flex flex-row border rounded-full py-1 px-5 m-3">
                <MailIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="firstname" className="text-sm text-semibold">
                Password
              </label>
              <div className="flex flex-row border rounded-full py-1 px-5 m-3">
                <LockIcon color="#98A2B3" size={20} className="mt-1" />
                <input
                  type="text"
                  className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                  placeholder="Password"
                />
              </div>
            </div>
          </form>

          {/* button */}
          <button className="bg-[#FF599B] text-white w-full rounded-full py-2">
            Sign In
          </button>
          {/* or */}
          <div className="flex w-full item-center">
            <div className="border-b border-black mt-3 h-[1px] w-full"></div>
            <div className="mx-2 text-black font-bold">or</div>
            <div className="border-b border-black mt-3 h-[1px] w-full"></div>
          </div>

          {/* social icons */}
          <div className="flex flex-row space-x-5">
            <img
              src={fbLogo}
              alt="facebook-logo"
              className="hover:cursor-pointer"
            />
            <img
              src={googleLogo}
              alt="google-logo"
              className="hover:cursor-pointer"
            />
          </div>
          <a href="/auth/signin" className="text-sm hover:underline">
            Already have an account
          </a>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default signUpPage;
