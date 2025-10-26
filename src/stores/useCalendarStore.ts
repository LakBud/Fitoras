import { create } from "zustand";
import { getFromDB, saveToDB } from "@/lib/indexedDB";

interface CompletedExercise {
  exerciseId: string;
  completedAt: string;
}

interface CalendarState {
  // keyed by ISO date string: "2025-01-25"
  completedExercises: Record<string, CompletedExercise[]>;
  initialized: boolean;

  toggleExercise: (date: string, exerciseId: string) => void;
  isExerciseCompleted: (date: string, exerciseId: string) => boolean;
  getCompletedExercisesForDate: (date: string) => CompletedExercise[];
  loadCalendar: () => Promise<void>;
}

const STORE_NAME = "calendar";
const KEY = "calendar_data";

// Zustand store for completed exercise calendar
export const useCalendarStore = create<CalendarState>((set, get) => ({
  completedExercises: {},
  initialized: false,

  // Lazy-load previously saved calendar from IndexedDB
  loadCalendar: async () => {
    if (get().initialized) return;

    const data = await getFromDB<Record<string, CompletedExercise[]>>(STORE_NAME, KEY);
    set({ completedExercises: data || {}, initialized: true });
  },

  // Toggle an exercise for given date: add if not present, remove if present
  toggleExercise: (date, exerciseId) => {
    const state = get();
    const dateExercises = state.completedExercises[date] || [];

    const existingIndex = dateExercises.findIndex((ex) => ex.exerciseId === exerciseId);

    let updatedExercises;
    if (existingIndex >= 0) {
      // remove if found
      updatedExercises = dateExercises.filter((_, index) => index !== existingIndex);
    } else {
      // push new completed exercise
      updatedExercises = [...dateExercises, { exerciseId, completedAt: new Date().toISOString() }];
    }

    const updatedCompletedExercises = {
      ...state.completedExercises,
      [date]: updatedExercises,
    };

    // Update Zustand state
    set({ completedExercises: updatedCompletedExercises });

    // Persist to IndexedDB
    saveToDB(STORE_NAME, KEY, updatedCompletedExercises);
  },

  // Return boolean completion for a specific exercise on a date
  isExerciseCompleted: (date, exerciseId) => {
    const state = get();
    const dateExercises = state.completedExercises[date] || [];
    return dateExercises.some((ex) => ex.exerciseId === exerciseId);
  },

  // Get all completed exercises for a date
  getCompletedExercisesForDate: (date) => {
    const state = get();
    return state.completedExercises[date] || [];
  },
}));
