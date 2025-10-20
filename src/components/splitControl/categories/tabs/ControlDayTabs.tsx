import { motion, LayoutGroup } from "framer-motion";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { useSplitController } from "@/hooks/splitControl/useSplitController";

const ControlDayTabs = () => {
  const { split, selectedDay, setSelectedDay, setSelectedCategoryId } = useSplitController();
  const theme = useThemeColor(split?.category?.color);

  if (!split?.days?.length) return null;

  return (
    <div className="w-full">
      <div
        className="flex gap-3 relative overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <LayoutGroup>
          {split.days.map((dayObj: any) => {
            const isActive = dayObj.day === selectedDay;

            return (
              <motion.button
                key={dayObj.day}
                layout
                onClick={(e) => {
                  setSelectedDay?.(dayObj.day);
                  setSelectedCategoryId?.(null);
                  // Auto-center into view for better UX on mobile
                  e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }}
                whileTap={{ scale: 0.95, opacity: 0.9 }}
                animate={{
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                  backgroundColor: isActive ? theme.primary : theme.translucentStrong,
                }}
                transition={{ duration: 0.18 }}
                className={`
                  relative flex-shrink-0 rounded-full font-semibold whitespace-nowrap
                  px-6 py-3 snap-start
                  backdrop-blur-md
                  transition-all
                `}
              >
                {dayObj.day}

                {isActive && (
                  <motion.div
                    layoutId="day-tab-indicator"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{
                      background: theme.primary,
                      boxShadow: `0 4px 10px ${theme.translucentStrong}`,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </LayoutGroup>
      </div>
    </div>
  );
};

export default ControlDayTabs;
