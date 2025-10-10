import { formatDateKey } from "@/lib/calendar";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { useSplitsStore } from "@/stores/splits/useSplitStore";
import { useCalendarStore } from "@/stores/useCalendarStore";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { BsFire } from "react-icons/bs";
import { GiCalendar, GiMuscleUp, GiTrophy } from "react-icons/gi";

const StatCards = () => {
  const splits = useSplitsStore((state) => state.splits);
  const { completedExercises } = useCalendarStore();
  const { exercises } = useExerciseStore();

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

  // Dashboard stat cards
  const statCards = [
    {
      icon: <GiMuscleUp />,
      label: "Total Splits",
      value: stats.totalSplits,
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600",
      subtitle: exercises.length > 0 ? `${exercises.length} exercises` : undefined,
    },
    {
      icon: <BsFire />,
      label: "Current Streak",
      value: stats.currentStreak,
      suffix: stats.currentStreak === 1 ? "day" : "days",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      subtitle: stats.currentStreak > 0 ? "Keep going!" : "Start today!",
    },
    {
      icon: <GiCalendar />,
      label: "This Week",
      value: stats.workoutsThisWeek,
      suffix: stats.workoutsThisWeek === 1 ? "workout" : "workouts",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      subtitle: stats.workoutsThisWeek > 0 ? "Nice work!" : "Let's go!",
    },
    {
      icon: <GiTrophy />,
      label: "Total Workouts",
      value: stats.totalWorkouts,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      subtitle: "All time",
    },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-14"
      >
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 sm:p-7 shadow-xl hover:shadow-2xl border border-white/60 transition-all"
          >
            <div
              className={`${stat.bgColor} ${stat.iconColor} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 text-3xl sm:text-4xl shadow-sm`}
            >
              {stat.icon}
            </div>
            <p className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-black leading-none">{stat.value}</p>
              {stat.suffix && <p className="text-gray-600 text-sm sm:text-base font-semibold">{stat.suffix}</p>}
            </div>
            {stat.subtitle && <p className="text-gray-400 text-xs sm:text-sm font-medium mt-2">{stat.subtitle}</p>}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatCards;
