import { motion } from "framer-motion";
import { GiClockwork, GiEasel, GiLockedBox } from "react-icons/gi";
import { RiWeightFill } from "react-icons/ri";

const FeatureCards = () => {
  const features = [
    {
      icon: <RiWeightFill />,
      title: "800+ Exercises",
      description: "Explore a massive collection of exercises targeting every muscle group with detailed guides.",
      accent: "bg-rose-500",
      lightBg: "bg-rose-50",
      iconText: "text-rose-500",
      span: "sm:col-span-2",
    },
    {
      icon: <GiLockedBox />,
      title: "Secure & Local",
      description: "Your data stays on your device. Fully private, no accounts required.",
      accent: "bg-orange-500",
      lightBg: "bg-orange-50",
      iconText: "text-orange-500",
      span: "",
    },
    {
      icon: <GiEasel />,
      title: "Simple & Easy",
      description: "No complex UI — just fitness & you.",
      accent: "bg-red-500",
      lightBg: "bg-red-50",
      iconText: "text-red-500",
      span: "",
    },
    {
      icon: <GiClockwork />,
      title: "Fast & Responsive",
      description: "Smooth performance on any device, instantly accessible anytime, anywhere.",
      accent: "bg-amber-500",
      lightBg: "bg-amber-50",
      iconText: "text-amber-500",
      span: "sm:col-span-2",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full mb-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-rose-500">Why Fitoras?</h2>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ y: -4 }}
            className={`group bg-white rounded-2xl p-6 shadow-sm border  border-gray-100 hover:shadow-md transition-all flex flex-col gap-4 ${feature.span}`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`${feature.lightBg} ${feature.iconText} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}
              >
                {feature.icon}
              </div>
              <div
                className={`w-2 h-2 rounded-full ${feature.accent} opacity-60 group-hover:opacity-100 transition-opacity mt-1`}
              />
            </div>
            <div>
              <h3 className="text-rose-700 font-bold text-base sm:text-lg mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default FeatureCards;
