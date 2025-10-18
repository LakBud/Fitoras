import { useState } from "react";
import { WEEKDAYS, getMonthMetadata, getExercisesForDateFromSplit, formatDateKey, isSameDay } from "../lib/calendar";
import type { Weekday, Split } from "../types/splits";

type Args = {
  splits: Split[];
  isExerciseCompleted: (dateKey: string, id: string) => boolean;
};

export const useCalendarLogic = ({ splits, isExerciseCompleted }: Args) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const topSplit = splits[0];
  const weekdays: Weekday[] = WEEKDAYS;
  const { days: calendarDays } = getMonthMetadata(currentDate);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + (direction === "prev" ? -1 : 1));
      return next;
    });
  };

  const getExercisesForDate = (date: Date) => getExercisesForDateFromSplit(topSplit, date);
  const isToday = (date: Date) => isSameDay(date, new Date());

  const getCompletionPercentage = (date: Date) => {
    const exercises = getExercisesForDate(date);
    if (!exercises.length) return 0;
    const done = exercises.filter((e) => isExerciseCompleted(formatDateKey(date), e.id)).length;
    return (done / exercises.length) * 100;
  };

  const isFullyCompleted = (date: Date) => {
    const exercises = getExercisesForDate(date);
    if (!exercises.length) return false;
    return exercises.every((e) => isExerciseCompleted(formatDateKey(date), e.id));
  };

  return {
    currentDate,
    setCurrentDate,
    topSplit,
    weekdays,
    calendarDays,
    navigateMonth,
    getExercisesForDate,
    isToday,
    getCompletionPercentage,
    isFullyCompleted,
  };
};
