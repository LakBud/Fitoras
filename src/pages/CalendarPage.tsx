import { useState, useRef, useLayoutEffect } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useSplitsStore } from "../stores/splits/useSplitStore";
import { useCalendarStore } from "../stores/useCalendarStore";
import type { Weekday } from "../types/splits";
import { WEEKDAYS, getMonthMetadata, getExercisesForDateFromSplit, formatDateKey, isSameDay } from "../lib/calendar";
import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarGrid from "../components/calendar/CalendarGrid";
import ScrollTopButton from "../components/common/ScrollTopButton";
import useBreakpoint from "../hooks/ui/useBreakpoint";
import { useThemeColor } from "../hooks/ui/useThemeColor";
import { useCurrentSplitStore } from "@/stores/splits/useCurrentSplitStore";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [scrollY, setScrollY] = useState(0);
  const splits = useSplitsStore((state) => state.splits);
  const { toggleExercise, isExerciseCompleted } = useCalendarStore();
  const { isDesktop, isMobile } = useBreakpoint();
  const { currentSplit } = useCurrentSplitStore();
  const theme = useThemeColor(currentSplit?.category?.color);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: scrollY, behavior: "auto" });
    }
  }, []);

  const handleScroll = () => {
    if (containerRef.current) setScrollY(containerRef.current.scrollTop);
  };

  // Get the top split (first in the list)
  const topSplit = splits[0];

  const weekdays: Weekday[] = WEEKDAYS;
  const { days: calendarDays } = getMonthMetadata(currentDate);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getExercisesForDate = (date: Date) => getExercisesForDateFromSplit(topSplit, date);
  const isToday = (date: Date) => isSameDay(date, new Date());

  const getCompletionPercentage = (date: Date) => {
    const exercises = getExercisesForDate(date);
    if (exercises.length === 0) return 0;

    const completedCount = exercises.filter((exercise) => isExerciseCompleted(formatDateKey(date), exercise.id)).length;

    return (completedCount / exercises.length) * 100;
  };

  const isFullyCompleted = (date: Date) => {
    const exercises = getExercisesForDate(date);
    if (exercises.length === 0) return false;

    return exercises.every((exercise) => isExerciseCompleted(formatDateKey(date), exercise.id));
  };

  if (!topSplit) {
    return (
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative bg-gradient-to-b from-red-50 via-rose-50 to-rose-100 min-h-screen py-10 px-4 sm:px-6 lg:px-12 overflow-auto"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Split Available</h2>
          <p className="text-gray-600">Create a split first to see your workout calendar.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative bg-gradient-to-b from-red-50 via-rose-50 to-rose-100 min-h-screen py-5 pb-20 px-4 sm:px-6 lg:px-12 overflow-auto"
    >
      {/* Page Header */}
      <header className="flex flex-col items-center mb-8 pt-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700 tracking-tight">Workout Calendar</h1>
        <p className="mt-3 text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
          Track your daily workouts and mark exercises as complete. Click on any day to see detailed exercise lists.
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <CalendarHeader
          currentDate={currentDate}
          onPrev={() => navigateMonth("prev")}
          onNext={() => navigateMonth("next")}
          splitName={topSplit.name}
          splitDescription={topSplit.description}
        />

        <CalendarGrid
          currentDate={currentDate}
          weekdays={weekdays}
          calendarDays={calendarDays}
          getExercisesForDate={getExercisesForDate}
          getCompletionPercentage={getCompletionPercentage}
          isToday={isToday}
          isFullyCompleted={isFullyCompleted}
          onSelectDate={(d) => setSelectedDate(d)}
        />

        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-white rounded-2xl shadow-sm border p-6"
            style={{ borderColor: theme.translucentStrong }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-gray-800`}>
                  {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </h3>
                <p className={`${isMobile ? "text-xs" : "text-sm"} text-gray-500 mt-1`}>
                  {getExercisesForDate(selectedDate).length} exercises • {getCompletionPercentage(selectedDate).toFixed(0)}%
                  complete
                </p>
              </div>
              {isFullyCompleted(selectedDate) && (
                <div className="flex items-center gap-2 text-green-600">
                  <div
                    className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} bg-green-100 rounded-full flex items-center justify-center`}
                  >
                    <Check className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                  </div>
                  <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}>All Complete!</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {getExercisesForDate(selectedDate).map((exercise) => {
                const dateKey = formatDateKey(selectedDate);
                const done = isExerciseCompleted(dateKey, exercise.id);
                return (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center justify-between gap-4 ${
                      isMobile ? "p-3" : "p-4"
                    } rounded-lg border transition-colors ${
                      done ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} rounded border-2 flex items-center justify-center ${
                            done ? "bg-green-500 border-green-500" : "border-gray-300"
                          }`}
                        >
                          {done && <Check className={`${isMobile ? "w-2 h-2" : "w-2.5 h-2.5"} text-white`} />}
                        </div>
                        <div className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-gray-800 truncate`}>
                          {exercise.name}
                        </div>
                      </div>
                      {(exercise.sets || exercise.reps) && (
                        <div className="text-xs text-gray-500 ml-6">
                          {exercise.sets && exercise.reps
                            ? `${exercise.sets} sets × ${exercise.reps} reps`
                            : exercise.sets
                            ? `${exercise.sets} sets`
                            : `${exercise.reps} reps`}
                        </div>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${
                        isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
                      } font-medium rounded-lg border transition-colors ${
                        done
                          ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => toggleExercise(dateKey, exercise.id)}
                    >
                      {done ? "Completed" : "Mark as done"}
                    </motion.button>
                  </motion.div>
                );
              })}
              {getExercisesForDate(selectedDate).length === 0 && (
                <div className="text-center py-8">
                  <div className={`${isMobile ? "text-3xl" : "text-4xl"} mb-2`}>🏋️</div>
                  <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-500`}>No exercises scheduled for this day.</div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      <ScrollTopButton className={`${isDesktop ? "bottom-5 right-5" : "bottom-26 right-3"}`} />
    </div>
  );
};

export default CalendarPage;
