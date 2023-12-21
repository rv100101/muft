import { Switch } from "@/components/ui/switch";
import { useSettingsStore } from "@/zustand/settings/displaySettingsStore";
import { useEffect } from "react";

const DisplayContent = () => {
  const toggleDarkMode = useSettingsStore(
    (state) => state.toggleDarkModeSwitch
  );
  const toggleLightMode = useSettingsStore(
    (state) => state.toggleLightModeSwitch
  );
  const toggleAutoMode = useSettingsStore(
    (state) => state.toggleAutoModeSwitch
  );
  const toggleSystemDark = useSettingsStore((state) => state.toggleSystemDark);
  const displaySettings = useSettingsStore((state) => state.settings);
  const systemDark = useSettingsStore((state) => state.systemDark);

  useEffect(() => {
    if (displaySettings?.darkModeSwitch) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (displaySettings?.lightModeSwitch) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        // setSystemDark(true);
        toggleSystemDark(true);
        // User prefers dark mode
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        // setSystemDark(false);
        toggleSystemDark(false);
        // User prefers light mode
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, [displaySettings, toggleSystemDark]);

  return (
    <div className="flex flex-col  w-full border-b justify-center text-[#727272] space-y-2 px-5 py-10">
      <p className="font-semibold">Display Settings</p>
      <p className="font-medium pt-5">Theme</p>
      <div className="flex flex-row justify-center border rounded-lg p-5 space-x-2 lg:space-x-0">
        <div className="flex flex-row w-full justify-center lg:space-x-3 space-x-2">
          <p>Light</p>
          <Switch
            id="airplane-mode2"
            checked={displaySettings?.lightModeSwitch}
            onCheckedChange={(state) =>
              toggleLightMode({
                darkModeSwitch: !state,
                lightModeSwitch: state,
                autoModeSwitch: false,
              })
            }
          />
          {/* <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
        </div>
        <div className="flex flex-row w-full justify-center lg:space-x-3 space-x-2 ">
          <p>Dark</p>
          <Switch
            id="dark-switch"
            checked={displaySettings?.darkModeSwitch}
            onCheckedChange={(state) =>
              toggleDarkMode({
                darkModeSwitch: state,
                lightModeSwitch: !state,
                autoModeSwitch: false,
              })
            }
          />
          {/* <Label htmlFor="airplane-mode">Airplane Mode</Label> */}
        </div>
        <div className="flex flex-row w-full justify-center lg:space-x-3 space-x-2">
          <p>Auto</p>
          <Switch
            id="auto-switch"
            checked={displaySettings?.autoModeSwitch}
            onCheckedChange={(state) =>
              toggleAutoMode({
                darkModeSwitch: !systemDark ? !state : false,
                lightModeSwitch: systemDark ? !state : false,
                autoModeSwitch: state,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayContent;
