import { DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { useFormik } from "formik";
import { InfoIcon, MailIcon, ShieldCheck, LockIcon } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import user from "@/assets/auth/sample-user-icon.png";

// import ConfirmAccount from "./confirmAccount";

type FormDataType = {
  email: string;
};

//activate account
type FormDataType2 = {
  code: string;
};

type FormDataType3 = {
  new_pass: string;
  confirm_pass: string;
};

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [activateAccount, setActivateAccount] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // used for find your account form
  const formik1 = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values: FormDataType) => handleSearch(values),
  });

  // used for activate account form i.e code recieved from email
  const formik2 = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Code is required"),
    }),
    onSubmit: (values: FormDataType2) => console.log(values),
  });

  // used for activate account form i.e code recieved from email
  const formik3 = useFormik({
    initialValues: {
      new_pass: "",
      confirm_pass: "",
    },
    validationSchema: Yup.object({
      new_pass: Yup.string().required("field is required"),
      confirm_pass: Yup.string().required("field is required"),
    }),
    onSubmit: (values: FormDataType3) => console.log(values),
  });

  const handleSearch = async (search: FormDataType) => {
    try {
      setIsLoading(true);
      const { email } = search;
      console.log("search: ", email);
      setTimeout(() => {
        setIsLoading(false);
        setUserFound(true);
        setUserInfo({
          first_name: "Anna",
          last_name: "Mcconaughey",
          email: "annamcconaughey@email.com",
        });
      }, 3000);
    } catch (err: unknown) {
      // throw new Error(err);
      console.log("err", err);
    }
  };

  return (
    <DialogContent className="p-5 rounded-lg">
      <div className="p-5 ">
        {!userFound && !activateAccount && !resetPassword && (
          <>
            <p className="font-bold text-lg text-[#1B2950] w-full border-b-2 border-[#E0E0E0] pb-5">
              Find your account
            </p>
            <div className="py-10 ">
              <form action="post" onSubmit={formik1.handleSubmit}>
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="email"
                    className="text-sm text-bold  ml-5 mb-2"
                  >
                    Please enter your email to search for your account.
                  </label>
                  <div
                    className={`flex flex-row border rounded-full py-1 px-5 m-3 ${
                      formik1.touched.email && formik1.errors.email
                        ? "border-rose-500"
                        : ""
                    }`}
                  >
                    <MailIcon color="#98A2B3" size={20} className="mt-1" />
                    <input
                      type="text"
                      className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                      placeholder="example@email.com"
                      {...formik1.getFieldProps("email")}
                      onChange={formik1.handleChange}
                      name="email"
                      onBlur={formik1.handleBlur}
                    />
                    <InfoIcon
                      color="#D92D20"
                      size={20}
                      className={`mt-1 ${
                        formik1.touched.email && formik1.errors.email
                          ? "visible"
                          : "hidden"
                      }`}
                    />
                  </div>
                  {formik1.touched.email && formik1.errors.email ? (
                    <div className="error text-red-500 ml-5 pt-2">
                      {formik1.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="w-full border-t-2 mt-10 border-[#E0E0E0] flex flex-row justify-end float-right space-x-3 py-5">
                  <DialogTrigger className="rounded-full py-2 bg-white border border-primary text-[#FF599B] p-5">
                    Cancel
                  </DialogTrigger>
                  <button
                    // onClick={() => console.log("triggered")}
                    type="submit"
                    className="text-white rounded-full py-2 bg-primary p-5 text-center"
                  >
                    {isLoading ? "Searching..." : "Search"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        {userFound && (
          <>
            <p className="font-bold text-lg text-[#1B2950] w-full border-b-2 border-[#E0E0E0] pb-5">
              Confirm account
            </p>
            <div className="flex flex-col items-center justfiy-center space-y-3 py-5">
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
                  className="rounded-full py-2 bg-white border border-primary text-[#FF599B] p-5"
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
          </>
        )}

        {activateAccount && (
          <>
            <p className="font-bold text-lg text-[#1B2950] w-full border-b-2 border-[#E0E0E0] pb-5">
              Activate your account
            </p>

            <div className="py-10">
              <form action="post" onSubmit={formik2.handleSubmit}>
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="code"
                    className="text-sm text-bold  ml-5 mb-2"
                  >
                    We have sent a code to your email
                  </label>
                  <div
                    className={`flex flex-row border rounded-full py-1 px-5 m-3 ${
                      formik2.touched.code && formik2.errors.code
                        ? "border-rose-500"
                        : ""
                    }`}
                  >
                    <ShieldCheck color="#98A2B3" size={20} className="mt-1" />
                    <input
                      type="text"
                      className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                      placeholder="Enter code"
                      {...formik2.getFieldProps("code")}
                      onChange={formik2.handleChange}
                      name="code"
                      onBlur={formik2.handleBlur}
                    />
                    <InfoIcon
                      color="#D92D20"
                      size={20}
                      className={`mt-1 ${
                        formik2.touched.code && formik2.errors.code
                          ? "visible"
                          : "hidden"
                      }`}
                    />
                  </div>
                  {formik2.touched.code && formik2.errors.code ? (
                    <div className="error text-red-500 ml-5 pt-2">
                      {formik2.errors.code}
                    </div>
                  ) : null}
                </div>
                <div className="w-full border-t-2 mt-10 border-[#E0E0E0] flex flex-row justify-end float-right space-x-3 py-5">
                  <DialogTrigger className="rounded-full py-2 bg-white border border-primary text-[#FF599B] p-5">
                    Resend Code
                  </DialogTrigger>
                  <button
                    onClick={() => {
                      setResetPassword(true);
                      setActivateAccount(false);
                    }}
                    type="submit"
                    className="text-white rounded-full py-2 bg-primary p-5 text-center"
                  >
                    {isLoading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {resetPassword && (
          <>
            <p className="font-bold text-lg text-[#1B2950] w-full border-b-2 border-[#E0E0E0] pb-5">
              Reset Password
            </p>
            <div className="py-10">
              <form
                action="post"
                onSubmit={formik3.handleSubmit}
                className="flex flex-col space-y-5"
              >
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="new_pass"
                    className="text-sm text-bold  ml-5 mb-2"
                  >
                    Enter new password
                  </label>
                  <div
                    className={`flex flex-row border rounded-full py-1 px-5 m-3 ${
                      formik3.touched.new_pass && formik3.errors.new_pass
                        ? "border-rose-500"
                        : ""
                    }`}
                  >
                    <LockIcon color="#98A2B3" size={20} className="mt-1" />
                    <input
                      type="password"
                      className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                      placeholder="Password"
                      {...formik3.getFieldProps("new_pass")}
                      onChange={formik3.handleChange}
                      name="new_pass"
                      onBlur={formik3.handleBlur}
                    />
                    <InfoIcon
                      color="#D92D20"
                      size={20}
                      className={`mt-1 ${
                        formik3.touched.new_pass && formik3.errors.new_pass
                          ? "visible"
                          : "hidden"
                      }`}
                    />
                  </div>
                  {formik3.touched.new_pass && formik3.errors.new_pass ? (
                    <div className="error text-red-500 ml-5 pt-2">
                      {formik3.errors.new_pass}
                    </div>
                  ) : null}
                </div>

                {/* confirm pass */}
                <div className="flex flex-col space-y-1 pb-5">
                  <label
                    htmlFor="confirm-pass"
                    className="text-sm text-bold  ml-5 mb-2"
                  >
                    Confirm password
                  </label>
                  <div
                    className={`flex flex-row border rounded-full py-1 px-5 m-3 ${
                      formik3.touched.confirm_pass &&
                      formik3.errors.confirm_pass
                        ? "border-rose-500"
                        : ""
                    }`}
                  >
                    <LockIcon color="#98A2B3" size={20} className="mt-1" />
                    <input
                      type="password"
                      className="border-0 rounded-full py-1 px-5 text-normal focus:outline-0 w-full"
                      placeholder="Password"
                      {...formik3.getFieldProps("confirm_pass")}
                      onChange={formik3.handleChange}
                      name="confirm_pass"
                      onBlur={formik3.handleBlur}
                    />
                    <InfoIcon
                      color="#D92D20"
                      size={20}
                      className={`mt-1 ${
                        formik3.touched.confirm_pass &&
                        formik3.errors.confirm_pass
                          ? "visible"
                          : "hidden"
                      }`}
                    />
                  </div>
                  {formik3.touched.confirm_pass &&
                  formik3.errors.confirm_pass ? (
                    <div className="error text-red-500 ml-5 pt-2">
                      {formik3.errors.confirm_pass}
                    </div>
                  ) : null}
                </div>
                <div className="w-full border-t-2 mt-10 border-[#E0E0E0] flex flex-row justify-end float-right space-x-3 pt-10">
                  <DialogTrigger className="rounded-full py-2 bg-white border border-primary text-[#FF599B] p-5">
                    Cancel
                  </DialogTrigger>
                  <button
                    onClick={() => {
                      setResetPassword(true);
                      setActivateAccount(false);
                    }}
                    type="submit"
                    className="text-white rounded-full py-2 bg-primary p-5 text-center"
                  >
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </DialogContent>
  );
};

export default ForgotPassword;
