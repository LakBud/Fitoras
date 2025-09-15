import { GiPowerLightning } from "react-icons/gi";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6">
      {/* Logo + Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-3 mb-6 mt-10"
      >
        <GiPowerLightning className="text-red-500 text-7xl drop-shadow-lg" />
        <h1 className="text-6xl font-extrabold text-red-500 drop-shadow-md tracking-wide">Fitoras</h1>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-20 text-gray-500 text-sm mb-6"
      >
        © {new Date().getFullYear()} Fitoras. All rights reserved.
      </motion.footer>
    </div>
  );
};

export default HomePage;
