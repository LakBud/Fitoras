import type { Exercises } from "./exercise";
import { type Category } from "@/stores/split/useCurrentCategories";

export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

// Each exercise in a split can have sets/reps
export type SplitExercise = Exercises & {
  sets?: number;
  reps?: number;
};

// A category inside a day
export type WorkoutCategory = {
  id: string; // unique ID
  name: string;
  exercises: SplitExercise[];
  color: string;
};

export type WorkoutDay = {
  day: Weekday;
  exercises: SplitExercise[]; // general exercises without category
  categories?: WorkoutCategory[]; // optional categories
};

export type Split = {
  id: string;
  name: string;
  description?: string;
  days: WorkoutDay[];
  category?: Category;
};
