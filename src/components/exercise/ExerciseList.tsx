import InfiniteScroll from "react-infinite-scroll-component";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseCardSkeleton } from "./ExerciseCardSkeleton";
import { useExerciseList } from "@/hooks/exercise/useExerciseList";

interface ExerciseListProps {
  pageSize?: number;
  columns?: { mobile: number; sm?: number; md?: number; lg?: number };
}

export const ExerciseList: React.FC<ExerciseListProps> = ({ pageSize = 8, columns = { mobile: 1, sm: 2, md: 3, lg: 4 } }) => {
  const { visibleExercises, hasMore, loading, loadMore } = useExerciseList(pageSize);

  // Custom Tailwind gridClass
  const gridClass = `grid grid-cols-${columns.mobile} 
    ${columns.sm ? `sm:grid-cols-${columns.sm}` : ""} 
    ${columns.md ? `md:grid-cols-${columns.md}` : ""} 
    ${columns.lg ? `lg:grid-cols-${columns.lg}` : ""} 
    gap-5`;

  return (
    <InfiniteScroll
      dataLength={visibleExercises.length}
      next={loadMore}
      hasMore={hasMore && !loading}
      scrollThreshold={0.9}
      loader={null}
    >
      <div className={gridClass}>
        {visibleExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}

        {loading && Array.from({ length: pageSize }).map((_, i) => <ExerciseCardSkeleton key={i} />)}
      </div>

      {!loading && visibleExercises.length === 0 && (
        <p className="text-center mt-8 text-gray-500 font-medium">No exercises found.</p>
      )}
    </InfiniteScroll>
  );
};
