import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsiblePanelProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  theme: any;
  isCollapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isMobile: boolean;
}

const CollapsiblePanel = ({ title, icon, theme, isCollapsed, onToggle, children, isMobile }: CollapsiblePanelProps) => {
  return (
    <div
      className={`backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 ${
        isCollapsed ? "shadow-md" : "shadow-xl"
      }`}
      style={{
        backgroundColor: theme.translucentStrong,
        boxShadow: isCollapsed ? `0 4px 12px ${theme.primary}10` : `0 8px 32px ${theme.primary}20`,
      }}
    >
      {/* Header */}
      <motion.button
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-3 transition-colors ${isMobile ? "p-3" : "p-4 sm:p-5"}`}
        style={{
          backgroundColor: isCollapsed ? "transparent" : `${theme.primary}08`,
          borderBottom: isCollapsed ? "none" : `1px solid ${theme.primary}20`,
        }}
        whileHover={{ backgroundColor: `${theme.primary}12` }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: `${theme.primary}20` }}>
            <div style={{ color: theme.primary }}>{icon}</div>
          </div>
          <h3 className="font-bold text-sm sm:text-base truncate" style={{ color: theme.dark }}>
            {title}
          </h3>
        </div>

        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" style={{ color: theme.primary }} />
        </motion.div>
      </motion.button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={isMobile ? "p-3" : "p-4 sm:p-5"}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsiblePanel;
