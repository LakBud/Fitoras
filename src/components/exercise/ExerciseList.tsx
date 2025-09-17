import { motion } from "framer-motion";
import { type Exercises } from "../../types/exercise";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

interface ExerciseListProps {
  exercises: Exercises[];
  pageSize?: number;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, pageSize = 8 }) => {
  const [visibleExercises, setVisibleExercises] = useState<Exercises[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  // Reset visible exercises when the exercises list changes (filtered list)
  useEffect(() => {
    if (!exercises.length) {
      setVisibleExercises([]);
      setHasMore(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const initial = exercises.slice(0, pageSize);
    setVisibleExercises(initial);
    setHasMore(exercises.length > pageSize);

    const timer = setTimeout(() => setLoading(false), 300); // simulate small load
    return () => clearTimeout(timer);
  }, [exercises, pageSize]);

  const loadMore = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const next = exercises.slice(visibleExercises.length, visibleExercises.length + pageSize);

    setTimeout(() => {
      const updated = [...visibleExercises, ...next];
      setVisibleExercises(updated);
      setHasMore(updated.length < exercises.length);
      setLoading(false);
    }, 400); // simulate network delay
  };

  const renderCard = (exercise: Exercises) => (
    <Link key={exercise.id} to={`/exercise/${exercise.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0 6px 15px rgba(220,38,38,0.25)" }}
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

        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-red-600 text-center break-words">{exercise.name}</h3>
        <p className="text-sm text-gray-500 text-center mt-1">
          {exercise.category || "General"}
          {exercise.primaryMuscles?.length ? ` | ${exercise.primaryMuscles.join(", ")}` : ""}
        </p>
      </motion.div>
    </Link>
  );

  const renderSkeleton = (index: number) => (
    <div
      key={`skeleton-${index}`}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center border border-red-100 transition-all animate-pulse"
    >
      <div className="w-full h-36 sm:h-40 md:h-44 bg-gray-200 rounded-xl mb-3" />
      <div className="w-3/4 h-5 bg-gray-200 rounded mb-2" />
      <div className="w-1/2 h-4 bg-gray-200 rounded" />
    </div>
  );

  return (
    <InfiniteScroll
      dataLength={visibleExercises.length}
      next={loadMore}
      hasMore={hasMore && !loading}
      scrollThreshold={0.9}
      loader={null} // Skeletons handle loading
    >
      <div
        className={`px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${
          loading ? "pointer-events-none" : ""
        }`}
      >
        {visibleExercises.map(renderCard)}
        {loading && Array.from({ length: pageSize }).map((_, i) => renderSkeleton(i))}
      </div>

      {!loading && visibleExercises.length === 0 && (
        <p className="text-center mt-8 text-gray-500 font-medium">No exercises found.</p>
      )}
    </InfiniteScroll>
  );
};
