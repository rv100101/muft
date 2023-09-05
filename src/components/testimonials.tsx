import OkPhone from "@/assets/okay-phone.svg";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Testimonials = () => {
  return (
    <section className="mt-8 md:mt-12">
      <div className="grid md:grid-cols-3 relative gap-4">
        <div className="hidden relative md:flex md:flex-col">
          <img
            className="absolute flex md:w-48 lg:w-full"
            src={OkPhone}
            alt="ok illustration"
          />
        </div>

        <div className="space-y-4 col-span-2 text-secondary">
          <p className="font-bold text-3xl md:text-4xl mt-12 text-secondary text-center md:text-left">
            Customer testimonials
          </p>
          <p className="text-center md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 items-center justify-center">
            <div className="text-center space-y-2 bg-secondaryBackground p-4 rounded-lg">
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique."
              </p>
              <p className="font-semibold">Name Surname</p>
            </div>
            <div className="text-center space-y-2 bg-secondaryBackground p-4 rounded-lg">
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique."
              </p>
              <p className="font-semibold">Name Surname</p>
            </div>
          </div>
          <div className="flex space-x-2 justify-center md:justify-start items-center">
            <Button className={cn("rounded-full h-2 p-0 w-2 bg-black")} />
            <Button
              className={cn(
                "rounded-full h-2 p-0 w-2 hover:bg-black bg-[#8D8D8D]"
              )}
            />
            <Button
              className={cn(
                "rounded-full h-2 p-0 w-2 hover:bg-black bg-[#8D8D8D]"
              )}
            />
            <Button
              className={cn(
                "rounded-full h-2 p-0 w-2 hover:bg-black bg-[#8D8D8D]"
              )}
            />
            <Button
              className={cn(
                "rounded-full h-2 p-0 w-2 hover:bg-black bg-[#8D8D8D]"
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
