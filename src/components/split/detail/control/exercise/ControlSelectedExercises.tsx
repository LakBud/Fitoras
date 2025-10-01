import { useCategoryControl } from "../../../../../hooks/control/useCategoryControl";
import { useExerciseControl } from "../../../../../hooks/control/useExerciseControl";

const ControlSelectedExercises = () => {
  const { selectedCategoryId } = useCategoryControl();
  const { displayedExercises, handleChangeSetsReps, handleRemoveExercise } = useExerciseControl();

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-700">{selectedCategoryId ? "Exercises in category" : "Exercises in day"}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayedExercises?.map((ex, idx) => (
          <div
            key={`${ex.id}-${idx}`} // <-- unique key using id + index
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center border border-gray-200 transition-all hover:shadow-lg hover:scale-105"
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

            <h5 className="text-base sm:text-lg md:text-xl font-semibold text-red-600 text-center break-words mb-1">{ex.name}</h5>

            <div className="flex gap-1 items-center justify-center w-full">
              <input
                type="number"
                value={ex.sets}
                min={1}
                onChange={(e) => handleChangeSetsReps(ex.id, "sets", Number(e.target.value), selectedCategoryId || undefined)}
                className="w-14 border rounded px-1 text-center"
              />
              <span className="text-gray-500">x</span>
              <input
                type="number"
                value={ex.reps}
                min={1}
                onChange={(e) => handleChangeSetsReps(ex.id, "reps", Number(e.target.value), selectedCategoryId || undefined)}
                className="w-14 border rounded px-1 text-center"
              />
              <button
                className="text-red-500 hover:underline text-sm"
                onClick={() => handleRemoveExercise(ex.id, selectedCategoryId || undefined)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlSelectedExercises;
