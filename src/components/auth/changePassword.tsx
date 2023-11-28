import passwordResetQuery from "@/queries/password_reset";
import { usePasswordResetState } from "@/zustand/auth/passwordReset";
import { useFormik } from "formik";
import { InfoIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";

type FormDataType = {
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const email = usePasswordResetState((state) => state.email);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .matches(/^\S*$/, "Password cannot contain spaces"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Passwords must match",
      ),
    }),
    onSubmit: async (values: FormDataType) => {
      setIsLoading(true);
      try {
        await passwordResetQuery.changePassword(email, values.password);
        toast({
          title: "Sucessful",
          description: "Password is successfully changed",
          variant: "success"
        })
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
          variant: "destructive"
        })
        console.log(error);
      }
      setIsLoading(false);
    },
  });

  return (
    <div className="space-y-2">
      <p className="mb-2 text-xl font-semibold">Change Password</p>
      <form
        action="post"
        onSubmit={formik.handleSubmit}
        className="space-y-2 w-full"
      >
        <div className="flex flex-col items-start justify-start">
          <div
            className={`flex items-center flex-row border rounded-full py-1 px-5w w-full px-4 ${
              formik.touched.password && formik.errors.password
                ? "border-rose-500"
                : ""
            }`}
          >
            <LockIcon color="#98A2B3" size={20} className="mt-1" />
            <input
              type="password"
              className="border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
              placeholder="New Password"
              {...formik.getFieldProps("password")}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InfoIcon
              color="#D92D20"
              size={20}
              className={`mt-1 ${
                formik.touched.password && formik.errors.password
                  ? "visible"
                  : "hidden"
              }`}
            />
          </div>
          {formik.touched.password && formik.errors.password
            ? (
              <div className="error text-red-500 ml-5 text-sm pt-2">
                {formik.errors.password}
              </div>
            )
            : null}
        </div>
        <div className="flex flex-col items-start justify-start space-y-1">
          <div
            className={`flex items-center flex-row border rounded-full py-1 px-5w w-full px-4 ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-rose-500"
                : ""
            }`}
          >
            <LockIcon color="#98A2B3" size={20} className="mt-1" />
            <input
              type="password"
              className="border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InfoIcon
              color="#D92D20"
              size={20}
              className={`mt-1 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "visible"
                  : "hidden"
              }`}
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword
            ? (
              <div className="error text-red-500 ml-5 text-sm pt-2">
                {formik.errors.confirmPassword}
              </div>
            )
            : null}
        </div>
        <div className="flex justify-end">
          <Button className="hover:bg-primary" type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
