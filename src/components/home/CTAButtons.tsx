import { motion } from "framer-motion";
import { BsLightningChargeFill } from "react-icons/bs";
import { GiCalendar, GiMuscleUp } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const CTAButtons = () => {
  const navigate = useNavigate();

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
    <div>
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
    </div>
  );
};

export default CTAButtons;
