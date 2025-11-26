import type { Weekday, Split, SplitExercise } from "@/types/splits";

export const WEEKDAYS: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getMonthMetadata(date: Date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // Convert Sunday=0..Saturday=6 into Monday-first indexing (0=Mon)
  const startDayOfWeek = firstDayOfMonth.getDay();
  const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  // Build padded calendar array with leading nulls + actual days
  const days: (Date | null)[] = [];
  for (let i = 0; i < adjustedStartDay; i++) days.push(null);
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), day));
  }

  return { firstDayOfMonth, lastDayOfMonth, adjustedStartDay, days };
}

// Convert date to YYYY-MM-DD (stable calendar key)
export function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Loose same-day comparator ignoring time portion
export function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

// Gather all exercises (root + categories) for the split's weekday matching given date
export function getExercisesForDateFromSplit(split: Split | undefined, date: Date): SplitExercise[] {
  if (!split) return [];

  // Map JS getDay() -> WEEKDAYS[] index (Monday 0 .. Sunday 6)
  const weekday = WEEKDAYS[date.getDay() === 0 ? 6 : date.getDay() - 1];
  const workoutDay = split.days.find((d) => d.day === weekday);
  if (!workoutDay) return [];

  const aggregated: SplitExercise[] = [...workoutDay.exercises];
  if (workoutDay.categories) {
    for (const cat of workoutDay.categories) aggregated.push(...cat.exercises);
  }
  return aggregated;
}
