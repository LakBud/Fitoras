import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useSplitsStore } from "../../stores/splits/useSplitStore";
import type { Weekday, WorkoutDay } from "../../types/splits";

const allWeekdays: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface SplitFormProps {
  onClose: () => void;
}

interface FormValues {
  name: string;
  description?: string;
}

const SplitForm = ({ onClose }: SplitFormProps) => {
  const addSplit = useSplitsStore((state) => state.addSplit);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newSplit = {
      id: uuidv4(),
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
      days: allWeekdays.map<WorkoutDay>((day) => ({ day, exercises: [] })),
    };
    addSplit(newSplit);
    reset();
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gradient-to-tr from-rose-50 to-rose-100 rounded-3xl shadow-2xl p-8 space-y-6 max-w-lg w-full relative border border-rose-200"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-red-400 hover:text-red-700 transition text-2xl font-bold"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center bg-clip-text   text-rose-500">Create New Split</h2>

        {/* Split Name */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-red-600">Split Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className={`mt-1 w-full px-4 py-3 rounded-2xl border border-rose-300 shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition text-gray-800 ${
              errors.name ? "border-red-600 ring-red-200" : ""
            }`}
            placeholder="e.g. Push/Pull/Legs"
          />
          {errors.name && <span className="text-red-600 text-sm">This field is required</span>}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-red-600">
            Description <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            {...register("description")}
            className="mt-1 w-full px-4 py-3 rounded-2xl border border-rose-300 shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition resize-none text-gray-800"
            placeholder="Optional description..."
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold rounded-2xl shadow-lg hover:from-rose-600 hover:to-rose-700 hover:shadow-xl transition-all text-lg"
        >
          Create Split
        </button>
      </motion.form>
    </motion.div>
  );
};

export default SplitForm;
