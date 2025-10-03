import { GiPowerLightning, GiMuscleUp, GiTrophy, GiCalendar, GiLockedBox, GiEasel, GiClockwork } from "react-icons/gi";
import { BsFire, BsLightningChargeFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";

import { useSplitsStore } from "@/stores/splits/useSplitStore";
import { useCalendarStore } from "@/stores/useCalendarStore";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { formatDateKey } from "@/lib/calendar";
import { RiWeightFill } from "react-icons/ri";

const HomePage = () => {
  const navigate = useNavigate();
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

  const features = [
    {
      icon: <RiWeightFill />,
      title: "800+ Exercises",
      description: "Explore a massive collection of exercises targeting every muscle group.",
      color: "bg-gradient-to-tr from-rose-400 to-rose-500",
      iconColor: "text-white",
    },
    {
      icon: <GiLockedBox />,
      title: "Secure & Local",
      description: "Your data stays on your device. Fully secure and private.",
      color: "bg-gradient-to-tr from-rose-400 to-rose-500",
      iconColor: "text-white",
    },
    {
      icon: <GiEasel />,
      title: "Simple & Easy",
      description: "No complex UI/UX, it's only Fitness & You.",
      color: "bg-gradient-to-tr from-rose-400 to-rose-500",
      iconColor: "text-white",
    },
    {
      icon: <GiClockwork />,
      title: "Fast & Responsive",
      description: "Smooth performance on any device, instantly accessible anytime.",
      color: "bg-gradient-to-tr from-rose-400 to-rose-500",
      iconColor: "text-white",
    },
  ];

  const quickActions = [
    {
      label: "Create Splits",
      path: "/splits",
      icon: <BsLightningChargeFill />,
      gradient: "from-rose-500 to-red-600",
    },
    {
      label: "Browse Exercises",
      path: "/exercise",
      icon: <GiMuscleUp />,
      gradient: "from-red-500 to-rose-600",
    },
    {
      label: "View Calendar",
      path: "/calendar",
      icon: <GiCalendar />,
      gradient: "from-rose-500 to-red-600",
    },
  ];

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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-14"
        >
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.path)}
              className={`flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-gradient-to-r ${action.gradient} text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all`}
            >
              <span className="text-2xl">{action.icon}</span>
              {action.label}
            </motion.button>
          ))}
        </motion.div>

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

        {/* 🌟 Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 text-center mb-12">
            Why Choose <span className="bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">Fitoras</span>
          </h2>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.5,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 10 },
                  show: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{
                  y: -8,
                  scale: 1.04,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="group flex flex-col items-center text-center gap-4 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-white/60 transition-all hover:shadow-2xl"
              >
                {/* Icon with hover animation */}
                <motion.div className={`p-3 rounded-full ${feature.color} shadow-md flex items-center justify-center`}>
                  <div className={`${feature.iconColor} text-4xl`}>{feature.icon}</div>
                </motion.div>

                <h3 className="text-gray-800 font-semibold text-lg sm:text-xl">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-[18rem]">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

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
