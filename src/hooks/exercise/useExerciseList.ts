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

  // Initialize / re-sync whenever filters or count change
  useEffect(() => {
    const count = visibleCount || pageSize;
    setVisibleExercises(filteredExercises.slice(0, count));
    setHasMore(filteredExercises.length > count);
    setLoading(false);
  }, [filteredExercises, visibleCount, pageSize]);

  // Lazy load next page chunk
  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const next = filteredExercises.slice(visibleExercises.length, visibleExercises.length + pageSize);

    // Delay added for UX (spinner / shimmer)
    setTimeout(() => {
      const updated = [...visibleExercises, ...next];
      setVisibleExercises(updated);
      setHasMore(updated.length < filteredExercises.length);
      setVisibleCount(updated.length); // Persist visible count globally
      setLoading(false);
    }, 300);
  };

  return { visibleExercises, hasMore, loading, loadMore };
};
