import { motion } from "framer-motion";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SplitItem from "./SplitItem";
import { FiInfo } from "react-icons/fi";
import { useSplitList } from "@/hooks/split/splitList";

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 px-4 rounded-2xl border border-dashed border-rose-200 bg-rose-50/50 shadow-inner">
    <FiInfo className="w-8 h-8 text-rose-400 mb-3" />
    <p className="text-base sm:text-lg text-gray-500 font-medium">{message}</p>
    <p className="text-sm text-gray-400 mt-1">Click the "+" icon to get started.</p>
  </div>
);

const SplitList = () => {
  const { splits, filteredSplits, activeSplit, sensors, handleDragStart, handleDragEnd } = useSplitList();

  if (splits.length === 0) return <EmptyState message="No split has been created." />;
  if (filteredSplits.length === 0) return <EmptyState message="No splits match your filters." />;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={filteredSplits.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-2 sm:gap-4 px-2 sm:px-0">
          {filteredSplits.map((split, index) => (
            <SplitItem key={split.id} index={index} {...split} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 0.25, easing: "ease-in-out" }}>
        {activeSplit && (
          <motion.div
            className="rounded-2xl p-3 sm:p-5 shadow-xl pointer-events-none border border-rose-100 max-w-[90vw] sm:max-w-[500px] overflow-hidden"
            style={{ backgroundColor: activeSplit.category?.color || "white" }}
            initial={{ scale: 0.98, opacity: 0.85 }}
            animate={{ scale: 1.03, opacity: 1 }}
          >
            <div className="flex items-center justify-between gap-2 w-full min-w-0">
              <h2 className="text-sm sm:text-lg font-semibold truncate" title={activeSplit.name}>
                {activeSplit.name}
              </h2>
              {activeSplit.category && (
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm whitespace-nowrap flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }}
                >
                  {activeSplit.category.name}
                </span>
              )}
            </div>

            <p
              className="mt-1 text-xs sm:text-sm leading-snug"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {activeSplit.description || "No description"}
            </p>
          </motion.div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default SplitList;
