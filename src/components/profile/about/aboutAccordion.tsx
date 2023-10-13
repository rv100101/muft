import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import AboutAccordionContent from "./aboutAccordionContent";

const AboutAccordion = () => {
  return (
    <div className="flex flex-row justify-between">
      <Accordion type="single" collapsible className="w-full underline-0">
        <AccordionItem value="item-1" className="px-5 py-1">
          <AccordionTrigger className="">
            <p className="uppercase font-[500] text-[#727272] no-underline">
              About
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <AboutAccordionContent />
            {/* Yes. It adheres to the WAI-ARIA design pattern. */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AboutAccordion;
