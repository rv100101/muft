import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axiosQuery from "@/queries/axios";
import profileQuery from "@/queries/profile/profileHeader";
import { useUserStore } from "@/zustand/auth/user";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

type FormDataType = {
  username: string;
  password: string;
};

const MyAccountContent = () => {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const getMembers = profileQuery.getProfileHeader(user!.member_id);

  const { data: memberInfo, isLoading: retrievingMemberData } = useQuery({
    queryKey: ["my-account"],
    queryFn: () => getMembers,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(10, "Password must be at least 10 characters"),
    }),
    onSubmit: (values: FormDataType) => handleSignIn(values),
  });

  const handleSignIn = async (values: FormDataType) => {
    console.log("this is triggered");
    try {
      setIsLoading(true);
      // const signInData = await authQuery.signIn(values.email, values.password);
    } catch (err: unknown) {
      // throw new Error(err);
      console.log("err", err);
    }
  };

  if (retrievingMemberData) {
    return <>Loading...</>;
  }
  console.log("memberInfo: ", memberInfo);
  return (
    <div className="flex flex-col  w-full h-full justify-center text-[#727272] space-y-2 p-5">
      <p className="font-semibold">Edit Profile</p>
      <form
        action="post"
        onSubmit={formik.handleSubmit}
        className="space-y-3 w-full p-2"
      >
        <div className="flex flex-col w-full justify-between space-y-2 pt-5">
          <label htmlFor="" className="font-medium text-sm">
            Username
          </label>
          <Input
            type="text"
            className="rounded rounded-full"
            // className="autofill:bg-yellow-200 mx-2 text-sm h-8 focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-1 px-5 text-normal w-full"
            placeholder="Username"
            {...formik.getFieldProps("username")}
            onChange={formik.handleChange}
            name="username"
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error text-xs text-red-500 ml-5 pt-2">
              {formik.errors.username}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col w-full justify-between space-y-2 pt-5">
          <label htmlFor="" className="font-medium text-sm">
            Change Password
          </label>
          <Input
            type="password"
            className="rounded rounded-full"
            // className="autofill:bg-yellow-200 mx-2 text-sm h-8 focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-1 px-5 text-normal w-full"
            placeholder="password"
            {...formik.getFieldProps("password")}
            onChange={formik.handleChange}
            name="password"
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error text-xs text-red-500 ml-5 pt-2">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div>
          <Button
            disabled={isLoading}
            type="submit"
            className={cn(
              "text-white mt-4 h-10 w-full text-sm rounded-full py-2 hover:bg-[#FF599B]/90 mt-5 w-24",
              isLoading ? "bg-[#FF8AB3]" : "bg-primary"
            )}
          >
            {isLoading ? (
              <Loader2 className="ml-2 h-full w-full animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyAccountContent;
