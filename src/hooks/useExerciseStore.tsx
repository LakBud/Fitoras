import { create } from "zustand";
import { useEffect } from "react";
import type { Exercises } from "../types/exercise";
import axios from "axios";

const STORAGE_KEY = "exercises";

interface ExerciseState {
  exercises: Exercises[];
  loading: boolean;
  setExercises: (ex: Exercises[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  loading: true,
  setExercises: (ex) => set({ exercises: ex }),
  setLoading: (loading) => set({ loading }),
}));

export function useExercise(jsonPath: string = "/data/allExercises.json") {
  const { exercises, loading, setExercises, setLoading } = useExerciseStore();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setExercises(JSON.parse(stored));
      } catch (e) {
        console.error("Could not parse exercises from localStorage:", e);
        localStorage.removeItem(STORAGE_KEY);
      }
      setLoading(false);
      return;
    }

    axios
      .get<Exercises[]>(jsonPath)
      .then((res) => {
        setExercises(res.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
      })
      .catch((error) => console.error("Error loading exercises:", error))
      .finally(() => setLoading(false));
  }, [jsonPath, setExercises, setLoading]);

  return { exercises, loading };
}
