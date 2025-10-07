import { memo } from "react";
import { motion } from "framer-motion";

interface MuscleCardProps {
  item: {
    label: string;
    value: string[];
    icon: React.ReactNode;
  };
  idx: number;
}

// Memoized Muscle Card Component
const MuscleCard = memo<MuscleCardProps>(({ item, idx }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: idx * 0.08 }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-gradient-to-br from-rose-500 to-rose-600 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 text-center sm:col-span-2 lg:col-span-2"
  >
    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">{item.icon}</div>
    <div>
      <p className="text-white text-sm sm:text-base font-bold uppercase tracking-wide mb-3">{item.label}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {item.value.length === 0 ? (
          <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">None specified</span>
        ) : (
          item.value.map((muscle, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="px-3 py-1.5 bg-white/25 backdrop-blur-sm text-white rounded-full text-sm font-semibold"
            >
              {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
            </motion.span>
          ))
        )}
      </div>
    </div>
  </motion.div>
));

MuscleCard.displayName = "MuscleCard";

export default MuscleCard;
