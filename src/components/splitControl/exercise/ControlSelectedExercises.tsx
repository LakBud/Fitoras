import { useCategoryControl } from "@/hooks/splitControl/useCategoryControl";
import { useExerciseControl } from "@/hooks/exercise/useExerciseControl";
import { useSplitControl } from "@/hooks/splitControl/useSplitControl";
import { useThemeColor } from "@/hooks/ui/useThemeColor";
import useBreakpoint from "@/hooks/ui/useBreakpoint";
import { FiInfo } from "react-icons/fi";

const ControlSelectedExercises = () => {
  const { selectedCategoryId } = useCategoryControl();
  const { displayedExercises, handleChangeSetsReps, handleRemoveExercise } = useExerciseControl();
  const { split } = useSplitControl();
  const { isMobile } = useBreakpoint();

  const theme = useThemeColor(split?.category?.color);

  return (
    <div className="space-y-4">
      {/* Heading */}

      {/* Empty state */}
      {displayedExercises?.length === 0 ? (
        <div
          className="w-full p-6 rounded-xl flex flex-col items-center justify-center text-center text-gray-500 space-y-2"
          style={{
            backgroundColor: theme.lighter,
            border: `1.5px dashed ${theme.translucentStrong}`,
            minHeight: "150px",
          }}
        >
          <FiInfo className="text-3xl mb-2" style={{ color: theme.primary }} />
          <p className="text-base font-semibold" style={{ color: theme.dark }}>
            No exercises selected yet
          </p>
          <p className="text-sm text-gray-500 max-w-xs">
            Select exercises by clicking on the prioritized exercise from the list.
          </p>
        </div>
      ) : (
        <div
          className={`
          grid gap-4
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        `}
        >
          {displayedExercises?.map((ex, idx) => (
            <div
              key={`${ex.id}-${idx}`}
              className="rounded-xl border p-3 sm:p-4 flex flex-col items-center transition-transform hover:shadow-lg hover:scale-[1.02] bg-white"
              style={{ borderColor: theme.translucentStrong }}
            >
              {/* Image */}
              {ex.images?.[0] ? (
                <img
                  src={`/data/exercises/${ex.images[0]}`}
                  alt={ex.name}
                  className={`w-full object-cover rounded-lg mb-3 ${isMobile ? "h-24" : "h-36"}`}
                  loading="lazy"
                />
              ) : (
                <div
                  className={`w-full rounded-lg mb-3 flex items-center justify-center text-gray-400 text-xs ${
                    isMobile ? "h-24" : "h-36"
                  }`}
                  style={{ backgroundColor: theme.translucent }}
                >
                  No Image
                </div>
              )}

              {/* Name */}
              <h5
                className={`font-semibold text-center break-words mb-3 ${isMobile ? "text-sm" : "text-base"}`}
                style={{ color: theme.primary }}
              >
                {ex.name}
              </h5>

              {/* Sets × Reps + Remove */}
              <div className="flex flex-col w-full gap-2">
                {/* Sets × Reps Inputs */}
                <div className="flex justify-center gap-2">
                  {/* Sets */}
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-gray-500 mb-1">Sets</label>
                    <input
                      type="number"
                      value={ex.sets}
                      min={1}
                      onChange={(e) =>
                        handleChangeSetsReps(ex.id, "sets", Number(e.target.value), selectedCategoryId || undefined)
                      }
                      className="w-13 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-offset-1 transition text-sm"
                      style={{ borderColor: theme.translucentStrong }}
                    />
                  </div>

                  <span className="text-gray-500 font-semibold text-lg select-none pt-4">×</span>

                  {/* Reps */}
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-gray-500 mb-1">Reps</label>
                    <input
                      type="number"
                      value={ex.reps}
                      min={1}
                      onChange={(e) =>
                        handleChangeSetsReps(ex.id, "reps", Number(e.target.value), selectedCategoryId || undefined)
                      }
                      className="w-14 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-offset-1 transition text-sm"
                      style={{ borderColor: theme.translucentStrong }}
                    />
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-white transition hover:opacity-90 mt-2"
                  style={{ backgroundColor: theme.darker }}
                  onClick={() => handleRemoveExercise(ex.id, selectedCategoryId || undefined)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ControlSelectedExercises;
