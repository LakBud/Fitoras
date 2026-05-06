import { motion } from "framer-motion";
import { BsFire } from "react-icons/bs";
import { GiCalendar, GiMuscleUp, GiTrophy } from "react-icons/gi";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { useDashboardStats } from "@/hooks/useDashboardStats";

const StatCards = () => {
  const { exercises } = useExerciseStore();
  const stats = useDashboardStats();

  const statCards = [
    {
      icon: <GiMuscleUp />,
      label: "Total Splits",
      value: stats.totalSplits,
      bgColor: "bg-rose-500",
      textAccent: "text-rose-100",
      subtitle: exercises.length > 0 ? `${exercises.length} exercises available` : "No exercises yet",
      progress: Math.min(stats.totalSplits / 10, 1),
    },
    {
      icon: <BsFire />,
      label: "Current Streak",
      value: stats.currentStreak,
      suffix: stats.currentStreak === 1 ? "day" : "days",
      bgColor: "bg-orange-500",
      textAccent: "text-orange-100",
      subtitle: stats.currentStreak > 0 ? "Keep going!" : "Start today!",
      progress: Math.min(stats.currentStreak / 30, 1),
    },
    {
      icon: <GiCalendar />,
      label: "This Week",
      value: stats.workoutsThisWeek,
      suffix: stats.workoutsThisWeek === 1 ? "workout" : "workouts",
      bgColor: "bg-red-500",
      textAccent: "text-red-100",
      subtitle: stats.workoutsThisWeek > 0 ? "Nice work!" : "Let's go!",
      progress: Math.min(stats.workoutsThisWeek / 7, 1),
    },
    {
      icon: <GiTrophy />,
      label: "Total Workouts",
      value: stats.totalWorkouts,
      bgColor: "bg-amber-500",
      textAccent: "text-amber-100",
      subtitle: "All time",
      progress: Math.min(stats.totalWorkouts / 100, 1),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12"
    >
      {statCards.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.07 }}
          whileHover={{ y: -5 }}
          className="relative overflow-hidden bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col gap-3 transition-shadow hover:shadow-md"
        >
          {/* Subtle colored top bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 ${stat.bgColor} rounded-t-2xl`} />

          {/* Icon */}
          <div className={`${stat.bgColor} w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl shadow-sm`}>
            {stat.icon}
          </div>

          {/* Label */}
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-none">{stat.label}</p>

          {/* Value */}
          <div className="flex items-baseline gap-1.5 leading-none">
            <p className="text-gray-900 text-3xl sm:text-4xl font-black">{stat.value}</p>
            {stat.suffix && <p className="text-gray-400 text-sm font-semibold">{stat.suffix}</p>}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className={`h-full ${stat.bgColor} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${(stat.progress ?? 0) * 100}%` }}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.7, ease: "easeOut" }}
            />
          </div>

          {/* Subtitle */}
          {stat.subtitle && (
            <p className="text-gray-400 text-xs font-medium leading-none">{stat.subtitle}</p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatCards;
