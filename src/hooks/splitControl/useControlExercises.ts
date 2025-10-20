import { useState, useEffect } from "react";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { useExerciseControlFilter } from "@/stores/splitControl/useExerciseControlFilter";
import { useSplitController } from "@/hooks/splitControl/useSplitController";
import useBreakpoint from "@/hooks/ui/useBreakpoint";
import type { Exercises } from "@/types/exercise";

export function useControlExercises() {
  const { exercises: allExercises, loading, fetchExercises } = useExerciseStore();
  const { filteredExercises, setAllExercises } = useExerciseControlFilter();
  const { split, handleAddExercise, displayedExercises } = useSplitController();
  const { isMobile, isDesktop } = useBreakpoint();

  const pageSize = isMobile ? 8 : 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleExercises, setVisibleExercises] = useState<Exercises[]>([]);

  useEffect(() => void fetchExercises(), [fetchExercises]);
  useEffect(() => void setAllExercises(allExercises || []), [allExercises, setAllExercises]);

  useEffect(() => {
    const start = currentPage * pageSize;
    setVisibleExercises(filteredExercises.slice(start, start + pageSize));
  }, [filteredExercises, currentPage, pageSize]);

  const handleNext = () => (currentPage + 1) * pageSize < filteredExercises.length && setCurrentPage((p) => p + 1);
  const handlePrev = () => currentPage > 0 && setCurrentPage((p) => p - 1);

  return {
    loading,
    isMobile,
    isDesktop,
    split,
    filteredExercises,
    visibleExercises,
    displayedExercises,
    handleAddExercise,
    currentPage,
    handleNext,
    handlePrev,
    pageSize,
  };
}
