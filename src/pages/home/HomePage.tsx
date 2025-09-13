import { Link } from "react-router-dom";
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

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl text-gray-600 mb-10 max-w-lg text-center leading-relaxed"
      >
        Push your limits. Track your workouts. Unlock your true potential.
      </motion.p>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Link to="/splits">
          <button className="px-10 py-3 text-lg font-semibold text-white bg-red-500 rounded-2xl shadow-lg hover:bg-red-600 hover:scale-105 transition-transform duration-300">
            Get Started
          </button>
        </Link>
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
