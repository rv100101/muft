import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/zustand/settings/displaySettingsStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const DisplayContent = () => {
  const [t, i18n] = useTranslation();
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
      <p className="font-semibold text-lg">{t("settings.displaySettings")}</p>
      <p className="font-medium pt-5">{t("settings.theme")}</p>
      <div className="flex flex-row justify-around sm:justify-center border-none sm:border rounded-lg py-5 space-x-2 ">
        <div
          className={cn(
            "flex flex-row w-full justify-center ",
            i18n.language == "ar"
              ? "space-x-reverse space-x-3"
              : "lg:space-x-3 space-x-3"
          )}
        >
          <p>{t("settings.light")}</p>
          <Switch
            className={cn(i18n.language == "ar" && "rotate-180")}
            dir="ltr"
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
        <div
          className={cn(
            "flex flex-row w-full justify-center ",
            i18n.language == "ar"
              ? "space-x-reverse space-x-3"
              : "lg:space-x-3 space-x-3"
          )}
        >
          <p>{t("settings.dark")}</p>
          <Switch
            dir="ltr"
            id="dark-switch"
            className={cn(i18n.language == "ar" && "rotate-180")}
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
        <div
          className={cn(
            "flex flex-row w-full justify-center ",
            i18n.language == "ar"
              ? "space-x-reverse space-x-3"
              : "lg:space-x-3 space-x-3"
          )}
        >
          <p>{t("settings.auto")}</p>
          <Switch
            className={cn(i18n.language == "ar" && "rotate-180")}
            dir="ltr"
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
