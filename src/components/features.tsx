import FeatureCard from "./featureCard";
import FeatureIcone1 from "@/assets/feature-icon-1.svg";
import FeatureIcone2 from "@/assets/feature-icon-2.svg";
import FeatureIcone3 from "@/assets/feature-icon-3.svg";
import FeatureIcone4 from "@/assets/feature-icon-4.svg";
import FeaturesPhone from "@/assets/features-phone.svg";
import { motion } from "framer-motion";
const Features = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true }}
      className="mt-12"
    >
      <div className="grid grid-cols-3 gap-4 h-max w-full">
        <div className="space-y-8 flex flex-col justify-start">
          <FeatureCard
            title="Describe feature one"
            description="Highlight Unique Selling Propositions with a short summary of the key feature and how it benefits customers."
            img={FeatureIcone1}
          />
          <FeatureCard
            title="Describe feature two"
            description="Highlight Unique Selling Propositions with a short summary of the key feature and how it benefits customers."
            img={FeatureIcone2}
          />
        </div>
        <div className="flex">
          <img src={FeaturesPhone} alt="features phone image" />
        </div>
        <div className="space-y-8 flex flex-col justify-end">
          <FeatureCard
            title="Describe feature three"
            description="Highlight Unique Selling Propositions with a short summary of the key feature and how it benefits customers."
            img={FeatureIcone3}
          />
          <FeatureCard
            title="Describe feature four"
            description="Highlight Unique Selling Propositions with a short summary of the key feature and how it benefits customers."
            img={FeatureIcone4}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
