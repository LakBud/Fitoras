import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CategoryDeleteButton from "./CategoryDeleteButton";
import type { Category } from "@/stores/split/useCurrentCategories";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Theme } from "@/types/theme";

interface Props {
  categories: Category[];
  errors: any;
  theme: Theme;
  watchCategoryId: string | undefined;
  editingCategoryColor: string;
  handleCategoryColorChange: (c: string) => void;
  handleCategoryDeleted: () => void;
  register: any;
}

export function EditSplitCategorySection({
  categories,
  errors,
  theme,
  watchCategoryId,
  editingCategoryColor,
  handleCategoryColorChange,
  handleCategoryDeleted,
  register,
  control,
}: Props & { control: any }) {
  const isNone = watchCategoryId === "" || watchCategoryId === "none";
  const displayColor = isNone ? "#6B7280" : editingCategoryColor;

  return (
    <div className="flex flex-col space-y-2">
      <Label className="text-sm font-semibold break-words" style={{ color: theme.darker }}>
        Category <span className="text-gray-400">(Optional)</span>
      </Label>

      <Controller
        name="categoryId"
        control={control}
        render={({ field }) => (
          <Select value={field.value ?? ""} onValueChange={(v) => field.onChange(v === "none" ? "" : v)}>
            <SelectTrigger
              className="w-full h-11 rounded-xl border text-base"
              style={{ borderColor: theme.translucentStrong, color: theme.dark }}
            >
              <SelectValue placeholder="None" />
            </SelectTrigger>

            <SelectContent className="rounded-xl shadow-lg border">
              <SelectItem value="none">None</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: c.color }} />
                    {c.name}
                  </div>
                </SelectItem>
              ))}
              <SelectItem value="new">+ Add New</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      {/* NOTE: removed the `watchCategoryId !== ""` guard */}
      {watchCategoryId !== "new" && (
        <div
          className="mt-3 flex flex-col gap-2 p-4 rounded-xl border"
          style={{ borderColor: theme.translucentStrong, backgroundColor: theme.translucent }}
        >
          <span className="text-sm font-semibold" style={{ color: theme.darker }}>
            Category Color
          </span>
          <p className="text-xs" style={{ color: theme.dark }}>
            Changes apply to all splits using this category
          </p>

          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-xl border shadow-sm flex-shrink-0"
              style={{
                backgroundColor: displayColor, // <-- gray when None
                borderColor: theme.translucentStrong,
              }}
            />

            <Input
              type="color"
              value={displayColor}
              disabled={isNone} // <-- disable when None
              onChange={(e) => handleCategoryColorChange(e.target.value)}
              className="appearance-none w-18 h-14 rounded-xl border cursor-pointer transition-transform transform hover:scale-110 focus:scale-110 disabled:cursor-not-allowed"
              style={{ borderColor: theme.translucentStrong }}
            />

            <span className="text-sm font-mono" style={{ color: theme.dark }}>
              {displayColor}
            </span>
          </div>

          {!isNone && (
            <CategoryDeleteButton
              category={categories.find((c) => c.id === watchCategoryId)}
              onDeleted={handleCategoryDeleted}
              editingColor={editingCategoryColor}
            />
          )}
        </div>
      )}

      {watchCategoryId === "new" && (
        <div className="mt-2 flex flex-col sm:flex-row gap-3">
          <input
            {...register("newCategoryName", { required: "Category name is required" })}
            placeholder="New category name"
            className="flex-1 w-full rounded-xl px-4 py-3 border focus:ring-2 text-base break-words"
            style={{ borderColor: errors.newCategoryName ? "#FF4D4F" : theme.translucentStrong, color: theme.dark }}
          />
          <input
            type="color"
            {...register("newCategoryColor")}
            defaultValue={theme.primary}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
