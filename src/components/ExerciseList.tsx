import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";

type Exercise = {
  id: string;
  name: string;
  category?: string;
  images?: string[];
};

export default function ExerciseGrid() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [displayed, setDisplayed] = useState<Exercise[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_LOAD = 20;

  useEffect(() => {
    axios
      .get("/data/allExercises.json")
      .then((res) => {
        setExercises(res.data);
        setDisplayed(res.data.slice(0, ITEMS_PER_LOAD));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const fetchMoreData = () => {
    if (displayed.length >= exercises.length) {
      setHasMore(false);
      return;
    }
    const nextItems = exercises.slice(displayed.length, displayed.length + ITEMS_PER_LOAD);
    setDisplayed((prev) => [...prev, ...nextItems]);
  };

  if (loading) return <p className="text-center mt-10 text-red-600 font-semibold text-lg">Loading exercises...</p>;

  return (
    <InfiniteScroll
      dataLength={displayed.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<p className="text-center mt-4 text-red-500 font-medium">Loading more...</p>}
      endMessage={<p className="text-center mt-4 text-red-500 font-medium">All exercises loaded.</p>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {displayed.map((exercise) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            whileHover={{ scale: 1.05, boxShadow: "0 5px 5px rgba(255, 0, 0, 0.25)" }}
            className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-md p-4 flex flex-col items-center border border-red-200 transition-all"
          >
            {exercise.images?.[0] && (
              <img
                src={`/data/exercises/${exercise.images[0]}`}
                alt={exercise.name}
                className="w-full h-36 object-cover rounded-xl mb-3"
                loading="lazy"
              />
            )}
            <h2 className="text-lg font-semibold text-red-600 text-center truncate">{exercise.name}</h2>
            <p className="text-sm text-gray-500 text-center mt-1 truncate">{exercise.category || "General"}</p>
          </motion.div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
