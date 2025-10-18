import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Label } from "@/components/ui/label";
import { SplitCategorySelect } from "./SplitCategorySelect";
import { useSplitForm } from "@/hooks/split/useSplitForm";
import { Input } from "@/components/ui/input";

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
    <motion.form
      onSubmit={onSubmit}
      onClick={(e) => e.stopPropagation()}
      className="relative flex flex-col max-h-[90vh] w-full max-w-md mx-auto overflow-y-auto px-4 sm:px-6 py-6 space-y-6 bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-rose-200"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
    >
      <Button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 text-2xl font-bold text-rose-400 hover:text-rose-600 bg-white"
      >
        &times;
      </Button>
      <h2 className="text-3xl font-extrabold text-center pt-2 pb-1 text-rose-500">Create New Split</h2>

      <div className="space-y-1">
        <Label htmlFor="name" className="block text-sm font-semibold text-rose-600">
          Split Name
        </Label>
        <Input
          id="name"
          {...register("name", { required: true })}
          placeholder="e.g. Push/Pull/Legs"
          className={`mt-1 w-full px-4 py-6 rounded-xl shadow-sm focus:outline-none transition text-3xl text-gray-800 ${
            errors.name
              ? "border-red-600 ring-red-200 border focus:ring-2"
              : "border border-rose-300 focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
          }`}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description" className="block text-sm font-semibold text-rose-600">
          Description <span className="text-gray-400">(Optional)</span>
        </Label>
        <textarea
          id="description"
          {...register("description")}
          rows={3}
          className="mt-1 w-full px-4 py-3 rounded-xl shadow-sm focus:outline-none transition resize-none text-base text-gray-800 border border-rose-300 focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
          placeholder="Optional description..."
        />
      </div>

      <SplitCategorySelect register={register} watchCategoryId={watchCategoryId} categories={categories} />

      <Button
        type="submit"
        className="w-full py-6 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-base sm:text-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white mt-2"
      >
        Create
      </Button>
    </motion.form>
  );
};
