import type { Weekday, Split, SplitExercise } from "../types/splits";

export const WEEKDAYS: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getMonthMetadata(date: Date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // Monday = 0

  const days: (Date | null)[] = [];
  for (let i = 0; i < adjustedStartDay; i++) days.push(null);
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), day));
  }

  return { firstDayOfMonth, lastDayOfMonth, adjustedStartDay, days };
}

export function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

export function getExercisesForDateFromSplit(split: Split | undefined, date: Date): SplitExercise[] {
  if (!split) return [];
  const weekday = WEEKDAYS[date.getDay() === 0 ? 6 : date.getDay() - 1];
  const workoutDay = split.days.find((d) => d.day === weekday);
  if (!workoutDay) return [];
  const aggregated: SplitExercise[] = [...workoutDay.exercises];
  if (workoutDay.categories) {
    for (const cat of workoutDay.categories) aggregated.push(...cat.exercises);
  }
  return aggregated;
}

