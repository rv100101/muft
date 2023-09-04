import GooglePlay from "@/assets/google-play.svg";
import AppStore from "@/assets/app-store.svg";

const Cta = () => {
  return (
    <div className="mx-[200px] mt-12">
      <div className="grid grid-cols-3 relative gap-4 py-28">
        <div className="w-full h-full" />
        <div className="space-y-4 col-span-2 text-secondary">
          <p className="text-4xl font-semibold text-white">
            Short CTA goes here
          </p>
          <p className="text-white font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </p>
          <div className="flex space-x-4">
            <img width={170} src={GooglePlay} alt="google play" />
            <img width={160} src={AppStore} alt="app store" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
