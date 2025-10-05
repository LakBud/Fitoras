import { create } from "zustand";
import { getFromDB, saveToDB } from "@/lib/indexedDB";

interface CompletedExercise {
  exerciseId: string;
  completedAt: string;
}

interface CalendarState {
  completedExercises: Record<string, CompletedExercise[]>;
  initialized: boolean;
  toggleExercise: (date: string, exerciseId: string) => void;
  isExerciseCompleted: (date: string, exerciseId: string) => boolean;
  getCompletedExercisesForDate: (date: string) => CompletedExercise[];
  loadCalendar: () => Promise<void>;
}

const STORE_NAME = "calendar";
const KEY = "calendar_data";

export const useCalendarStore = create<CalendarState>((set, get) => ({
  completedExercises: {},
  initialized: false,

  loadCalendar: async () => {
    if (get().initialized) return;

    const data = await getFromDB<Record<string, CompletedExercise[]>>(STORE_NAME, KEY);
    set({ completedExercises: data || {}, initialized: true });
  },

  toggleExercise: (date, exerciseId) => {
    const state = get();
    const dateExercises = state.completedExercises[date] || [];
    const existingIndex = dateExercises.findIndex((ex) => ex.exerciseId === exerciseId);

    let updatedExercises;
    if (existingIndex >= 0) {
      updatedExercises = dateExercises.filter((_, index) => index !== existingIndex);
    } else {
      updatedExercises = [...dateExercises, { exerciseId, completedAt: new Date().toISOString() }];
    }

    const updatedCompletedExercises = {
      ...state.completedExercises,
      [date]: updatedExercises,
    };

    set({ completedExercises: updatedCompletedExercises });
    saveToDB(STORE_NAME, KEY, updatedCompletedExercises);
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
}));
