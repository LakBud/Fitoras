import { Link } from "react-router-dom";
import { useCurrentSplitStore } from "../../stores/useCurrentSplitStore";
import { useExercise } from "../../hooks/useExercise";
import { motion } from "framer-motion";

const SplitTable = () => {
  const currentSplit = useCurrentSplitStore((state) => state.currentSplit);
  const { exercises: allExercises, loading } = useExercise();

  if (!currentSplit) return null;
  if (loading) return <div>Loading exercises...</div>;

  const getExerciseById = (id: string) => allExercises.find((ex) => ex.id === id);

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-7 gap-4 min-w-[1200px]">
        {currentSplit.days.map((dayObj) => (
          <div key={dayObj.day} className="flex flex-col bg-gray-50 rounded-2xl shadow-sm p-2 border border-gray-200">
            <h3 className="font-bold text-center mb-2 text-gray-700">{dayObj.day}</h3>
            <div className="flex flex-col gap-3">
              {/* Day exercises */}
              {dayObj.exercises.map((ex, index) => {
                const fullEx = getExerciseById(ex.id) || ex;
                const imageSrc = fullEx.images && fullEx.images.length > 0 ? `/data/exercises/${fullEx.images[0]}` : undefined;

                return (
                  <Link key={`${dayObj.day}_ex_${ex.id}_${index}`} to={`/exercise/${fullEx.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
                      className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
                    >
                      {imageSrc ? (
                        <img src={imageSrc} alt={fullEx.name} className="w-full h-28 object-cover rounded-t-2xl" loading="lazy" />
                      ) : (
                        <div className="w-full h-28 bg-gray-100 flex items-center justify-center text-gray-400 text-xs rounded-t-2xl">
                          No Image
                        </div>
                      )}
                      <div className="p-2">
                        <h4 className="font-semibold text-sm sm:text-base">{fullEx.name}</h4>
                        <p className="text-xs text-gray-500">
                          {ex.sets} x {ex.reps}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Category exercises */}
              {dayObj.categories?.map((cat) =>
                cat.exercises.map((ex, index) => {
                  const fullEx = getExerciseById(ex.id) || ex;
                  const imageSrc = fullEx.images && fullEx.images.length > 0 ? `/data/exercises/${fullEx.images[0]}` : undefined;

                  return (
                    <Link key={`${dayObj.day}_cat_${cat.id}_ex_${ex.id}_${index}`} to={`/exercise/${fullEx.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
                        className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
                      >
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={fullEx.name}
                            className="w-full h-28 object-cover rounded-t-2xl"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-28 bg-gray-100 flex items-center justify-center text-gray-400 text-xs rounded-t-2xl">
                            No Image
                          </div>
                        )}
                        <div className="p-2">
                          <h4 className="font-semibold text-sm sm:text-base">{fullEx.name}</h4>
                          <p className="text-xs text-gray-500">
                            {ex.sets} x {ex.reps}
                          </p>
                          <p className="text-xs text-gray-400 italic">{cat.name}</p>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplitTable;
