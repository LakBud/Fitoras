import { useState, useEffect } from "react";
import { useExerciseStore } from "../../../../../stores/exercises/useExerciseStore";
import { useExerciseControl } from "../../../../../hooks/control/useExerciseControl";
import type { Exercises } from "../../../../../types/exercise";

interface ControlExerciseListProps {
  pageSize?: number;
}

export const ControlExerciseList: React.FC<ControlExerciseListProps> = ({ pageSize = 10 }) => {
  const { exercises, loading, fetchExercises } = useExerciseStore();
  const { handleAddExercise, displayedExercises } = useExerciseControl();
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleExercises, setVisibleExercises] = useState<Exercises[]>([]);

  // Fetch exercises once
  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  // Update visible exercises whenever exercises or currentPage changes
  useEffect(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    setVisibleExercises(exercises.slice(start, end));
  }, [exercises, currentPage, pageSize]);

  const handleNext = () => {
    if ((currentPage + 1) * pageSize < exercises.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Loading exercises...</p>;
  if (!exercises.length) return <p>No exercises found.</p>;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visibleExercises.map((ex) => {
          // Disable if already in displayedExercises
          const isAdded = displayedExercises?.some((e) => e.id === ex.id);
          return (
            <div
              key={ex.id}
              onClick={() => !isAdded && handleAddExercise(ex)}
              className={`bg-white rounded-2xl shadow-md p-4 flex flex-col items-center border border-red-100 transition-all hover:shadow-lg hover:scale-105 cursor-pointer ${
                isAdded ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {ex.images?.[0] ? (
                <img
                  src={`/data/exercises/${ex.images[0]}`}
                  alt={ex.name}
                  className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-xl mb-3"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-36 sm:h-40 md:h-44 bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-red-600 text-center break-words">{ex.name}</h3>
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
            currentPage === 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"
          } transition`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={(currentPage + 1) * pageSize >= exercises.length}
          className={`px-5 py-2 rounded-2xl shadow ${
            (currentPage + 1) * pageSize >= exercises.length
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          } transition`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ControlExerciseList;
