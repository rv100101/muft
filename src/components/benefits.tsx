import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Benefits = () => {
  const [t] = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center space-y-8 mt-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
        className="dark:text-white font-semibold text-2xl md:text-4xl text-secondary text-center"
      >
        {t("landingPage.lifeIsSweeter")}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="dark:text-white text-center text-secondary text-sm md:px-32"
      >
        {t("landingPage.findLastingConnections")}
      </motion.p>
    </div>
  );
};

export default Benefits;
