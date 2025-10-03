import { RiArrowLeftLine } from "react-icons/ri";
import useBreakpoint from "../../hooks/ui/useBreakpoint";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const NavigateBackButton = () => {
  const navigate = useNavigate();
  const { isDesktop, isMobile } = useBreakpoint();

  return (
    <div className="z-50">
      <Button
        onClick={() => navigate(-1)}
        className={`fixed bottom-6 left-4 flex items-center gap-2 px-4 py-2 bg-red-200 backdrop-blur-md border border-rose-300 text-rose-700 font-medium rounded-full shadow-sm hover:bg-red-100 hover:shadow-md transition-all ${
          isDesktop ? "bottom-1 left-3 text-base sm:text-lg" : isMobile ? "bottom-23 left-3 text-lg" : "top-10 left-3 text-sm"
        }`}
      >
        <RiArrowLeftLine className="m-1 text-xl" /> {isDesktop ? "Back" : ""}
      </Button>
    </div>
  );
};

export default NavigateBackButton;
