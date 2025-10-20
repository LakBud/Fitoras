import { useState, useMemo } from "react";
import { useSplitsStore } from "@/stores/split/useSplitStore";

import { useSplitFilterStore } from "@/stores/split/useSplitFilterStore";
import {
  useSensor,
  useSensors,
  PointerSensor,
  type UniqueIdentifier,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export function useSplitList() {
  const splits = useSplitsStore((s) => s.splits);
  const setSplits = useSplitsStore((s) => s.setSplits);

  const { name: filterName, categoryId: filterCategoryId } = useSplitFilterStore();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const filteredSplits = useMemo(() => {
    return splits.filter((s) => {
      const matchesName = s.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesCategory = filterCategoryId ? s.category?.id === filterCategoryId : true;
      return matchesName && matchesCategory;
    });
  }, [splits, filterName, filterCategoryId]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSplits(
        arrayMove(
          splits,
          splits.findIndex((s) => s.id === active.id),
          splits.findIndex((s) => s.id === over.id)
        )
      );
    }
    setActiveId(null);
  };

  const activeSplit = useMemo(() => filteredSplits.find((s) => s.id === activeId), [activeId, filteredSplits]);

  return {
    splits,
    filteredSplits,
    activeSplit,
    sensors,
    handleDragStart,
    handleDragEnd,
  };
}
