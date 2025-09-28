import { RiArrowLeftLine } from "react-icons/ri";
import useBreakpoint from "../../hooks/useBreakpoint";
import { useNavigate } from "react-router-dom";

const NavigateBackButton = () => {
  const navigate = useNavigate();
  const { isDesktop, isMobile } = useBreakpoint();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className={`fixed top-6 left-4 flex items-center gap-2 px-4 py-2 bg-red-50 backdrop-blur-md border border-rose-300 text-rose-700 font-medium rounded-full shadow-sm hover:bg-red-100 hover:shadow-md transition-all ${
          isDesktop ? "top-20 left-3 text-base sm:text-lg" : isMobile ? "top-5 left-3 text-lg" : "top-10 left-3 text-sm"
        }`}
      >
        <RiArrowLeftLine className="m-1 text-xl" /> Back
      </button>
    </div>
  );
};

export default NavigateBackButton;
