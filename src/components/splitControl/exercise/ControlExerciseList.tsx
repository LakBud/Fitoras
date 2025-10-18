import { useState, useEffect } from "react";
import { useExerciseStore } from "@/stores/exercises/useExerciseStore";
import { useExerciseControl } from "@/hooks/exercise/useExerciseControl";
import { useExerciseControlFilter } from "@/stores/splitControl/useExerciseControlFilter";
import { useSplitControl } from "@/hooks/splitControl/useSplitControl";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import useBreakpoint from "@/hooks/ui/useBreakpoint";
import type { Exercises } from "@/types/exercise";

export const ControlExerciseList: React.FC = () => {
  const { exercises: allExercises, loading, fetchExercises } = useExerciseStore();
  const { handleAddExercise, displayedExercises } = useExerciseControl();
  const { filteredExercises, setAllExercises } = useExerciseControlFilter();
  const { split } = useSplitControl();
  const { isMobile, isDesktop } = useBreakpoint();
  const theme = useThemeColor(split?.category?.color);

  // Dynamic page size based on breakpoint
  const pageSize = isMobile ? 8 : 12;

  const [currentPage, setCurrentPage] = useState(0);
  const [visibleExercises, setVisibleExercises] = useState<Exercises[]>([]);

  // Fetch exercises once
  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  // Initialize control filter store with all exercises
  useEffect(() => {
    setAllExercises(allExercises || []);
  }, [allExercises, setAllExercises]);

  // Update visible exercises whenever filteredExercises, currentPage, or pageSize changes
  useEffect(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    setVisibleExercises(filteredExercises.slice(start, end));
  }, [filteredExercises, currentPage, pageSize]);

  const handleNext = () => {
    if ((currentPage + 1) * pageSize < filteredExercises.length) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p>Loading exercises...</p>;
  if (!filteredExercises.length) return <p>No exercises found.</p>;

  return (
    <div className="space-y-5">
      {/* Exercises Grid */}
      <div className={`grid gap-4 ${isMobile ? "grid-cols-2" : isDesktop ? "grid-cols-4" : "grid-cols-2 sm:grid-cols-3"}`}>
        {visibleExercises.map((ex) => {
          const isAdded = displayedExercises?.some((e) => e.id === ex.id);
          return (
            <div
              key={ex.id}
              onClick={() => !isAdded && handleAddExercise(ex)}
              className={`rounded-xl border p-2 flex flex-col items-center transition-shadow hover:shadow-md cursor-pointer ${
                isAdded ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{
                backgroundColor: theme.lighter,
                borderColor: theme.translucentStrong,
              }}
            >
              {ex.images?.[0] ? (
                <img
                  src={`/data/exercises/${ex.images[0]}`}
                  alt={ex.name}
                  className={`w-full object-cover rounded-lg mb-2 ${isMobile ? "h-24" : "h-32"}`}
                  loading="lazy"
                />
              ) : (
                <div
                  className={`w-full rounded-lg mb-2 flex items-center justify-center text-gray-400 text-xs ${
                    isMobile ? "h-24" : "h-32"
                  }`}
                  style={{ backgroundColor: theme.translucent }}
                >
                  No Image
                </div>
              )}

              <h3
                className={`font-semibold text-center break-words ${isMobile ? "text-sm" : "text-base sm:text-lg md:text-xl"}`}
                style={{ color: theme.primary }}
              >
                {ex.name}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-5 py-2 rounded-2xl shadow ${
            currentPage === 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "text-white"
          }`}
          style={{ backgroundColor: currentPage === 0 ? undefined : theme.primary }}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={(currentPage + 1) * pageSize >= filteredExercises.length}
          className={`px-5 py-2 rounded-2xl shadow ${
            (currentPage + 1) * pageSize >= filteredExercises.length
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "text-white"
          }`}
          style={{
            backgroundColor: (currentPage + 1) * pageSize >= filteredExercises.length ? undefined : theme.primary,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ControlExerciseList;
