import { Switch } from "@/components/ui/switch";

const DisplayContent = () => {
  return (
    <div className="flex flex-col  w-full h-full justify-center text-[#727272] space-y-2 p-5">
      <p className="font-semibold">Display Settings</p>
      <p className="font-medium">Theme</p>
      <div className="flex flex-row w-full justify-between">
        <p>Dark Mode</p>
        <Switch id="airplane-mode" />
        {/* <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
      </div>
      <p className="pt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </p>
    </div>
  );
};

export default DisplayContent;
