import { FaWeightHanging } from "react-icons/fa";
import ExerciseList from "../../components/exercise/ExerciseList";
import ExerciseFilter from "../../components/exercise/ExerciseFilter";

const Exercise = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100 py-12 px-4 sm:px-8 lg:px-16">
      {/* Page Header */}
      <header className="flex flex-col items-center mb-12">
        <div className="flex items-center justify-center w-28 h-28 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-red-50 to-red-200 mb-4 shadow-lg">
          <FaWeightHanging className="text-red-600 text-6xl sm:text-7xl drop-shadow-sm" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-600 tracking-tight text-center">Exercises</h1>
        <p className="mt-3 text-gray-600 text-center text-sm sm:text-base md:text-base max-w-lg leading-relaxed">
          Explore a curated collection of exercises. Click any card to see primary muscles, category, instructions, and other
          details.
        </p>
      </header>

      {/* Exercise Container */}
      <main>
        <div>
          <ExerciseFilter />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-red-100">
          <ExerciseList />
        </div>
      </main>
    </div>
  );
};

export default Exercise;
