import { privacyPolicyData } from "@/utils/privacyPolicy";

const PrivacyPolicyPage = () => {
  const policies = privacyPolicyData.map((data, index) => (
    <p>
      <span className="font-bold">
        {index + 1}. {data.title}:
      </span>{" "}
      {data.description}
    </p>
  ));
  return (
    <div className="space-y-4 md:space-y-8 md:my-8 py-8 px-6 rounded-2xl bg-secondaryBackground">
      <h1 className="text-2xl md:text-4xl font-bold text-[#1B2950]">
        Privacy Policy
      </h1>
      <div className="text-[#212529] space-y-4">{policies}</div>
    </div>
  );
};

export default PrivacyPolicyPage;
