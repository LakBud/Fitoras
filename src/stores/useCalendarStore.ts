import { create } from "zustand";

interface CompletedExercise {
  exerciseId: string;
  completedAt: string; // ISO timestamp
}

interface CalendarState {
  completedExercises: Record<string, CompletedExercise[]>; // date string -> completed exercises
  toggleExercise: (date: string, exerciseId: string) => void;
  isExerciseCompleted: (date: string, exerciseId: string) => boolean;
  getCompletedExercisesForDate: (date: string) => CompletedExercise[];
}

const STORAGE_KEY = "fitora_calendar";

export const useCalendarStore = create<CalendarState>((set, get) => {
  // Load completed exercises from localStorage
  let initialCompletedExercises: Record<string, CompletedExercise[]> = {};
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      initialCompletedExercises = JSON.parse(stored);
    } catch (err) {
      console.error("Failed to parse stored calendar data:", err);
    }
  }

  return {
    completedExercises: initialCompletedExercises,

    toggleExercise: (date, exerciseId) => {
      const state = get();
      const dateExercises = state.completedExercises[date] || [];
      const existingIndex = dateExercises.findIndex((ex) => ex.exerciseId === exerciseId);

      let updatedExercises;
      if (existingIndex >= 0) {
        // Remove if already completed
        updatedExercises = dateExercises.filter((_, index) => index !== existingIndex);
      } else {
        // Add if not completed
        updatedExercises = [...dateExercises, { exerciseId, completedAt: new Date().toISOString() }];
      }

      const updatedCompletedExercises = {
        ...state.completedExercises,
        [date]: updatedExercises,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompletedExercises));
      set({ completedExercises: updatedCompletedExercises });
    },

    isExerciseCompleted: (date, exerciseId) => {
      const state = get();
      const dateExercises = state.completedExercises[date] || [];
      return dateExercises.some((ex) => ex.exerciseId === exerciseId);
    },

    getCompletedExercisesForDate: (date) => {
      const state = get();
      return state.completedExercises[date] || [];
    },
  };
});

