import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SplitCategorySelect } from "./SplitCategorySelect";
import { useSplitForm } from "@/hooks/split/useSplitForm";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onClose: () => void;
}

export const SplitForm = ({ onClose }: Props) => {
  const { form, onSubmit, watchCategoryId, categories } = useSplitForm(onClose);
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className="relative space-y-6">
      <DialogHeader className="pb-2">
        <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-rose-500 text-center">Create New Split</DialogTitle>
      </DialogHeader>

      {/* Name */}
      <div className="flex flex-col space-y-1">
        <Label className="text-sm font-semibold text-rose-600">Split Name</Label>
        <Input
          {...register("name", { required: "This field is required" })}
          placeholder="e.g. Push/Pull/Legs"
          className={`px-4 py-4 text-lg rounded-xl ${
            errors.name ? "border-red-600 focus:ring-red-200" : "border-rose-300 focus:ring-rose-200 focus:border-rose-500"
          }`}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col space-y-1">
        <Label className="text-sm font-semibold text-rose-600">
          Description <span className="text-gray-400">(Optional)</span>
        </Label>

        <Textarea
          {...register("description")}
          placeholder="Optional description..."
          className="w-full rounded-xl border border-rose-300 focus:ring-rose-200 focus:border-rose-500 text-base min-h-[120px] max-h-40 resize-y break-all"
        />
      </div>

      {/* Category & new category fields */}
      <SplitCategorySelect control={form.control} register={register} watchCategoryId={watchCategoryId} categories={categories} />

      {/* New category validation */}
      {watchCategoryId === "new" && (
        <div className="space-y-1 -mt-3">
          {errors.newCategoryName && <p className="text-xs text-red-500">Category name is required</p>}
          {errors.newCategoryColor && <p className="text-xs text-red-500">Color is required</p>}
        </div>
      )}

      <Button type="submit" className="w-full py-6 font-semibold rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-lg">
        Create
      </Button>
    </form>
  );
};
