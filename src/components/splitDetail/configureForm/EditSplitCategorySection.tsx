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
              className="w-full h-11 rounded-xl border text-base max-w-104"
              style={{ borderColor: theme.translucentStrong, color: theme.dark }}
            >
              <SelectValue placeholder="None" />
            </SelectTrigger>

            <SelectContent className="rounded-xl shadow-lg border max-w-104 focus:outline-none text-base">
              <SelectItem value="none">None</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  <div className="flex items-center gap-2 ">
                    <span className="w-3 h-3 rounded-full border text-base" style={{ backgroundColor: c.color }} />
                    {c.name}
                  </div>
                </SelectItem>
              ))}
              <SelectItem value="new">+ Add New</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

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
        <div
          className="mt-3 flex flex-col gap-3 p-4 rounded-xl border"
          style={{
            borderColor: theme.translucentStrong,
            backgroundColor: theme.translucent,
          }}
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm" style={{ color: theme.darker }}>
              Category Name
            </Label>

            <Input
              {...register("newCategoryName", {
                required: "Category name is required",
                maxLength: {
                  value: 20,
                  message: "Max 20 characters",
                },
              })}
              maxLength={20}
              placeholder="e.g. Bodybuilding, Powerlifting.."
              className="w-full rounded-xl h-11 border text-base"
              style={{
                borderColor: errors.newCategoryName ? "#FF4D4F" : theme.translucentStrong,
                color: theme.dark,
              }}
            />

            {/* Error + Counter row */}
            <div className="flex justify-between text-xs mt-0.5">
              <span className="text-red-500">{errors.newCategoryName?.message}</span>
            </div>
          </div>

          {/* Color */}
          <div className="flex flex-col gap-1">
            <Label className="text-sm" style={{ color: theme.darker }}>
              Category Color
            </Label>
            <div className="flex items-center gap-3">
              <Input
                type="color"
                {...register("newCategoryColor", { required: true })}
                defaultValue={theme.primary}
                className="w-18 h-14 rounded-xl border cursor-pointer shadow-sm"
                style={{ borderColor: theme.translucentStrong }}
              />
              <span className="text-xs" style={{ color: theme.dark }}>
                Pick a color
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
