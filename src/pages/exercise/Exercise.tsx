import { FaWeightHanging } from "react-icons/fa";
import ExerciseList from "../../components/ExerciseList";

const Exercise = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-16">
      {/* Page Title */}
      <div className="flex flex-col items-center mb-8">
        <FaWeightHanging className="text-red-600 text-6xl mb-4 drop-shadow-md" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-red-600 tracking-tight text-center">Exercises</h1>
      </div>

      {/* Exercise List Container */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-red-200">
        <ExerciseList />
      </div>
    </div>
  );
};

export default Exercise;
