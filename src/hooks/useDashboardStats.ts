import { useMemo } from "react";
import { formatDateKey } from "@/lib/calendar";
import { useSplitsStore } from "@/stores/split/useSplitStore";
import { useCalendarStore } from "@/stores/useCalendarStore";

export function useDashboardStats() {
  const splits = useSplitsStore((state) => state.splits);
  const { completedExercises } = useCalendarStore();

  return useMemo(() => {
    const totalSplits = splits.length;

    // --- Current streak ---
    let currentStreak = 0;
    const today = new Date();
    const checkDate = new Date(today);
    while (true) {
      const dateKey = formatDateKey(checkDate);
      const dayExercises = completedExercises[dateKey];
      if (dayExercises !== undefined) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else break;
    }

    // --- Workouts this week ---
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    monday.setHours(0, 0, 0, 0);

    let workoutsThisWeek = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateKey = formatDateKey(date);
      if (completedExercises[dateKey] !== undefined) workoutsThisWeek++;
    }

    // --- Total workouts ---
    const totalWorkouts = Object.keys(completedExercises).length;

    return { totalSplits, currentStreak, workoutsThisWeek, totalWorkouts };
  }, [splits, completedExercises]);
}
