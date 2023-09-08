import { motion } from "framer-motion";
import { features } from "@/lib/homepage";

const Benefits = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
        className="font-semibold text-2xl md:text-4xl text-secondary text-center"
      >
        {features.header}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="text-center text-secondary text-sm md:px-32"
      >
        {features.description}
      </motion.p>
    </div>
  );
};

export default Benefits;
