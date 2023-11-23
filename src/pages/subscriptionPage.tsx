import Cta from "@/components/cta";
import { Button } from "@/components/ui/button";
import HalfPhone from "@/assets/phone-half.png";
import Logo from "@/assets/logo.svg";
import BlackLogo from "@/assets/subscription-logo-black.png";
import { CheckCircle } from "lucide-react";
const SubscriptionPage = () => {
  const checkItems = Array(11).fill(0);

  const muffin = checkItems.map((_, index) => {
    let bg = "#D2D2D2";
    if (index == 0 || index == 1) {
      bg = "#FF599B";
    }
    return (
      <li className="h-8">
        <CheckCircle fill={bg} />
      </li>
    );
  });

  const muffinPlus = checkItems.map((_, index) => {
    return (
      <li className="h-8" key={index}>
        <CheckCircle fill={"#FF599B"} />
      </li>
    );
  });

  return (
    <div>
      <div id="header" className="p-16 bg-secondaryBackground">
        <h1 className="text-center font-semibold text-4xl text-[#1B2950]">
          Subscription Plans
        </h1>
      </div>
      <div className="font-semibold px-8 sm:px-32 mt-12 text-[#1B2950]">
        <h2 className="text-2xl sm:text-4xl">
          What premium subscription Muffin offers?
        </h2>
        <div className="mt-8 grid gird-cols-1 sm:grid-cols-3 bg-[#F5F5F5] p-8 rounded-md">
          <div className="col-span-2 space-y-6 w-3/4 flex flex-col justify-center">
            <p className="text-2xl font-bold">Want more matches?</p>
            <p className="font-light text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <Button className="rounded-full text-lg py-6 px-6 w-max">
              Avail now
            </Button>
          </div>
          <div className="hidden sm:block">
            <img src={HalfPhone} />
          </div>
        </div>
      </div>
      <div className="px-8 sm:px-32 mt-8 space-y-4">
        <p className="font-light text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <p className="font-light text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit duis
          tristique sollicitudin nibh sit amet commodo nulla. At tempor commodo
          ullamcorper a. Tempus imperdiet nulla malesuada pellentesque elit.
          Tortor at auctor urna nunc id cursus metus. Bibendum neque egestas
          congue quisque egestas.
        </p>
      </div>
      <div className="flex space-x-8 justify-center px-8 sm:px-32 mt-4 sm:mt-12 w-screen sm:w-full">
        <div className="flex flex-col items-center p-8">
          <div className="h-10 mb-8" />
          <ul className="space-y-2 text-xs sm:text-base text-[#1B2950] font-medium">
            <li className="h-8">Unlimited Likes</li>
            <li className="h-8">Unlimited Rewind</li>
            <li className="h-8">Hide ads</li>
            <li className="h-8">Passport to any location</li>
            <li className="h-8">See who likes you</li>
            <li className="h-8">Top Picks</li>
            <li className="h-8">Priority Likes</li>
            <li className="h-8">Message before Match</li>
            <li className="h-8">See Likes you've sent</li>
            <li className="h-8">1 Free boost a month</li>
            <li className="h-8">Free super likes</li>
          </ul>
        </div>
        <div className="flex flex-col items-center p-8">
          <img src={Logo} className="h-10 mb-8" />
          <ul className="space-y-2 text-[#1B2950] justify-center text-center">
            {muffin}
          </ul>
        </div>
        <div className="hidden sm:flex sm:flex-col items-center shadow-2xl p-8 rounded-md">
          <img src={BlackLogo} className="h-10 mb-8" />
          <ul className="space-y-2 text-[#1B2950]">
            {muffinPlus}
          </ul>
          <Button className="rounded-full text-xs px-8 mt-8 w-max">
            Avail now
          </Button>
        </div>
      </div>
      {/* Mobile muffin plus */}
      <div className="flex sm:hidden space-x-8 justify-center px-8 sm:px-32 mt-4 sm:mt-12 w-screen sm:w-full">
        <div className="flex flex-col items-center p-4">
          <div className="h-10 mb-12" />
          <ul className="space-y-4 text-xs sm:text-base text-[#1B2950] font-medium">
            <li className="h-8 flex items-center">Unlimited Likes</li>
            <li className="h-8 flex items-center">Unlimited Rewind</li>
            <li className="h-8 flex items-center">Hide ads</li>
            <li className="h-8 flex items-center">Passport to any location</li>
            <li className="h-8 flex items-center">See who likes you</li>
            <li className="h-8 flex items-center">Top Picks</li>
            <li className="h-8 flex items-center">Priority Likes</li>
            <li className="h-8 flex items-center">Message before Match</li>
            <li className="h-8 flex items-center">See Likes you've sent</li>
            <li className="h-8 flex items-center">1 Free boost a month</li>
            <li className="h-8 flex items-center">Free super likes</li>
          </ul>
        </div>
        <div className="flex flex-col sm:hidden items-center shadow-xl p-6 rounded-md">
          <img src={BlackLogo} className="h-min mb-12" />
          <ul className="space-y-4 text-[#1B2950]">
            {muffinPlus}
          </ul>
          <Button className="rounded-full text-xs px-8 mt-8 w-max">
            Avail now
          </Button>
        </div>
      </div>
      <div className="px-8 sm:px-32 space-y-8">
        <p className="font-semibold mt-12 sm:mt-0 text-2xl text-[#1B2950]">
          Muffin vs Muffin Plus?
        </p>
        <p className="font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <p className="font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit duis
          tristique sollicitudin nibh sit amet commodo nulla. At tempor commodo
          ullamcorper a. Tempus imperdiet nulla malesuada pellentesque elit.
          Tortor at auctor urna nunc id cursus metus. Bibendum neque egestas
          congue quisque egestas.
        </p>
        <ul className="font-light list-disc pl-4">
          <li>sagittis id consectetur purus ut</li>
          <li>in dictum non consectetur a</li>
          <li>nam libero justo laoreet sit</li>
          <li>nascetur ridiculus mus mauris vitae</li>
          <li>venenatis urna cursus eget nunc</li>
        </ul>
        <p className="font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla
          facilisi cras fermentum odio eu feugiat pretium nibh. Eget felis eget
          nunc lobortis mattis aliquam faucibus purus. Mauris sit amet massa
          vitae tortor condimentum lacinia. Aliquam malesuada bibendum arcu
          vitae elementum curabitur vitae. Nulla facilisi nullam vehicula ipsum
          a arcu cursus vitae congue. Orci a scelerisque purus semper. Porta non
          pulvinar neque laoreet. Arcu cursus euismod quis viverra nibh cras
          pulvinar mattis. Ultrices tincidunt arcu non sodales neque sodales.
          Quisque id diam vel quam elementum pulvinar etiam non quam. Duis at
          consectetur lorem donec massa sapien faucibus. Malesuada nunc vel
          risus commodo viverra maecenas. Commodo nulla facilisi nullam vehicula
          ipsum. Quisque sagittis purus sit amet volutpat consequat. Nam libero
          justo laoreet sit. Lorem ipsum dolor sit amet consectetur. Id diam
          maecenas ultricies mi eget ma
        </p>
      </div>
      <div className="bg-[#FF7AAF]">
        <Cta />
      </div>
    </div>
  );
};

export default SubscriptionPage;
