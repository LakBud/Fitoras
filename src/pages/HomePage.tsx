import { GiPowerLightning } from "react-icons/gi";
import { motion } from "framer-motion";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import StatCards from "@/components/home/StatCards";
import FeatureCards from "@/components/home/FeatureCards";
import CTAButtons from "@/components/home/CTAButtons";
import useBreakpoint from "@/hooks/ui/useBreakpoint";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useEffect } from "react";

const HomePage = () => {
  const { exercises, fetchExercises } = useExerciseStore();
  const { isMobile } = useBreakpoint();
  const { currentStreak } = useDashboardStats();

  // Fetch exercises on first mount if not loaded
  useEffect(() => {
    if (exercises.length === 0) {
      fetchExercises();
    }
  }, [exercises.length, fetchExercises]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 flex flex-col ${isMobile ? "" : "mt-15"}`}
    >
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-rose-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-red-300 rounded-full blur-3xl"
        />
      </div>

      <div className="flex-1 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 text-center"
        >
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-4 sm:gap-5 mb-5">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="flex-shrink-0"
            >
              <GiPowerLightning className="text-red-500 text-6xl sm:text-7xl md:text-8xl drop-shadow-xl" />
            </motion.div>

            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-red-600 tracking-tight">Fitoras</h1>
              <p className="text-gray-600 text-base sm:text-lg font-semibold mt-1">Your Fitness Dashboard</p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-red-700 text-lg sm:text-xl font-semibold max-w-3xl mx-auto leading-relaxed"
          >
            {currentStreak > 0
              ? `You're on a ${currentStreak}-day streak! Keep it up!`
              : "Ready to crush your fitness goals? Let's get started!"}
          </motion.p>
        </motion.header>

        {/* CTA Buttons */}
        <CTAButtons />

        {/* Stat Cards */}
        <StatCards />

        {/* Feature Cards */}
        <FeatureCards />
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className={`w-full py-4 bg-red-200 text-gray-800 text-center text-sm mt-auto ${isMobile ? "mb-18" : ""}`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3 px-4">
          <p className="font-semibold">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/LakBud/Fitoras"
              className="text-rose-800 hover:text-rose-900 transition-colors duration-200 text-decoration-line: underline"
            >
              Fitoras
            </a>
            . All rights reserved.
          </p>

          <p className="text-xs font-semibold md:text-sm mt-1 md:mt-0">
            Developed by{" "}
            <a
              href="https://github.com/LakBud/"
              className="text-orange-800 hover:text-orange-900 transition-colors duration-200 text-decoration-line: underline"
            >
              Buddo
            </a>
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;
