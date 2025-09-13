import { motion, AnimatePresence } from "framer-motion";
import { useReadingProgress } from "@/hooks/useReadingProgress";

interface ReadingProgressBarProps {
  className?: string;
  height?: number;
  showPercentage?: boolean;
  position?: "top" | "bottom";
}

export function ReadingProgressBar({
  className = "",
  height = 3,
  showPercentage = false,
  position = "top",
}: ReadingProgressBarProps) {
  const { progress, isReading, progressDecimal } = useReadingProgress();

  const getGradientColor = () => {
    if (progressDecimal < 0.2) return "from-blue-500 via-blue-400 to-blue-500";
    if (progressDecimal < 0.5)
      return "from-blue-500 via-indigo-500 to-purple-500";
    if (progressDecimal < 0.8)
      return "from-purple-500 via-pink-500 to-rose-500";
    if (progressDecimal < 0.95) return "from-rose-500 via-red-500 to-green-500";
    return "from-green-500 via-emerald-500 to-green-600"; // 100% 도달 시
  };

  return (
    <AnimatePresence>
      {isReading && (
        <motion.div
          initial={{ opacity: 0, y: position === "top" ? -5 : 5, scaleY: 0 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: position === "top" ? -5 : 5, scaleY: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed left-0 right-0 z-[9999] ${
            position === "top" ? "top-0" : "bottom-0"
          } ${className}`}
          style={{
            position: "fixed",
            top: position === "top" ? "0px" : "auto",
            bottom: position === "bottom" ? "0px" : "auto",
            left: "0px",
            right: "0px",
            zIndex: 9999,
          }}
        >
          {/* 프로그레스 바 배경 */}
          <div
            className="w-full bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm"
            style={{
              height: `${height}px`,
              background:
                "linear-gradient(90deg, rgba(229, 231, 235, 0.8) 0%, rgba(209, 213, 219, 0.6) 100%)",
            }}
          >
            {/* 프로그레스 바 */}
            <motion.div
              className={`h-full bg-gradient-to-r ${getGradientColor()} shadow-lg`}
              style={{
                width: `${progress}%`,
                height: `${height}px`,
                background: `linear-gradient(90deg, ${
                  progressDecimal < 0.2
                    ? "#3b82f6, #60a5fa, #3b82f6"
                    : progressDecimal < 0.5
                    ? "#3b82f6, #8b5cf6, #ec4899"
                    : progressDecimal < 0.8
                    ? "#8b5cf6, #ec4899, #f43f5e"
                    : progressDecimal < 0.95
                    ? "#f43f5e, #ef4444, #10b981"
                    : "#10b981, #059669, #047857" // 100% 도달 시
                })`,
                minWidth: progress > 0 ? "3px" : "0px",
                boxShadow:
                  progressDecimal >= 0.95
                    ? "0 0 15px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.2)"
                    : "0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.1)",
                borderRadius: "0 2px 2px 0",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* 퍼센트 표시 (선택사항) */}
          {showPercentage && (
            <motion.div
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              <span
                className={`text-xs font-bold text-white px-3 py-1 rounded-full shadow-lg backdrop-blur-sm ${
                  progressDecimal >= 0.95
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                }`}
              >
                {progressDecimal >= 0.95 ? "✓ 완료" : `${progress}%`}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 기본 내보내기
export default ReadingProgressBar;
