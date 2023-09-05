import GooglePlay from "@/assets/google-play.svg";
import AppStore from "@/assets/app-store.svg";

const Cta = () => {
  return (
    <div className="mx-8 lg:mx-[200px] mt-8 md:mt-12">
      <div className="grid lg:grid-cols-3 relative gap-4 py-14 md:py-28">
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
            <a href="https://play.google.com/store/apps" target="_blank">
              <img width={170} src={GooglePlay} alt="google play" />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank">
              <img width={160} src={AppStore} alt="app store" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
