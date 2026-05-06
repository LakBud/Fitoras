import { motion } from "framer-motion";
import { BsLightningChargeFill } from "react-icons/bs";
import { GiCalendar, GiMuscleUp } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const CTAButtons = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: "Create Splits",
      description: "Build your workout plan",
      path: "/splits",
      icon: <BsLightningChargeFill />,
      bg: "bg-rose-600 hover:bg-rose-700",
      iconBg: "bg-rose-500",
      primary: true,
    },
    {
      label: "Browse Exercises",
      description: "800+ movements",
      path: "/exercise",
      icon: <GiMuscleUp />,
      bg: "bg-white hover:bg-rose-50",
      iconBg: "bg-rose-100",
      textColor: "text-gray-800",
      iconColor: "text-rose-600",
      borderColor: "border border-rose-200",
      primary: false,
    },
    {
      label: "View Calendar",
      description: "Track your sessions",
      path: "/calendar",
      icon: <GiCalendar />,
      bg: "bg-white hover:bg-rose-50",
      iconBg: "bg-rose-100",
      textColor: "text-gray-800",
      iconColor: "text-rose-600",
      borderColor: "border border-rose-200",
      primary: false,
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
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(action.path)}
            className={`flex items-center gap-4 px-5 py-4 sm:py-5 rounded-2xl ${action.bg} ${action.textColor ?? "text-white"} ${action.borderColor ?? ""} shadow-lg transition-all text-left`}
          >
            <span className={`${action.iconBg} ${action.iconColor ?? "text-white"} p-3 rounded-xl text-2xl flex-shrink-0 flex items-center justify-center`}>
              {action.icon}
            </span>
            <div>
              <p className="font-bold text-base sm:text-lg leading-tight">{action.label}</p>
              <p className={`text-xs sm:text-sm mt-0.5 ${action.primary ? "text-rose-200" : "text-gray-500"}`}>{action.description}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default CTAButtons;
