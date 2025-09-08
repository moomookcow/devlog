import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  showAllButton?: boolean;
  allButtonText?: string;
  className?: string;
  variant?: "default" | "compact";
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  showAllButton = true,
  allButtonText = "전체",
  className = "",
  variant = "default",
}) => {
  const clearCategoryFilter = () => {
    onCategorySelect(null);
  };

  const getButtonSize = (): "sm" | "lg" | "icon" | "default" => {
    return variant === "compact" ? "sm" : "sm";
  };

  const getContainerClasses = () => {
    const baseClasses = "flex flex-wrap gap-2";
    return variant === "compact"
      ? `${baseClasses} justify-center`
      : `${baseClasses} ${className}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={getContainerClasses()}
    >
      {showAllButton && (
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size={getButtonSize()}
          onClick={clearCategoryFilter}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {allButtonText}
        </Button>
      )}

      {categories.map((category) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: categories.indexOf(category) * 0.05,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedCategory === category ? "default" : "outline"}
            size={getButtonSize()}
            onClick={() => onCategorySelect(category)}
            className="transition-all duration-200"
          >
            {category}
          </Button>
        </motion.div>
      ))}

      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size={getButtonSize()}
            onClick={clearCategoryFilter}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4 mr-1" />
            필터 해제
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CategoryFilter;
