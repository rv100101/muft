import fbLogo from "@/assets/auth/facebook-logo.png";
import googleLogo from "@/assets/auth/google-logo.png";

const SocialLogin = () => {
  return (
    <>
      <div className="flex w-full item-center">
        <div className="border-b border-black mt-3 h-[1px] w-full"></div>
        <div className="mx-2 text-black font-bold">or</div>
        <div className="border-b border-black mt-3 h-[1px] w-full"></div>
      </div>

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
    </>
  );
};

export default SocialLogin;
