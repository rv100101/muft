import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "./layout";

const SettingsPage = () => {
  return (
    <AuthenticatedLayout>
      <div className="w-full flex flex-col items-center justify-start">
        <div className="flex flex-row w-3/4 border justify-between lg:p-5 py-2 lg:border-b">
          <p className="font-semibold w-full h-max">SETTINGS</p>
        </div>
        <div className="flex w-3/4 h-full border-r">
          <div className="w-48 flex flex-col border-x h-full">
            <Button className="w-full" variant={"ghost"}>
              <p>My Subscription</p>
            </Button>
            <Button className="w-full" variant={"ghost"}>
              <p>My Account</p>
            </Button>
            <Button className="w-full" variant={"ghost"}>
              <p>Display Setting</p>
            </Button>
            <Button className="w-full" variant={"ghost"}>
              <p>Push Notification</p>
            </Button>
            <Button className="w-full" variant={"ghost"}>
              <p>Deactivate your Account</p>
            </Button>
          </div>
          <div></div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SettingsPage;
