import { useEffect, useState } from "react";
import type { Exercise } from "../types/exercise";

const STORAGE_KEY = "exercises";

export function useExercise(jsonPath: string = "/data/allExercises.json") {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setExercises(JSON.parse(stored));
        setLoading(false);
      } catch {
        console.error("Could not parse exercises from localStorage");
      }
    }

    // Fetch the local JSON file (from public/)
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data: Exercise[]) => {
        setExercises(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      })
      .catch((err) => console.error("Error loading exercises:", err))
      .finally(() => setLoading(false));
  }, [jsonPath]);

  return { exercises, loading };
}
