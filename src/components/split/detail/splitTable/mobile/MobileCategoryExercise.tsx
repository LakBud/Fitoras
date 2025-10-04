import { Link } from "react-router-dom";
import { useThemeColor } from "@/hooks/ui/useThemeColor";

// ==================== HELPER COMPONENT FOR MOBILE CATEGORY EXERCISES ====================
const MobileCategoryExercise = ({
  cat,
  ex,
  index,
  dayDay,
  getExerciseById,
  theme,
}: {
  cat: any;
  ex: any;
  index: number;
  dayDay: string;
  getExerciseById: (id: string) => any;
  theme: ReturnType<typeof useThemeColor>;
}) => {
  const catTheme = useThemeColor(cat.color);
  const fullEx = getExerciseById(ex.id) || ex;
  const imageSrc = fullEx.images && fullEx.images.length > 0 ? `/data/exercises/${fullEx.images[0]}` : undefined;

  return (
    <Link key={`${dayDay}_cat_${cat.id}_ex_${ex.id}_${index}`} to={`/exercise/${fullEx.id}`}>
      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
        {imageSrc ? (
          <img src={imageSrc} alt={fullEx.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" loading="lazy" />
        ) : (
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: theme.translucent }}
          >
            <svg
              className="w-6 h-6 opacity-40"
              style={{ color: theme.primary }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{fullEx.name}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500">
              {ex.sets} × {ex.reps}
            </span>
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: catTheme.translucent,
                color: catTheme.darker,
              }}
            >
              {cat.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MobileCategoryExercise;
