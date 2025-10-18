import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ReactNode } from "react";
import { FiSearch } from "react-icons/fi";
import { useSplitFilterStore } from "@/stores/split/useSplitFilterStore";

type FilterOption = readonly [key: string, options: { id: string; name: string }[], icon: ReactNode];

interface SplitFilterProps {
  filterOptions: readonly FilterOption[];
}

const DesktopSplitFilter = ({ filterOptions }: SplitFilterProps) => {
  const { name, categoryId, setFilters, resetFilters } = useSplitFilterStore();

  const changeName = (v: string) => setFilters({ name: v });
  const changeCategory = (v: string) => setFilters({ categoryId: v === "__all__" ? "" : v });

  return (
    <div
      role="search"
      aria-label="Split filter bar"
      className="z-20 sticky w-full top-0 md:top-auto bg-white/90 px-4 py-2 shadow-md border-t border-red-300 md:border-b md:border-t-0 rounded-b-2xl flex flex-row items-center gap-6"
    >
      {/* Search */}
      <div className="relative w-full md:w-64 flex-1">
        <Label htmlFor="split-search" className="sr-only">
          Search splits
        </Label>
        <Input
          type="search"
          id="split-search"
          name="search"
          placeholder="Search splits..."
          value={name}
          onChange={(e) => changeName(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-red-400 rounded-full bg-red-50/80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm placeholder-gray-600 text-sm transition-all duration-200"
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-lg" aria-hidden="true" />
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto gap-4 py-1 flex-1" aria-label="Split category filters">
        {filterOptions.map(([key, options, Icon]) => (
          <div key={key} className="relative flex-shrink-0 w-40 md:w-40">
            <Label htmlFor={`filter-${key}`} className="sr-only">
              Filter by {key}
            </Label>

            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600 text-lg pointer-events-none z-10"
              aria-hidden="true"
            >
              {Icon}
            </div>

            <Select value={categoryId || "__all__"} onValueChange={changeCategory}>
              <SelectTrigger
                id={`filter-${key}`}
                className="pl-10 pr-3 py-2 h-auto w-full border border-red-400 rounded-full bg-red-50/80 hover:bg-red-100/80 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
              >
                <SelectValue placeholder={categoryId ? options.find((o) => o.id === categoryId)?.name : "Category"} />
              </SelectTrigger>

              <SelectContent className="rounded-xl border-red-200 shadow-xl">
                <SelectItem
                  value="__all__"
                  className="font-semibold text-gray-600 focus:bg-red-50 focus:text-red-700 border-b border-gray-100"
                >
                  All Categories
                </SelectItem>

                {options.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id} className="font-medium focus:bg-red-50 focus:text-red-700">
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {/* Reset */}
      <Button
        onClick={resetFilters}
        aria-label="Reset all filters"
        className="ml-auto bg-red-700 text-white font-semibold px-5 py-2 rounded-2xl shadow hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition-all duration-200"
      >
        Reset
      </Button>
    </div>
  );
};

export default DesktopSplitFilter;
