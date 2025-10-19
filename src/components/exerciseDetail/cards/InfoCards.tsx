import { memo } from "react";
import { motion } from "framer-motion";

interface InfoCardProps {
  item: {
    label: string;
    value?: string;
    icon: React.ReactNode;
  };
  idx: number;
}

const InfoCard = memo<InfoCardProps>(({ item, idx }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: idx * 0.08 }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 flex flex-col items-center gap-3 text-center"
  >
    <div className="p-3 bg-rose-50 rounded-xl">{item.icon}</div>
    <div>
      <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1">{item.label}</p>
      <p className="text-gray-800 text-base sm:text-lg font-bold">
        {item.value ? item.value.charAt(0).toUpperCase() + item.value.slice(1) : "Not specified"}
      </p>
    </div>
  </motion.div>
));

InfoCard.displayName = "InfoCard";

export default InfoCard;
