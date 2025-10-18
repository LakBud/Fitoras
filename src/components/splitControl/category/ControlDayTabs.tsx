import { motion, LayoutGroup } from "framer-motion";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import { useSplitControl } from "@/hooks/splitControl/useSplitControl";

const ControlDayTabs = () => {
  const { split, selectedDay, setSelectedDay, setSelectedCategoryId } = useSplitControl();
  const theme = useThemeColor(split?.category?.color);

  if (!split?.days?.length) return null;

  return (
    <div className="w-full">
      <div
        className={`
          flex gap-3 relative overflow-x-auto pb-2 scroll-pl-2 snap-x
        `}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <LayoutGroup>
          {split.days.map((dayObj: any) => {
            const isActive = dayObj.day === selectedDay;

            return (
              <motion.button
                key={dayObj.day}
                layout
                onClick={() => {
                  setSelectedDay?.(dayObj.day);
                  setSelectedCategoryId?.(null);
                }}
                className={`
                  relative flex-shrink-0 rounded-full font-semibold whitespace-nowrap
                  px-5 py-2 snap-start
                  transition-all duration-200
                  ${isActive ? "text-white" : "text-gray-100 hover:text-white"}
                `}
                style={{
                  backgroundColor: isActive ? theme.primary : theme.translucentStrong,
                  backdropFilter: "blur(8px)",
                }}
                whileTap={{ scale: 0.97 }}
                whileHover={{
                  backgroundColor: isActive ? theme.primary : theme.translucentStrong,
                }}
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
