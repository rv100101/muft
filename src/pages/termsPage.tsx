import { termsAndConditionsData } from "@/utils/terms";

const TermsPage = () => {
  const terms = termsAndConditionsData.map((data, index) => (
    <p>
      <span className="font-bold">
        {index + 1}. {data.title}:
      </span>{" "}
      {data.description}
    </p>
  ));
  return (
    <div className="space-y-8 my-8 py-8 px-6 rounded-2xl bg-secondaryBackground">
      <h1 className="text-4xl font-bold text-[#1B2950]">Terms & Conditions</h1>
      <div className="text-[#212529] space-y-4">{terms}</div>
    </div>
  );
};

export default TermsPage;
