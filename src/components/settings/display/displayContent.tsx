import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

const DisplayContent = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [isLightMode, setLightMode] = useState(true);

  // const handleSwitchClick = () => {
  //   // Toggle darkMode state
  //   setDarkMode((prevDarkMode) => !prevDarkMode);
  // };
  useEffect(() => {
    if (isDarkMode) {
      console.log("darkMode 😀: ", isDarkMode);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      console.log("darkMode 😁: ", isDarkMode);
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode, isLightMode]);

  // const darkModeActive = () => {
  //   return document.documentElement.classList.contains("dark");
  // };
  return (
    <div className="flex flex-col  w-full border-b justify-center text-[#727272] space-y-2 px-5 py-10">
      <p className="font-semibold">Display Settings</p>
      <p className="font-medium pt-5">Theme</p>
      <div className="flex flex-row justify-center border rounded-lg p-5">
        <div className="flex flex-row w-full justify-center space-x-3">
          <p>Light</p>
          <Switch
            id="airplane-mode2"
            checked={isLightMode}
            onCheckedChange={(state) => {
              setDarkMode(!state);
              setLightMode(state);
            }}
          />
          {/* <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
        </div>
        <div className="flex flex-row w-full justify-center space-x-3">
          <p>Dark</p>
          <Switch
            id="dark-switch"
            checked={isDarkMode}
            onCheckedChange={(state) => {
              setDarkMode(state);
              setLightMode(!state);
            }}
          />
          {/* <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
        </div>
        <div className="flex flex-row w-full justify-center space-x-3">
          <p>Auto</p>
          <Switch id="airplane-mode" />
          {/* <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
        </div>
      </div>
      {/* <p className="pt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </p> */}
    </div>
  );
};

export default DisplayContent;
