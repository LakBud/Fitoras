import { useEffect, useState } from "react";
import type { Exercise } from "../types/exercise";
import axios from "axios";

const STORAGE_KEY = "exercises";

export function useExercise(jsonPath: string = "/data/allExercises.json") {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if data is already on local storage
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
    axios
      .get<Exercise[]>(jsonPath)
      .then((res) => {
        setExercises(res.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
      })
      .catch((error) => console.error("Error loading exercises: ", error))
      .finally(() => setLoading(false));
  }, [jsonPath]);

  return { exercises, loading };
}
