import Logo from "@/assets/logo.svg";
import LogoWhite from "@/assets/logo-white.svg";
import Copyright from "@/components/copyright";
import Background from "@/assets/under_maintenance/background.svg";
import Construction from "@/assets/under_maintenance/construction.svg";

const UnderMaintenancePage = () => {
  return (
    <>
      <img
        className="h-full object-cover w-full absolute z-0 block lg:hidden"
        src={Background}
        alt="pink background"
      />
      <div className="h-screen flex flex-col items-center justify-end md:justify-center lg:justify-between py-12 lg:py-0 w-full lg:grid lg:grid-flow-col z-20 relative">
        <section className="p-8 text-right md:text-left lg:pt-48 lg:pb-32 lg:pl-36 flex flex-col lg:h-full w-max items-start justify-between ">
          <div className="space-y-2">
            <div className="flex justify-end md:justify-start">
              <img className="w-36 hidden md:flex" src={Logo} alt="Logo" />
              <img className="w-24 flex md:hidden" src={LogoWhite} alt="Logo" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-5xl lg:w-96 font-bold lg:font-semibold text-[#1B2950]">
              Website under Maintenance
            </h1>
          </div>
          <Copyright />
        </section>
        <div className="relative flex items-center justify-center overflow-y-clip overflow-x-visible">
          <img
            className="lg:absolute h-full z-20 w-full p-8 lg:p-0 md:w-[720px] lg:w-full lg:right-24"
            src={Construction}
            alt="construction illustrations"
          />
          <img
            className="h-screen w-full object-cover hidden lg:block"
            src={Background}
            alt="pink background"
          />
        </div>
      </div>
    </>
  );
};

export default UnderMaintenancePage;
