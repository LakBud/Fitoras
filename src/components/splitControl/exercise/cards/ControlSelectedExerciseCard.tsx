import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SplitExercise } from "@/types/splits";
import { useThemeColor } from "@/hooks/ui/useThemeColor";

interface Props {
  ex: SplitExercise;
  isMobile: boolean;
  splitCategoryColor?: string;
  selectedCategoryId?: string;
  onChange: (id: string, field: "sets" | "reps", value: number, categoryId?: string) => void;
  onRemove: (id: string, categoryId?: string) => void;
}

export function ControlSelectedExerciseCard({ ex, isMobile, splitCategoryColor, selectedCategoryId, onChange, onRemove }: Props) {
  const theme = useThemeColor(splitCategoryColor);

  return (
    <div
      className="rounded-xl border p-3 sm:p-4 flex flex-col items-center transition-transform hover:shadow-lg hover:scale-[1.02] bg-white"
      style={{ borderColor: theme.translucentStrong }}
    >
      {/* Image */}
      {ex.images?.[0] ? (
        <img
          src={`/data/exercises/${ex.images[0]}`}
          alt={ex.name}
          className={`w-full object-cover rounded-lg mb-3 ${isMobile ? "h-24" : "h-36"}`}
          loading="lazy"
        />
      ) : (
        <div
          className={`w-full rounded-lg mb-3 flex items-center justify-center text-gray-400 text-xs ${
            isMobile ? "h-24" : "h-36"
          }`}
          style={{ backgroundColor: theme.translucent }}
        >
          No Image
        </div>
      )}

      {/* Name */}
      <h5
        className={`font-semibold text-center break-words mb-3 ${isMobile ? "text-sm" : "text-base"}`}
        style={{ color: theme.primary }}
      >
        {ex.name}
      </h5>

      {/* Sets × Reps + Remove */}
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-center gap-2">
          {/* Sets */}
          <div className="flex flex-col items-center">
            <Label className="text-xs text-gray-500 mb-1">Sets</Label>
            <Input
              type="number"
              value={ex.sets}
              min={1}
              onChange={(e) => onChange(ex.id, "sets", Number(e.target.value), selectedCategoryId)}
              className="w-13 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-offset-1 transition text-sm"
              style={{ borderColor: theme.translucentStrong }}
            />
          </div>

          <span className="text-gray-500 font-semibold text-lg select-none pt-6">×</span>

          {/* Reps */}
          <div className="flex flex-col items-center">
            <Label className="text-xs text-gray-500 mb-1">Reps</Label>
            <Input
              type="number"
              value={ex.reps}
              min={1}
              onChange={(e) => onChange(ex.id, "reps", Number(e.target.value), selectedCategoryId)}
              className="w-14 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-offset-1 transition text-sm"
              style={{ borderColor: theme.translucentStrong }}
            />
          </div>
        </div>

        <Button
          className="px-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition hover:opacity-90 mt-2"
          style={{ backgroundColor: theme.darker }}
          onClick={() => onRemove(ex.id, selectedCategoryId)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
