import Logo from "@/assets/logo.svg";
import Copyright from "@/components/copyright";
import Background from "@/assets/under_maintenance/background.svg";
import Construction from "@/assets/under_maintenance/construction.svg";

const UnderMaintenancePage = () => {
  return (
    <div className="h-screen w-full grid grid-flow-col">
      <section className="pt-48 pb-32 pl-24 flex flex-col h-full w-full items-start justify-between ">
        <div className="space-y-2">
          <img className="w-36" src={Logo} alt="Logo" />
          <h1 className="text-5xl w-96 font-semibold text-[#1B2950]">
            Website under Maintenance
          </h1>
        </div>
        <Copyright />
      </section>
      <div className="relative flex items-center justify-center">
        <img
          className="absolute z-20 w-3/4"
          src={Construction}
          alt="construction illustrations"
        />
        <img
          className="h-screen w-full"
          src={Background}
          alt="pink background"
        />
      </div>
    </div>
  );
};

export default UnderMaintenancePage;
