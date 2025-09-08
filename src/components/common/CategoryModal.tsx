import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, FolderOpen } from "lucide-react";
import type { Post } from "@/utils/mdx";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  posts: Post[];
  onCategorySelect: (category: string) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  categories,
  posts,
  onCategorySelect,
}) => {
  const getCategoryPostCount = (category: string) => {
    return posts.filter(
      (post) => post.metadata.category.toLowerCase() === category.toLowerCase()
    ).length;
  };

  const getCategoryDescription = (category: string) => {
    const categoryPosts = posts.filter(
      (post) => post.metadata.category.toLowerCase() === category.toLowerCase()
    );

    if (categoryPosts.length === 0) return "";

    // 카테고리별 태그 수집
    const allTags = categoryPosts.flatMap((post) => post.metadata.tags);
    const uniqueTags = Array.from(new Set(allTags)).slice(0, 3);

    return uniqueTags.length > 0 ? `주요 태그: ${uniqueTags.join(", ")}` : "";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-2">
                <FolderOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">카테고리 선택</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-muted-foreground mb-6">
                관심 있는 카테고리를 선택하여 관련 포스트를 확인해보세요.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-start gap-2 hover:bg-primary/5 hover:border-primary transition-all"
                      onClick={() => {
                        onCategorySelect(category);
                        onClose();
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-left">
                          {category}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryPostCount(category)}개
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground text-left">
                        {getCategoryDescription(category)}
                      </p>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-muted/30">
              <p className="text-sm text-muted-foreground">
                총 {categories.length}개 카테고리, {posts.length}개 포스트
              </p>
              <Button variant="outline" onClick={onClose}>
                닫기
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;
