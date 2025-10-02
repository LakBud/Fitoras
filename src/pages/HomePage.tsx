import { GiClockwork, GiEasel, GiLockedBox, GiMuscleUp, GiPowerLightning } from "react-icons/gi";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <GiMuscleUp />,
      title: "800+ Exercises",
      description: "Explore a massive collection of exercises targeting every muscle group.",
      color: "bg-gradient-to-tr from-rose-400 to-rose-500",
      iconColor: "text-white",
    },
    {
      icon: <GiLockedBox />,
      title: "Secure & Local",
      description: "Your data stays on your device. Fully secure and private.",
      color: "bg-gradient-to-tr from-rose-500 to-rose-600",
      iconColor: "text-white",
    },
    {
      icon: <GiEasel />,
      title: "Simple & Easy",
      description: "No complex UI/UX, it's only Fitness & You.",
      color: "bg-gradient-to-tr from-rose-300 to-rose-400",
      iconColor: "text-white",
    },
    {
      icon: <GiClockwork />,
      title: "Fast & Responsive",
      description: "Smooth performance on any device, instantly accessible anytime.",
      color: "bg-gradient-to-tr from-rose-200 to-rose-300",
      iconColor: "text-white",
    },
  ];

  const quickActions = [
    { label: "Browse Exercises", path: "/exercises", gradient: "from-rose-500 to-red-600" },
    { label: "Start Workout", path: "/workout", gradient: "from-red-500 to-rose-600" },
    { label: "View Progress", path: "/progress", gradient: "from-rose-400 to-red-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 via-rose-100 to-rose-200 px-6 py-10">
      {/* Logo + Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-4 mb-6 mt-10"
      >
        <GiPowerLightning className="text-red-500 text-8xl drop-shadow-lg animate-pulse" />
        <h1 className="text-6xl md:text-7xl font-extrabold text-red-600 drop-shadow-md tracking-tight">Fitoras</h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="text-center mb-8 max-w-2xl"
      >
        <h2 className="text-red-600 text-xl md:text-2xl font-semibold">
          Transform your fitness journey with exercises and features designed for every level.
        </h2>
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {quickActions.map((action, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.path)}
            className={`px-8 py-4 rounded-full bg-gradient-to-r ${action.gradient} text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all`}
          >
            {action.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-4 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-2 hover:scale-105 cursor-default bg-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 + i * 0.1 }}
          >
            <div className={`p-6 rounded-full ${feature.color} flex items-center justify-center shadow-lg`}>
              {React.cloneElement(feature.icon, { className: `${feature.iconColor} text-5xl` })}
            </div>
            <h3 className="text-gray-800 font-bold text-lg text-center">{feature.title}</h3>
            <p className="text-gray-600 text-center text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats or Recent Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-16 w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Fitness At A Glance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl">
            <p className="text-4xl font-bold text-red-600 mb-2">0</p>
            <p className="text-gray-700 font-medium">Workouts Completed</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl">
            <p className="text-4xl font-bold text-red-600 mb-2">0</p>
            <p className="text-gray-700 font-medium">Exercises Tried</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl">
            <p className="text-4xl font-bold text-red-600 mb-2">0</p>
            <p className="text-gray-700 font-medium">Days Active</p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="mt-16 text-gray-500 text-sm mb-6 text-center"
      >
        © {new Date().getFullYear()} Fitoras. All rights reserved.
      </motion.footer>
    </div>
  );
};

export default HomePage;
