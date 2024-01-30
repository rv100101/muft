import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import accountActivationQuery from "@/queries/accountActivation";
import { User, useUserStore } from "@/zustand/auth/user";
import { Loader2, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import "@/index.css";
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
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
const pinSchema = Yup.object().shape({
  pin: Yup.string()
    .required("PIN is required")
    .length(6, "PIN should be exactly 6 digits"),
});

const ActivateAccount = () => {
  const [, i18n] = useTranslation();
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
  const [t] = useTranslation();

  type FormDataType = {
    pin: string;
  };

  useEffect(() => {
    if (count <= 0) {
      stopCountdown();
      resetCountdown();
      setIntervalValue((prev) => prev * 2);
      setCountDownComplete(true);
    }
  }, [count]);

  const handleResendPin = async () => {
    setResendPinIsLoading(true);
    try {
      const res = await accountActivationQuery.resendPin(user!.email_address);

      if (res.data == "") {
        toast({
          variant: "destructive",
          title: t("alerts.somethingWentWrong"),
          description: t("alerts.tryAgainLater"),
        });
      } else {
        toast({
          variant: "success",
          title: t("alerts.successfullySentNewPin"),
          description: t("alerts.checkYourEmail"),
        });
        setCountDownComplete(false);
        startCountdown();
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: t("alerts.somethingWentWrong"),
        description: t("alerts.tryAgainLater"),
      });
    }
    setResendPinIsLoading(false);
  };

  const handleActivate = async ({ pin }: FormDataType) => {
    setActivateIsLoading(true);
    try {
      const res = await accountActivationQuery.activate(
        user!.email_address,
        parseInt(pin)
      );
      if (!res.data.activated) {
        toast({
          duration: 1500,
          variant: "destructive",
          title: t("alerts.pinIsIncorrect"),
          description: t("alerts.tryAgainLater"),
        });
      } else {
        updateUser({ ...user, is_active: true } as User);
        toast({
          duration: 1500,
          title: t("alerts.wellDone"),
          description: t("alerts.accountVerified"),
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: t("alerts.pinIsIncorrect"),
        description: t("alerts.tryAgainLater"),
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
      {({ errors, touched, getFieldProps }) => (
        <Form className="py-5 px-3">
          {/* <div className="h-min w-96 border shadow-xl p-8 space-y-2"> */}
          <p className="w-full text-sm font-semibold pb-2">
            You need to activate your account to unlock all app features.
          </p>
          <p className="w-full text-sm font-semibold pb-2">
            We have sent an Activation PIN to your email.
          </p>
          <p className="my-4 text-sm">Please enter the PIN below:</p>
          <div
            className={`flex items-center justify-center w-full flex-row border rounded-full h-max py-1 px-5 ${touched.pin && errors.pin ? "border-rose-500 p-0" : ""
              }`}
          >
            <Input
              className={cn(
                "appearance-none focus-visible:ring-offset-0 focus-visible:ring-0 border-0 rounded-full py-2 px-5 text-normal focus:outline-0 w-full",
                i18n.language == "ar" && "text-right"
              )}
              {...getFieldProps("pin")}
              name="pin"
              type="number"
              placeholder="Activation PIN"
              autoComplete="off"
            />
          </div>
          {errors.pin ? (
            <p className="text-red-500 text-xs pl-2 pt-3">{errors.pin}</p>
          ) : null}
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
