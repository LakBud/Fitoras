import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useThemeColor } from "../../hooks/ui/useThemeColor";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import { useSplitsStore } from "@/stores/split/useSplitStore";

type Exercise = { id: string; name: string; sets?: number; reps?: number };

type CalendarDayCellProps = {
  date: Date | null;
  isToday: boolean;
  exercises: Exercise[];
  completionPercentage: number;
  isFullyCompleted: boolean;
  onSelectDate?: (date: Date) => void;
  isSelected?: boolean;
};

const CalendarDayCell = ({
  date,
  isToday,
  exercises,
  completionPercentage,
  isFullyCompleted,
  onSelectDate,
  isSelected = false,
}: CalendarDayCellProps) => {
  const firstSplit = useSplitsStore((state) => state.splits[0]);
  const theme = useThemeColor(firstSplit?.category?.color);
  const { isMobile } = useBreakpoint();

  if (!date) {
    return (
      <div
        className={`${isMobile ? "min-h-[80px]" : "min-h-[120px]"} border-r border-b last:border-r-0`}
        style={{ borderColor: theme.translucent }}
      />
    );
  }

  return (
    <motion.div
      key={date.getTime()}
      className={`
    ${isMobile ? "min-h-[80px] p-1" : "min-h-[120px] p-2"} 
    border-r border-b last:border-r-0 relative
    transition-colors cursor-pointer
    ${isFullyCompleted ? "hover:bg-green-100" : "hover:bg-gray-50"}
  `}
      style={{
        backgroundColor: isFullyCompleted
          ? "#dcfce7" // Tailwind green-50 equivalent
          : isSelected
          ? theme.lighter // dynamic theme color for selected
          : isToday
          ? theme.translucent // lighter version for today
          : undefined,
        borderColor: isFullyCompleted
          ? "#bbf7d0" // Tailwind green-200 equivalent
          : isSelected
          ? theme.primary // bold border for selected
          : isToday
          ? theme.translucent
          : theme.translucent,
        borderWidth: isSelected ? "2px" : "1px",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelectDate && onSelectDate(date)}
    >
      {/* Completion Checkmark */}
      {isFullyCompleted && (
        <div className={`absolute ${isMobile ? "top-0.5 right-0.5" : "top-1 right-1"}`}>
          <div className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} bg-green-500 rounded-full flex items-center justify-center`}>
            <Check className={`${isMobile ? "w-2.5 h-2.5" : "w-3 h-3"} text-white`} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <span
          className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}
          style={{
            color: isFullyCompleted
              ? "#15803d" // Tailwind green-700 equivalent
              : isSelected
              ? theme.dark // dynamic color for selected
              : isToday
              ? theme.dark // dynamic color for today
              : "#374151", // Tailwind gray-700 equivalent
          }}
        >
          {date.getDate()}
        </span>

        {exercises.length > 0 && !isFullyCompleted && (
          <div className="flex items-center gap-1">
            <div className={`${isMobile ? "w-1.5 h-1.5" : "w-2 h-2"} rounded-full bg-gray-200`}>
              <div
                className="w-full h-full rounded-full bg-green-500 transition-all duration-300"
                style={{
                  transform: `scale(${completionPercentage / 100})`,
                  opacity: completionPercentage > 0 ? 1 : 0,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {exercises.length > 0 && (
        <div className={`${isMobile ? "space-y-0.5" : "space-y-1"}`}>
          {exercises.slice(0, isMobile ? 2 : 3).map((exercise) => (
            <div
              key={exercise.id}
              className={`flex items-center gap-1 ${isMobile ? "text-xs p-0.5" : "text-xs p-1"} rounded text-gray-600`}
              style={{ backgroundColor: theme.translucent }}
            >
              <span className="truncate flex-1" title={exercise.name}>
                {exercise.name}
              </span>
              {(exercise.sets || exercise.reps) && !isMobile && (
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {exercise.sets && exercise.reps
                    ? `${exercise.sets}x${exercise.reps}`
                    : exercise.sets
                    ? `${exercise.sets} sets`
                    : `${exercise.reps} reps`}
                </span>
              )}
            </div>
          ))}
          {exercises.length > (isMobile ? 2 : 3) && (
            <div className={`${isMobile ? "text-xs" : "text-xs"} text-gray-500 text-center`}>
              +{exercises.length - (isMobile ? 2 : 3)} more
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CalendarDayCell;
