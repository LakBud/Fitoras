import { useEffect, useState } from "react";
import type { Exercises } from "../types/exercise";
import axios from "axios";

const STORAGE_KEY = "exercises";

export function useExercise(jsonPath: string = "/data/allExercises.json") {
  const [exercises, setExercises] = useState<Exercises[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      // Use cached data
      try {
        setExercises(JSON.parse(stored));
      } catch (e) {
        console.error("Could not parse exercises from localStorage:", e);
        localStorage.removeItem(STORAGE_KEY);
      }
      setLoading(false);
      return; // do not fetch JSON again
    }

    // Only fetch JSON if nothing is in localStorage
    axios
      .get<Exercises[]>(jsonPath)
      .then((res) => {
        setExercises(res.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
      })
      .catch((error) => console.error("Error loading exercises:", error))
      .finally(() => setLoading(false));
  }, [jsonPath]);

  return { exercises, loading };
}
