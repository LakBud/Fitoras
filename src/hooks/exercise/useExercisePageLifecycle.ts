import { useEffect, useRef } from "react";
import { useExerciseStore } from "../../stores/exercises/useExerciseStore";
import { useExerciseFilterStore } from "../../stores/exercises/useExerciseFilterStore";
import { useScrollStore } from "../../stores/exercises/useScrollState";

export function useExercisePageLifecycle() {
  const { exercises, fetchExercises, loading } = useExerciseStore();
  const { setAllExercises } = useExerciseFilterStore();
  const { scrollY, setScrollY } = useScrollStore();

  const containerRef = useRef<HTMLDivElement>(null);

  // 1) fetch once
  useEffect(() => {
    if (!exercises.length) fetchExercises();
  }, [exercises.length, fetchExercises]);

  // 2) init filter store when loaded
  useEffect(() => {
    if (!loading && exercises.length) setAllExercises(exercises);
  }, [loading, exercises, setAllExercises]);

  // 3) restore scroll
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTo({ top: scrollY, behavior: "auto" });
  }, [scrollY]);

  // 4) track scroll
  const handleScroll = () => {
    const el = containerRef.current;
    if (el) setScrollY(el.scrollTop);
  };

  return { containerRef, handleScroll };
}
