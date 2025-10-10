import { motion } from "framer-motion";
import { GiClockwork, GiEasel, GiLockedBox } from "react-icons/gi";
import { RiWeightFill } from "react-icons/ri";

const FeatureCards = () => {
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

  return (
    <div>
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
    </div>
  );
};

export default FeatureCards;
