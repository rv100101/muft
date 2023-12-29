// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import OneSignal from "react-onesignal";

const PushNotifcationContent = () => {
  console.log(OneSignal.User.PushSubscription.optedIn);

  return (
    <div className="flex flex-col border-b w-full justify-center text-[#727272] space-y-5 px-5 py-10">
      <p className="font-semibold text-lg">Notifications</p>
      {/* <p className="font-medium text-md">Push Notifications</p> */}
      <div className="flex flex-row w-full  justify-between items-center">
        <p className="font-normal text-md">Enable Push notifications</p>
        <Switch
          id="airplane-mode"
          checked={OneSignal.User.PushSubscription.optedIn}
          onCheckedChange={(checked) => {
            checked
              ? OneSignal.User.PushSubscription.optIn()
              : OneSignal.User.PushSubscription.optOut();
          }}
        />
        {/* <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
      </div>
      {/* <div className="flex flex-col space-y-3  border-b py-5">
        <p className="font-medium text-md">Messages</p>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Off</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">From profiles I follow</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">From Everyone</Label>
          </div>
        </RadioGroup>
      </div> */}

      {/* <div className="flex flex-col space-y-3">
        <p className="font-medium text-md mt-5">Follower Request</p>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Off</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">From profiles I follow</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">From Everyone</Label>
          </div>
        </RadioGroup>
      </div> */}
    </div>
  );
};

export default PushNotifcationContent;
