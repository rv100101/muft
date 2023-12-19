import Subscription from "@/assets/settings/subscription/subscription.png";
import Logo from "@/assets/settings/subscription/logo.svg";

const SubscriptionContent = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center text-[#727272] space-y-5 p-5">
      <p className="font-medium text-[#727272] text-center text-lg">
        My Subscription
      </p>
      <p className="font-normal text-[#727272] text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      {/* payment */}
      <div className="flex flex-col rounded-lg w-full justify-between border p-5 ">
        <p className="font-medium text-[#727272]  text-lg">Payment method</p>
        <div className="flex flex-row items-end border-b py-5">
          <p className="font-normal text-[#727272] text-sm pr-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <img src={Subscription}></img>
        </div>
        <p className="text-primary text-sm pt-5 hover:cursor-pointer">
          Manage Payment method
        </p>
        {/* <p>Dark Mode</p>
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
      </div>

      <div className="flex flex-col rounded-lg w-full justify-between border p-5 ">
        <p className="font-medium text-[#727272]  text-lg">Subscriptions</p>
        <p className="font-normal text-[#727272] text-sm pr-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
        <div className="flex flex-row justify-between border-b py-10 px-5">
          <img src={Logo}></img>
          <div className="flex flex-col">
            <p className="font-bold text-md">Muffin Plus</p>
            <p className="text-sm">Renews on Jul 07, 2024</p>
          </div>
        </div>
        <p className="text-primary text-sm pt-5 hover:cursor-pointer">
          Manage Subscriptions
        </p>
        {/* <p>Dark Mode</p>
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
      </div>
    </div>
  );
};

export default SubscriptionContent;
