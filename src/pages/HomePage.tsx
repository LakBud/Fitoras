import { GiPowerLightning } from "react-icons/gi";
import { motion } from "framer-motion";

import { useMemo, useEffect } from "react";
import { useSplitsStore } from "@/stores/splits/useSplitStore";
import { useCalendarStore } from "@/stores/useCalendarStore";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { formatDateKey } from "@/lib/calendar";
import StatCards from "@/components/home/StatCards";
import FeatureCards from "@/components/home/FeatureCards";
import CTAButtons from "@/components/home/CTAButtons";

const HomePage = () => {
  const splits = useSplitsStore((state) => state.splits);
  const { completedExercises } = useCalendarStore();
  const { exercises, fetchExercises } = useExerciseStore();

  // Fetch exercises on first mount if not loaded
  useEffect(() => {
    if (exercises.length === 0) {
      fetchExercises();
    }
  }, [exercises.length, fetchExercises]);

  // Compute dashboard stats
  const stats = useMemo(() => {
    const totalSplits = splits.length;

    // --- Current streak ---
    let currentStreak = 0;
    const today = new Date();
    const checkDate = new Date(today);
    while (true) {
      const dateKey = formatDateKey(checkDate);
      const dayExercises = completedExercises[dateKey];
      if (dayExercises !== undefined) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else break;
    }

    // --- Workouts this week ---
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    monday.setHours(0, 0, 0, 0);

    let workoutsThisWeek = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateKey = formatDateKey(date);
      if (completedExercises[dateKey] !== undefined) workoutsThisWeek++;
    }

    // --- Total workouts ---
    const totalWorkouts = Object.keys(completedExercises).length;

    return { totalSplits, currentStreak, workoutsThisWeek, totalWorkouts };
  }, [splits, completedExercises]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200 pb-24">
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
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
            {stats.currentStreak > 0
              ? `You're on a ${stats.currentStreak}-day streak! Keep it up!`
              : "Ready to crush your fitness goals? Let's get started!"}
          </motion.p>
        </motion.header>

        {/* CTA Buttons */}
        <CTAButtons />

        {/* Stat Cards */}
        <StatCards />

        {/* Feature Cards */}
        <FeatureCards />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center text-gray-400 text-sm"
        >
          <p className="font-medium">© {new Date().getFullYear()} Fitoras. All rights reserved.</p>
          <p className="mt-2 text-xs">Transform your fitness journey, one workout at a time.</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default HomePage;
