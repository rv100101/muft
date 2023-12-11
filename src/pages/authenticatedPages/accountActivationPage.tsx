import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import accountActivationQuery from "@/queries/accountActivation";
import { User, useUserStore } from "@/zustand/auth/user";
import { Loader2, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCountdown } from "usehooks-ts";
const pinSchema = Yup.object().shape({
  pin: Yup.string().required(),
});

const ActivateAccount = () => {
  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: intervalValue,
    });
  const [resendPinIsLoading, setResendPinIsLoading] = useState(false);
  const [activateIsLoading, setActivateIsLoading] = useState(false);
  const [countDownComplete, setCountDownComplete] = useState(true);
  const { updateUser, user, reset } = useUserStore();
  type FormDataType = {
    pin: string;
  };

  useEffect(() => {
    if (count <= 0) {
      stopCountdown();
      resetCountdown()
      setIntervalValue((prev) => prev * 2);
      setCountDownComplete(true);
    }
  }, [count]);

  console.log(count);

  const handleResendPin = async () => {
    setResendPinIsLoading(true);
    try {
      const res = await accountActivationQuery.resendPin(user!.email_address);

      if (res.data == "") {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again",
        });
      } else {
        toast({
          variant: "success",
          title: "Successfuly sent a new PIN",
          description: "Please check your email",
        });
        setCountDownComplete(false);
        startCountdown();
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again",
      });
    }
    setResendPinIsLoading(false);
  };

  const handleActivate = async ({ pin }: FormDataType) => {
    setActivateIsLoading(true);
    try {
      const res = await accountActivationQuery.activate(
        user!.email_address,
        parseInt(pin),
      );
      if (!res.data.activated) {
        toast({
          duration: 1500,
          variant: "destructive",
          title: "The PIN is incorrect!",
          description: "Please try again",
        });
      } else {
        updateUser({ ...user, is_active: true } as User);
        toast({
          duration: 1500,
          title: "Well Done",
          description: "Account Verified!",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "The PIN is incorrect!",
        description: "Please try again",
      });
    }
    setActivateIsLoading(false);
  };

  return (
    // <div className="h-[calc(100vh-70px)] items-center justify-center flex md:h-[calc(100vh-104px)] w-full lg:px-32 border-t">
    <Formik
      initialValues={{ pin: "" }}
      validationSchema={pinSchema}
      onSubmit={(values) => {
        handleActivate(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="py-5 px-3">
          {/* <div className="h-min w-96 border shadow-xl p-8 space-y-2"> */}
          <p className="w-full text-sm font-semibold pb-2">
            You need to activate your account to unlock all app features.
          </p>
          <p className="w-full text-sm font-semibold pb-2">
            We have sent an Activation PIN to your email.
          </p>
          <p className="my-4 text-sm">
            Please enter the PIN below:
          </p>
          <div
            className={`flex items-center flex-row border rounded-full h-max py-1 px-5 ${
              touched.pin && errors.pin ? "border-rose-500 p-0" : ""
            }`}
          >
            <Field
              name="pin"
              className="w-full decoration-none text-sm py-2  border-0 outline-0"
              type="number"
              placeholder="Activation PIN"
            />
          </div>
          {errors.pin
            ? <p className="text-red-500 text-xs pl-2 pt-3">{errors.pin}</p>
            : null}
          <div className="flex w-full justify-between items-center space-x-2 py-4">
            {!user?.profile_completed && (
              <Dialog>
                <DialogTrigger>
                  <div className="border p-3 rounded-lg flex space-x-2 my-4">
                    {<LogOutIcon size={20} className="text-primary" />}{" "}
                    <p className="text-sm">Sign out</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md opacity-100">
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to sign out?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start">
                    <Button className="hover:bg-primary" onClick={reset}>
                      Yes
                    </Button>
                    <DialogClose asChild>
                      <Button
                        className="text-white hover:bg-secondary"
                        type="button"
                        variant="secondary"
                      >
                        No
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            <div className="flex justify-center items-center space-x-2">
              <Button
                type="button"
                disabled={resendPinIsLoading || !countDownComplete}
                onClick={handleResendPin}
                className="text-xs w-full"
                variant={"outline"}
              >
                Resend PIN{" "}
                {resendPinIsLoading && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>

              <Button
                disabled={activateIsLoading}
                type="submit"
                className="text-xs hover:bg-[#FF599B]/90"
              >
                Activate{" "}
                {activateIsLoading && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
    // </div>
  );
};

export default ActivateAccount;
