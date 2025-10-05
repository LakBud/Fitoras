import { useState, useRef, useLayoutEffect } from "react";
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
import CalendarChecklist from "@/components/calendar/CalendarChecklist";
import { FiInfo } from "react-icons/fi";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDate);
  const [scrollY, setScrollY] = useState(0);
  const splits = useSplitsStore((state) => state.splits);
  const { isExerciseCompleted } = useCalendarStore();
  const { isDesktop, isMobile } = useBreakpoint();
  const { currentSplit } = useCurrentSplitStore();
  const theme = useThemeColor(currentSplit?.category?.color, undefined);
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
        {/* Page Header */}
        <header className="flex flex-col items-center mb-8 pt-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700 tracking-tight">Workout Calendar</h1>
          <p className="mt-3 text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Track your daily workouts and mark exercises as complete. Click on any day to see detailed exercise lists.
          </p>
        </header>

        {/* Empty State */}
        <main
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center text-center py-10 sm:py-16 px-6 sm:px-12 rounded-2xl border border-dashed border-rose-200 bg-rose-50/50 shadow-inner animate-fadeIn"
        >
          <FiInfo className="w-8 h-8 text-rose-400 mb-3" aria-hidden="true" />
          <p className="text-base sm:text-lg text-gray-500 font-medium">No split available</p>
          <p className="text-sm text-gray-400 mt-1">Create a split first to see your workout calendar.</p>
        </main>
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
          <CalendarChecklist
            selectedDate={selectedDate}
            exercises={getExercisesForDate(selectedDate)}
            completionPercentage={getCompletionPercentage(selectedDate)}
            fullyCompleted={isFullyCompleted(selectedDate)}
            isMobile={isMobile}
            themeColor={theme.translucentStrong}
          />
        )}
      </main>

      <ScrollTopButton className={`${isDesktop ? "bottom-5 right-5" : "bottom-26 right-3"}`} />
    </div>
  );
};

export default CalendarPage;
