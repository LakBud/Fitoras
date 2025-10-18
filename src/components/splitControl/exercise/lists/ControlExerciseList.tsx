import { Button } from "@/components/ui/button";
import { ControlExerciseCard } from "../cards/ControlExerciseCard";
import { useControlExercises } from "@/hooks/splitControl/useControlExercises";
import { useThemeColor } from "@/hooks/ui/useThemeColor";

export const ControlExerciseList = () => {
  const {
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
  } = useControlExercises();

  const theme = useThemeColor(split?.category?.color);

  if (loading) return <p>Loading exercises...</p>;
  if (!filteredExercises.length) return <p>No exercises found.</p>;

  return (
    <div className="space-y-5">
      {/* Grid */}
      <div className={`grid gap-4 ${isMobile ? "grid-cols-2" : isDesktop ? "grid-cols-4" : "grid-cols-2 sm:grid-cols-3"}`}>
        {visibleExercises.map((ex) => (
          <ControlExerciseCard
            key={ex.id}
            exercise={ex}
            isAdded={!!displayedExercises?.some((e) => e.id === ex.id)}
            onAdd={handleAddExercise}
            isMobile={isMobile}
            categoryColor={split?.category?.color}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        <Button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-5 py-2 rounded-xl shadow ${
            currentPage === 0 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "text-white"
          }`}
          style={{ backgroundColor: currentPage === 0 ? undefined : theme.dark }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={(currentPage + 1) * pageSize >= filteredExercises.length}
          className={`px-5 py-2 rounded-xl shadow ${
            (currentPage + 1) * pageSize >= filteredExercises.length
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "text-white"
          }`}
          style={{
            backgroundColor: (currentPage + 1) * pageSize >= filteredExercises.length ? undefined : theme.dark,
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ControlExerciseList;
