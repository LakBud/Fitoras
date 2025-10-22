import { Controller, type Control, type UseFormRegister } from "react-hook-form";
import type { FormValues } from "@/hooks/split/useSplitForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface Props {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  watchCategoryId: string | undefined;
  categories: { id: string; name: string; color: string }[];
}

export const SplitCategorySelect = ({ control, register, watchCategoryId, categories }: Props) => (
  <div className="space-y-2">
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-rose-600">
        Category <span className="text-gray-400">(Optional)</span>
      </Label>

      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <Select value={field.value ?? "none"} onValueChange={(v) => field.onChange(v === "none" ? "" : v)}>
            <SelectTrigger className="w-full rounded-xl border border-rose-300 h-11 text-base">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>

            <SelectContent className="rounded-xl shadow-lg border-red-200">
              <SelectItem value="none">None</SelectItem>

              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: c.color }} />
                    {c.name}
                  </div>
                </SelectItem>
              ))}

              <SelectItem value="new" className="text-red-500">
                + Add New
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </div>

    {watchCategoryId === "new" && (
      <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/40 p-4 space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <Label className="text-sm text-rose-600">Category Name</Label>
          <Input
            type="text"
            {...register("newCategoryName", { required: true, maxLength: 20 })}
            maxLength={20}
            placeholder="e.g. Bodybuilding, Powerlifting.."
            className="w-full rounded-xl h-11 border border-rose-300 focus:ring-rose-200 focus:border-rose-500"
          />
        </div>

        {/* Color Picker */}
        <div className="space-y-1">
          <Label className="text-sm text-rose-600">Category Color</Label>
          <div className="flex items-center gap-4">
            <Input
              type="color"
              {...register("newCategoryColor", { required: true })}
              className="w-18 h-14 rounded-lg border border-rose-300 cursor-pointer"
            />
            <span className="text-xs text-gray-600">Pick a color</span>
          </div>
        </div>
      </div>
    )}
  </div>
);
