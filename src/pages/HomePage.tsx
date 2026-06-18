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

  useEffect(() => {
    if (exercises.length === 0) {
      fetchExercises();
    }
  }, [exercises.length, fetchExercises]);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-rose-50 to-white flex flex-col ${isMobile ? "" : "mt-15"}`}>
      <div className="flex-1 relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6">
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-red-600 tracking-tight leading-tight text-balance mb-3">
            Train Smarter,
            <br />
            <span className="text-rose-500">Stay Consistent.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base sm:text-lg font-medium max-w-xl leading-relaxed"
          >
            {currentStreak > 0
              ? `You're on a ${currentStreak}-day streak — keep the momentum going!`
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className={`w-full py-5 border-t border-gray-100 text-center text-sm mt-auto ${isMobile ? "mb-20" : ""}`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-2 px-4">
          <p className="text-gray-400 font-medium">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://github.com/LakBud/Fitoras"
              className="text-rose-500 hover:text-rose-600 transition-colors underline underline-offset-2"
            >
              Fitoras
            </a>
            . All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;
