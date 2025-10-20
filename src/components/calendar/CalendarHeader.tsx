import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useThemeColor } from "../../hooks/ui/useThemeColor";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import { useSplitsStore } from "@/stores/split/useSplitStore";

type CalendarHeaderProps = {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  splitName?: string;
  splitDescription?: string;
};

const CalendarHeader = ({ currentDate, onPrev, onNext, splitName, splitDescription }: CalendarHeaderProps) => {
  const firstSplit = useSplitsStore((state) => state.splits[0]);
  const theme = useThemeColor(firstSplit?.category?.color);
  const { isMobile } = useBreakpoint();

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrev}
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: theme.translucent,
              color: theme.primary,
            }}
          >
            <ChevronLeft className={`${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
          </motion.button>
          <h2
            className={`${isMobile ? "text-base" : "text-lg sm:text-xl"} font-semibold text-gray-700 min-w-[200px] text-center`}
          >
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: theme.translucent,
              color: theme.primary,
            }}
          >
            <ChevronRight className={`${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
          </motion.button>
        </div>
      </div>

      {splitName && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-4 border shadow-sm"
          style={{
            borderColor: theme.translucentStrong,
            background: `linear-gradient(135deg, ${theme.translucent} 0%, ${theme.lighter} 100%)`,
          }}
        >
          <h3
            className={`${isMobile ? "text-base" : "text-lg"} font-semibold text-gray-800 mb-1`}
            style={{ color: theme.primary }}
          >
            Current Split: {splitName}
          </h3>
          {splitDescription && <p className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600`}>{splitDescription}</p>}
        </motion.div>
      )}
    </div>
  );
};

export default CalendarHeader;
