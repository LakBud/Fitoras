export const ExerciseCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center border border-red-100 animate-pulse">
    <div className="w-full h-36 sm:h-40 md:h-44 bg-gray-200 rounded-xl mb-3" />
    <div className="w-3/4 h-5 bg-gray-200 rounded mb-2" />
    <div className="w-1/2 h-4 bg-gray-200 rounded" />
  </div>
);
