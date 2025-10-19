import { useState, useCallback } from "react";

type PanelKey = "days" | "categories" | "selected" | "library";

export function useCollapsedPanels(initial?: Partial<Record<PanelKey, boolean>>) {
  const [collapsed, set] = useState<Record<PanelKey, boolean>>({
    days: initial?.days ?? false,
    categories: initial?.categories ?? false,
    selected: initial?.selected ?? false,
    library: initial?.library ?? false,
  });

  const toggle = useCallback((key: PanelKey) => {
    set((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const setValue = useCallback((key: PanelKey, value: boolean) => {
    set((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { collapsed, toggle, setValue };
}
