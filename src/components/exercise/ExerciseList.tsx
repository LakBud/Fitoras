import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import { useExercise } from "../../hooks/useExercise";
import { type Exercise } from "../../types/exercise";

export default function ExerciseList() {
  const { exercises, loading } = useExercise();
  const [displayed, setDisplayed] = useState<Exercise[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_LOAD = 40;

  // Initialize displayed exercises once exercises are loaded
  useEffect(() => {
    if (!loading && exercises.length > 0 && displayed.length === 0) {
      setDisplayed(exercises.slice(0, ITEMS_PER_LOAD));
    }
  }, [loading, exercises]);

  const fetchMoreData = () => {
    if (displayed.length >= exercises.length) {
      setHasMore(false);
      return;
    }
    const nextItems = exercises.slice(displayed.length, displayed.length + ITEMS_PER_LOAD);
    setDisplayed((prev) => [...prev, ...nextItems]);
  };

  if (loading) {
    return <p className="text-center mt-16 text-red-600 font-bold text-lg animate-pulse">Loading exercises...</p>;
  }

  return (
    <InfiniteScroll
      dataLength={displayed.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p className="text-center mt-6 text-red-500 font-medium animate-pulse">Loading more exercises...</p>}
      className="px-4 sm:px-6 md:px-8 lg:px-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayed.map((exercise) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 6px 15px rgba(220, 38, 38, 0.25)",
            }}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center border border-red-100 transition-all"
          >
            {exercise.images?.[0] ? (
              <img
                src={`/data/exercises/${exercise.images[0]}`}
                alt={exercise.name}
                className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-xl mb-3"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-36 sm:h-40 md:h-44 bg-gray-100 rounded-xl mb-3 flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}

            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-red-600 text-center break-words">
              {exercise.name}
            </h3>

            <p className="text-sm text-gray-500 text-center mt-1">
              {exercise.category || "General"}
              {exercise.primaryMuscles?.length ? ` | ${exercise.primaryMuscles.join(", ")}` : ""}
            </p>
          </motion.div>
        ))}
      </div>

      {!hasMore && <p className="text-center mt-8 text-gray-500 font-medium">You have reached the end of the list.</p>}
    </InfiniteScroll>
  );
}
