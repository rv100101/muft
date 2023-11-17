import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import accountActivationQuery from "@/queries/accountActivation";
import { useUserStore } from "@/zustand/auth/user";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
const pinSchema = Yup.object().shape(
  {
    pin: Yup.string().required(),
  },
);

const ActivateAccount = () => {
  const [timer, setTimer] = useState<null | number>(null);
  const [startTimer, setStartTimer] = useState(false);
  const [, setLocation] = useLocation();
  const [resendPinIsLoading, setResendPinIsLoading] = useState(false);
  const [activateIsLoading, setActivateIsLoading] = useState(false);
  useEffect(
    () => {
      if (timer! > 0) {
        setTimer(null);
      }
      if (timer && timer > 0) {
        setTimeout(() => {
          if (startTimer && !resendPinIsLoading) {
            setTimer((prev) => prev! - 1);
          }
        }, 1000);
      }
    },
    [startTimer, timer, resendPinIsLoading],
  );

  const user = useUserStore((state) => state.user);
  const handleResendPin = async () => {
    setResendPinIsLoading(true);
    try {
      setTimer(90);
      const res = await accountActivationQuery.resendPin(user!.email_address);
      console.log(res);
      if (res.data == "") {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again",
        });
        setStartTimer(false);
      } else {
        toast({
          title: "Successfuly sent a new PIN",
          description: "Please check your email",
        });
        setStartTimer(true);
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again",
      });
      console.log(e);
    }
    setResendPinIsLoading(false);
  };

  const handleActivate = async (pin: string) => {
    setActivateIsLoading(true);
    try {
      const res = await accountActivationQuery.activate(
        user!.email_address,
        parseInt(pin),
      );
      console.log(res);
      if (!res.data.activated) {
        toast({
          duration: 1500,
          variant: "destructive",
          title: "The PIN is incorrect!",
          description: "Please try again",
        });
      } else {
        setLocation("/");
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
    <div className="h-[calc(100vh-70px)] items-center justify-center flex md:h-[calc(100vh-104px)] w-full lg:px-32 border-t">
      <Formik
        initialValues={{ pin: "" }}
        validationSchema={pinSchema}
        onSubmit={(values) => {
          handleActivate(values.pin);
        }}
      >
        {({ errors }) => (
          <Form>
            <div className="h-min w-96 border shadow-xl p-8 space-y-2">
              <p className="w-full text-sm font-semibold">
                We sent an Activation PIN to your email<br />Please enter the
                PIN below:
              </p>

              <Field
                name="pin"
                className="w-full decoration-none p-2 border"
                type="number"
                placeholder="Activation PIN"
              />
              {errors.pin
                ? <p className="text-red-500 text-xs">{errors.pin}</p>
                : null}
              <div className="flex w-full justify-end space-x-2 py-4">
                <div className="flex-col items-center w-max h-full">
                  <Button
                    type="button"
                    disabled={(timer && timer <= 90 && timer > 0) ||
                      resendPinIsLoading}
                    onClick={handleResendPin}
                    className="text-xs w-full"
                    variant={"outline"}
                  >
                    Resend PIN{" "}
                    {resendPinIsLoading && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </Button>
                  {startTimer && timer && (
                    <p className="w-full flex justify-center text-xs mt-1">
                      Please wait for {`${timer}s`}
                    </p>
                  )}
                </div>
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
    </div>
  );
};

export default ActivateAccount;