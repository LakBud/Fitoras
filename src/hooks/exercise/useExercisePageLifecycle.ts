import { useEffect, useRef, useState } from "react";
import { useExerciseStore } from "../../stores/exercises/useExerciseStore";
import { useExerciseFilterStore } from "../../stores/exercises/useExerciseFilterStore";

export function useExercisePageLifecycle() {
  const { exercises, fetchExercises, loading } = useExerciseStore();
  const { setAllExercises } = useExerciseFilterStore();

  const containerRef = useRef<HTMLDivElement>(null);

  // Local scroll state
  const [scrollY, setScrollY] = useState(0);

  // 1) fetch once
  useEffect(() => {
    if (!exercises.length) fetchExercises();
  }, [exercises.length, fetchExercises]);

  // 2) init filter store when loaded
  useEffect(() => {
    if (!loading && exercises.length) setAllExercises(exercises);
  }, [loading, exercises, setAllExercises]);

  // 3) restore scroll on mount
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTo({ top: scrollY, behavior: "auto" });
  }, [scrollY]);

  // 4) track scroll locally
  const handleScroll = () => {
    const el = containerRef.current;
    if (el) setScrollY(el.scrollTop);
  };

  return { containerRef, handleScroll };
}
