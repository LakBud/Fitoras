import { useState, useEffect } from "react";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { useExerciseFilterStore } from "@/stores/exercises/useExerciseFilterStore";
import type { Exercises } from "@/types/exercise";

export const useExerciseList = (pageSize = 8) => {
  const { visibleCount, setVisibleCount } = useExerciseStore();
  const { filteredExercises } = useExerciseFilterStore();

  const [visibleExercises, setVisibleExercises] = useState<Exercises[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const count = visibleCount || pageSize;
    setVisibleExercises(filteredExercises.slice(0, count));
    setHasMore(filteredExercises.length > count);
    setLoading(false);
  }, [filteredExercises, visibleCount, pageSize]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const next = filteredExercises.slice(visibleExercises.length, visibleExercises.length + pageSize);

    setTimeout(() => {
      const updated = [...visibleExercises, ...next];
      setVisibleExercises(updated);
      setHasMore(updated.length < filteredExercises.length);
      setVisibleCount(updated.length);
      setLoading(false);
    }, 300);
  };

  return { visibleExercises, hasMore, loading, loadMore };
};
