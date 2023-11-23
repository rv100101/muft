import AboutPlaceholderImg from "@/assets/about-placeholder.png";
import AboutPinkBgShape from "@/assets/about-image-bg.png";
import Cta from "@/components/cta";
const AboutPage = () => {
  return (
    <div>
      <div id="header" className="p-8 lg:p-16 bg-secondaryBackground">
        <h1 className="text-center font-semibold text-3xl sm:text-6xl text-[#1B2950]">
          About us
        </h1>
      </div>
      <div id="section1" className="w-full flex justify-center mt-8 lg:mt-16">
        <div className="md:grid flex flex-col md:gap-24 md:grid md:grid-cols-2 md:px-32">
          <div className="relative flex justify-center sm:items-center">
            <img src={AboutPlaceholderImg} className="h-4/5 sm:h-min" />
            <img
              className="hidden sm:block absolute justify-center translate-x-8 translate-y-8 sm:translate-x-12 sm:translate-y-[60px] h-3/4 sm:h-min"
              src={AboutPlaceholderImg}
            />
          </div>
          <div className="space-y-4 px-4 sm:px-0">
            <p className="font-semibold text-2xl sm:text-5xl text-[#1B2950] sm:pt-12">
              About Muffin
            </p>
            <p className="sm:text-lg font-light text-sm">
              Muffin is where we transform the landscape of modern dating. In a
              world of fleeting swipes and transient connections, Muffin stands
              as a beacon for those seeking meaningful relationships and lasting
              love. Join us on a journey where every swipe is a step closer to
              romance, and every match is an opportunity for something
              beautiful.
            </p>
            <p className="sm:text-lg font-light text-sm">
              At Muffin, we believe in the power of connection. We understand
              that true chemistry extends beyond a profile picture. It's about
              shared interests, values, and dreams. Our advanced algorithm
              doesn't just offer matches; it curates potential life partners by
              focusing on deep compatibility. It's not about the quantity of
              connections, but the quality of the bonds you form.
            </p>
          </div>
        </div>
      </div>
      <div id="section2" className="w-full flex justify-center mt-8 sm:mt-16">
        <div className="px-4 md:px-0 md:grid flex flex-col md:gap-24 md:grid md:grid-cols-2 md:px-32">
          <div className="space-y-4 flex flex-col justify-end sm:pl-32 sm:justify-center">
            <p className="font-semibold text-2xl sm:text-5xl text-[#1B2950]">
              Our Promise
            </p>
            <p className="text-sm sm:text-lg font-light">
              Muffin is more than just a dating platform; it's a platform for
              love, connection, and genuine relationships. We're dedicated to
              helping you find someone who not only matches your interests but
              resonates with your heart. It's time to turn swipes into lasting
              connections and moments into memories.
            </p>{" "}
            <p className="text-sm sm:text-lg font-light">
              Join Muffin today and embark on a journey where love is just a
              swipe away. Let's redefine the rules of romance and make every
              moment count in your quest for love.
            </p>
          </div>
          <div className="relative flex justify-center items-center sm:justify-center">
            <img src={AboutPinkBgShape} />
            <img
              className="absolute h-48 sm:h-1/2"
              src={AboutPlaceholderImg}
            />
          </div>
        </div>
      </div>
      <div className="bg-[#FF7AAF]">
        <Cta />
      </div>
    </div>
  );
};

export default AboutPage;
