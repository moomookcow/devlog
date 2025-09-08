import React from "react";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "로딩 중...",
  className = "",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-6 w-6";
      case "lg":
        return "h-16 w-16";
      default:
        return "h-12 w-12";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className={`${getSizeClasses()} border-2 border-primary border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-muted-foreground mt-4 ${getTextSize()}`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
