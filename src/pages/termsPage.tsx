import { termsAndConditionsData } from "@/lib/terms";
import { Undo2 } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";

const TermsPage = () => {
  const terms = termsAndConditionsData.map((data, index) => (
    <p key={index}>
      <span className="font-bold">
        {index + 1}. {data.title}:
      </span>{" "}
      {data.description}
    </p>
  ));
  return (
    <div className="space-y-4 md:space-y-8 md:my-8 py-8 px-6 md:rounded-2xl bg-secondaryBackground">
      <Helmet>
        <title>Terms & Conditions</title>
      </Helmet>
      <div className="flex flex-row space-x-5 items-center">
        <Link href="/">
          <Undo2 color="#1B2950" size={30} className="hover:cursor-pointer" />
        </Link>
        <h1 className="text-2xl md:text-4xl font-bold text-[#1B2950]">
          Terms & Conditions
        </h1>
      </div>
      <div className="text-[#212529] space-y-4">{terms}</div>
    </div>
  );
};

export default TermsPage;
