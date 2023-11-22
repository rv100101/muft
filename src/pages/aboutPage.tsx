import AboutPlaceholderImg from "@/assets/about-placeholder.png";
import Cta from "@/components/cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BoxIcon } from "lucide-react";
const AboutPage = () => {
  return (
    <div>
      <div id="header" className="p-16 bg-secondaryBackground">
        <h1 className="text-center font-semibold text-4xl text-[#1B2950]">
          About us
        </h1>
      </div>
      <div id="section1" className="relative w-full mt-8 flex">
        <div className="relative flex flex-row bg-secondaryBackground pl-56 py-16 pr-16 space-y-4 w-3/5 rounded-r-lg">
          <div className="w-3/4 space-y-4 text-[#1B2950]">
            <h2 className="font-semibold text-3xl">
              Medium length section heading goes here
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit
              duis tristique sollicitudin nibh sit amet commodo nulla. At tempor
              commodo ullamcorper a. Tempus imperdiet nulla malesuada
              pellentesque elit. Tortor at auctor urna nunc id cursus metus.
              Bibendum neque egestas congue quisque egestas.
            </p>
          </div>
          <img
            src={AboutPlaceholderImg}
            className="absolute top-10 -right-96 h-96"
          />
        </div>
      </div>
      <div id="section2" className="bg-primary mt-8 text-center p-32">
        <h3 className="font-semibold text-3xl text-white">
          Medium length section heading goes here
        </h3>
        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="space-y-2 flex flex-col justify-center items-center">
            <BoxIcon className="text-white" />
            <p className="text-white font-semibold text-lg">
              Misson
            </p>
            <p className="font-light text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </p>
          </div>{" "}
          <div className="space-y-2 flex flex-col justify-center items-center">
            <BoxIcon className="text-white" />
            <p className="text-white font-semibold text-lg">
              Vision
            </p>
            <p className="font-light text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </p>
          </div>
          <div className="space-y-2 flex flex-col justify-center items-center">
            <BoxIcon className="text-white" />
            <p className="text-white font-semibold text-lg">
              Core Values
            </p>
            <p className="font-light text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </p>
          </div>
        </div>
      </div>
      <div id="FAQ" className="flex justify-center">
        <div className="mt-8 w-1/2 text-[#1B2950] flex flex-col items-center space-y-8">
          <p className="text-4xl font-semibold text-[#1B2950]">FAQs</p>{" "}
          <p className="text-[#1B2950]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
          <div id="accordionFaq" className="w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Question text goes here</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Question text goes here</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Question text goes here</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Question text goes here</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Question text goes here</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <p className="text-2xl font-semibold">Still have a question?</p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <a
            className="border border-primary rounded-full text-md text-primary px-4 py-2"
            href="https://support.softnames.com/"
            target="_blank"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="bg-primary">
        <Cta />
      </div>
    </div>
  );
};

export default AboutPage;
