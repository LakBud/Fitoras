import useBreakpoint from "../../../../../hooks/ui/useBreakpoint";
import { useSplitControl } from "../../../../../hooks/control/useSplitControl";

const ControlDayTabs = () => {
  const { split, setSelectedDay, setSelectedCategoryId } = useSplitControl();
  const { isDesktop } = useBreakpoint();

  return (
    <div>
      <div className={`flex gap-3 ${isDesktop ? "lg:flex-col lg:overflow-x-visible" : "overflow-x-auto"}`}>
        {split?.days.map((d: any) => (
          <button
            key={d.day}
            onClick={() => {
              setSelectedDay?.(d.day);
              setSelectedCategoryId?.(null);
            }}
          >
            {d.day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ControlDayTabs;
