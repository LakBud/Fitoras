import { useState } from "react";
import { BsPersonFillGear } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEditSplitForm } from "@/hooks/useEditSplitForm";
import type { Category } from "@/stores/splitControl/useCurrentCategories";
import { EditSplitCategorySection } from "./EditSplitCategorySection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditSplitFormProps {
  splitToEdit: {
    id: string;
    name: string;
    description?: string;
    category?: Category;
  };
}

const EditSplitForm = ({ splitToEdit }: EditSplitFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    onSubmit,
    watchCategoryId,
    editingCategoryColor,
    handleCategoryColorChange,
    handleCategoryDeleted,
    formState: { errors },
    categories,
    theme,
    originalTheme,
  } = useEditSplitForm({ splitToEdit });

  return (
    <>
      <Button
        className="flex items-center gap-2"
        style={{ backgroundColor: originalTheme.primary, color: originalTheme.textOnPrimary }}
        onClick={() => setIsOpen(true)}
      >
        <BsPersonFillGear className="text-lg" /> Configure
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg w-full rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-extrabold break-words" style={{ color: theme.primary }}>
              Configure Split
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="flex flex-col space-y-1">
              <Label className="text-sm font-semibold break-words" style={{ color: theme.darker }}>
                Split Name
              </Label>
              <Input
                {...register("name", { required: true })}
                placeholder="e.g. Push/Pull/Legs"
                className="w-full px-4 py-3 rounded-xl shadow-sm border focus:outline-none text-base break-words"
                style={{ borderColor: errors.name ? "#FF4D4F" : theme.translucentStrong, color: theme.dark }}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">This field is required</p>}
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-1">
              <Label className="text-sm font-semibold break-words" style={{ color: theme.darker }}>
                Description <span className="text-gray-400">(Optional)</span>
              </Label>
              <Textarea
                {...register("description")}
                placeholder="Optional description..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl shadow-sm border focus:outline-none text-base min-h-[120px] max-h-40 resize-y break-all"
                style={{ borderColor: theme.translucentStrong, color: theme.dark }}
              />
            </div>

            <EditSplitCategorySection
              categories={categories}
              errors={errors}
              theme={theme}
              watchCategoryId={watchCategoryId}
              editingCategoryColor={editingCategoryColor}
              handleCategoryColorChange={handleCategoryColorChange}
              handleCategoryDeleted={handleCategoryDeleted}
              register={register}
            />

            <Button type="submit" className="w-full" style={{ backgroundColor: theme.primary, color: theme.textOnPrimary }}>
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditSplitForm;
