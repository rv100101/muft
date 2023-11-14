import { MailIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import passwordResetQuery from "@/queries/password_reset";
import { toast } from "../ui/use-toast";
import { usePasswordResetState } from "@/zustand/auth/passwordReset";
const SendResetPin = () => {
  const changePasswordResetState = usePasswordResetState((state)=> state.changeState);
  const setEmail = usePasswordResetState(state => state.setEmail);
  const emailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit(values: { email: string }) {
      sendResetPinMutation.mutate(values);
    },
  });

  const sendResetPinMutation = useMutation(
    {
      mutationFn: passwordResetQuery.getPasswordPin,
      onSuccess: (res) => {
        console.log(res);
        if (typeof res.data == 'string') {
          toast({
            variant: 'destructive',
            title: 'Please try again',
            description: 'Invalid email'
          });
          return; 
        }else{
          if (res.data !== '') {
            changePasswordResetState("VERIFY");
            setEmail(res.data.email_address);
            toast({
              title: 'Password reset pin sent to your email',
              description: "Check your email for the pin to change your password"
            })
          }
        }

      },
    },
  );
  return (
    <form onSubmit={emailForm.handleSubmit}>
      <div className="space-y-4">
        <h1 className="font-bold lg:text-2xl">Reset your password</h1>
        <hr />
        <p>Please enter your email to proceed.</p>
        <div className="flex items-center space-x-2 justify-around border-2 px-4 rounded-full">
          <label htmlFor="email">Email</label>
          <MailIcon />
          <Input
            {...emailForm.getFieldProps("email")}
            id="email"
            name="email"
            type="text"
            placeholder="example@email.com"
            className="border-none focus-visible:ring-offset-0 focus-visible:ring-0"
          />
        </div>
        {emailForm.errors.email &&
          (
            <div className="error text-red-500 text-sm ml-2">
              {emailForm.errors.email}
            </div>
          )}
        <hr />
        <div className="flex space-x-2 justify-end">
          <DialogClose className="hover: border border-primary rounded-md px-2 py-1 text-sm">
            Cancel
          </DialogClose>
          <Button
            disabled={sendResetPinMutation.isLoading}
            className={cn(
              "text-white w-max rounded-md hover:bg-[#FF599B]/90",
            )}
            type="submit"
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  )};

export default SendResetPin;
