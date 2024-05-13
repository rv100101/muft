import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/zustand/settings/displaySettingsStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import neutral from "@/assets/profile/ellipse.svg"
import light from "@/assets/profile/light.svg"
import dark from "@/assets/profile/dark.svg";

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

  useEffect(() => {
    if (displaySettings?.darkModeSwitch) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
    if (displaySettings?.lightModeSwitch) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [displaySettings, toggleSystemDark]);

  return (
    <div className="flex overflow-clip flex-col border border-primary w-full h-max rounded-[16px] border-b justify-center items-center text-[#727272] space-y-2">
      <div className="flex w-full bg-primary">
        <p className="text-lg py-[12px] pl-4 text-white">{t("settings.displaySettings")}</p>
      </div>
      <p className="font-medium pt-5 px-4 self-start">{t("settings.theme")}</p>
      <div className="flex justify-center items-center flex-wrap gap-4 w-full h-full p-8 sm:p-16">
        <button onClick={
          () =>
            toggleAutoMode({
              darkModeSwitch: false,
              lightModeSwitch: false,
              autoModeSwitch: true,
            })
        }>
          <div className={cn("dark:hover:border-primary dark:border  rounded-sm border space-y-2 p-8 h-24 w-24 dark:hover:text-white sm:h-[120px] sm:w-[120px] flex flex-col items-center justify-center",
            displaySettings?.autoModeSwitch && "border-primary border-2 bg-[#FFF0F6]"
          )}>
            <img className="sm:w-[40px] sm:h-[40px]" src={neutral} />
            <p className="text-sm">Default</p>
          </div>
        </button>
        <button
          onClick={
            () =>
              toggleLightMode({
                darkModeSwitch: false,
                lightModeSwitch: true,
                autoModeSwitch: false,
              })

          }
        >
          <div className={cn("dark:hover:border-primary dark:border dark:hover:text-white rounded-sm space-y-2 border p-8 h-24 w-24 sm:h-[120px] sm:w-[120px] flex flex-col items-center justify-center",
            displaySettings?.lightModeSwitch && "border-primary border-2 bg-[#FFF0F6]"
          )}>
            <img className="sm:w-[40px] sm:h-[40px]" src={light} />
            <p className="text-sm">Light</p>
          </div>
        </button>
        <button
          onClick={
            () =>
              toggleDarkMode({
                darkModeSwitch: true,
                lightModeSwitch: false,
                autoModeSwitch: false,
              })

          }

        >
          <div className={cn("rounded-sm  space-y-2 border p-8 h-24 w-24 sm:h-[120px] dark:hover:border-primary dark:border sm:w-[120px] flex flex-col items-center justify-center",
            displaySettings?.darkModeSwitch && "border-primary border-2 bg-transparent"
          )}>
            <img className="w-[40px] h-[40px]" height={40} src={dark} />
            <p className="text-sm">Dark</p>
          </div>
        </button>
        <div
          className={cn(
            "flex flex-row w-full justify-center ",
            i18n.language == "ar"
              ? "space-x-reverse space-x-3"
              : "lg:space-x-3 space-x-3"
          )}
        >
        </div>
      </div>
    </div>
  );
};

export default DisplayContent;
