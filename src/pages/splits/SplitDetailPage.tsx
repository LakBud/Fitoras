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
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-6">{split.name}</h1>

      {/* Weekly schedule grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {split.days.map((day) => (
          <div key={day.day} className="bg-white rounded-xl shadow p-3 flex flex-col min-h-[150px]">
            <h2 className="font-semibold text-md mb-2 border-b pb-1">{day.day}</h2>
            {day.exercises.length > 0 ? (
              <ul className="text-sm text-gray-700 space-y-1 mt-1">
                {day.exercises.map((ex) => (
                  <li key={ex.id}>
                    <span className="font-medium">{ex.name}</span>{" "}
                    <span className="text-gray-500">
                      ({ex.muscleGroup}
                      {ex.sets ? ` • ${ex.sets} sets` : ""}
                      {ex.reps ? ` × ${ex.reps} reps` : ""})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic text-sm mt-2">Rest</p>
            )}
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
