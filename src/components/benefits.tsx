import { motion } from "framer-motion";

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
        Short headline about the benefit of using your product or service
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="text-center text-secondary text-sm md:px-32"
      >
        Highlight the Unique Selling Proposition (USP) with a short summary of
        the main feature and how it benefits customers. The idea here is to keep
        it short and direct. If the visitor wishes to learn more they will hit
        the button.
      </motion.p>
    </div>
  );
};

export default Benefits;
