import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Split } from "../../types/splits";

const SplitDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [split, setSplit] = useState<Split | null>(null);

  useEffect(() => {
    const storedSplits = localStorage.getItem("splits");
    if (storedSplits) {
      const allSplits: Split[] = JSON.parse(storedSplits);
      const found = allSplits.find((s) => s.id === id);
      setSplit(found || null);
    }
  }, [id]);

  const handleAddExercise = () => {
    console.log("Global + button clicked");
  };

  if (!split) {
    return (
      <div className="p-6">
        <p className="text-red-500">Split not found.</p>
        <Link to="/splits" className="text-blue-600 underline">
          Back to splits
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 relative">
      <h1 className="text-2xl font-bold mb-6">{split.name}</h1>

      {/* Mobile-friendly grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {split.days.map((day) => (
          <div key={day.day} className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-lg mb-2">{day.day}</h2>
              {day.exercises.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  {day.exercises.map((ex) => (
                    <li key={ex.id}>
                      {ex.name}{" "}
                      <span className="text-gray-500">
                        ({ex.muscleGroup}
                        {ex.sets ? ` • ${ex.sets} sets` : ""}
                        {ex.reps ? ` × ${ex.reps} reps` : ""})
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-sm">No exercises</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating global + button */}
      <button
        onClick={handleAddExercise}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition-transform hover:scale-110"
      >
        +
      </button>
    </div>
  );
};

export default SplitDetailPage;
