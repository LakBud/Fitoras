import type { Weekday } from "../../types/splits";
import CalendarDayCell from "./CalendarDayCell";
import { motion } from "framer-motion";
import { useThemeColor } from "../../hooks/ui/useThemeColor";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import { useCurrentSplitStore } from "@/stores/splits/useCurrentSplitStore";
import { useState } from "react";

type Exercise = { id: string; name: string };

type CalendarGridProps = {
  currentDate: Date;
  weekdays: Weekday[];
  calendarDays: (Date | null)[];
  getExercisesForDate: (date: Date) => Exercise[];
  getCompletionPercentage: (date: Date) => number;
  isToday: (date: Date) => boolean;
  isFullyCompleted: (date: Date) => boolean;
  onSelectDate?: (date: Date) => void;
  selectedDate?: Date | null;
};

const CalendarGrid = ({
  weekdays,
  calendarDays,
  getExercisesForDate,
  getCompletionPercentage,
  isToday,
  isFullyCompleted,
  onSelectDate,
  selectedDate: externalSelectedDate,
}: CalendarGridProps) => {
  const { isMobile } = useBreakpoint();
  const { currentSplit } = useCurrentSplitStore();
  const theme = useThemeColor(currentSplit?.category?.color);

  // Internal state for selection (if not controlled by parent)
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null);

  // Use external state if provided, otherwise use internal state
  const selectedDate = externalSelectedDate !== undefined ? externalSelectedDate : internalSelectedDate;

  const handleSelectDate = (date: Date) => {
    // Update internal state if not controlled
    if (externalSelectedDate === undefined) {
      setInternalSelectedDate(date);
    }
    // Always call parent callback if provided
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-sm border overflow-hidden"
      style={{ borderColor: theme.translucentStrong }}
    >
      <div
        className="grid grid-cols-7 border-b"
        style={{
          background: `linear-gradient(135deg, ${theme.translucent} 0%, ${theme.lighter} 100%)`,
          borderBottomColor: theme.translucentStrong,
        }}
      >
        {weekdays.map((day) => (
          <div
            key={day}
            className={`${isMobile ? "p-2" : "p-3"} text-center font-medium text-gray-600 border-r last:border-r-0`}
            style={{
              borderRightColor: theme.translucentStrong,
              fontSize: isMobile ? "0.75rem" : "0.875rem",
            }}
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => {
          if (!date) {
            return (
              <CalendarDayCell
                key={`empty-${index}`}
                date={null}
                isToday={false}
                exercises={[]}
                completionPercentage={0}
                isFullyCompleted={false}
              />
            );
          }

          const exercises = getExercisesForDate(date);
          const completionPercentage = getCompletionPercentage(date);
          const today = isToday(date);
          const fullyCompleted = isFullyCompleted(date);

          return (
            <CalendarDayCell
              key={date.getTime()}
              date={date}
              isToday={today}
              exercises={exercises}
              completionPercentage={completionPercentage}
              isFullyCompleted={fullyCompleted}
              onSelectDate={handleSelectDate}
              isSelected={selectedDate?.toDateString() === date.toDateString()}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default CalendarGrid;
