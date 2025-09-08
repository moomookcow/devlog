import React from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import type { Post } from "@/utils/mdx";

interface PostListProps {
  posts: Post[];
  variant?: "default" | "featured" | "compact";
  showTags?: boolean;
  maxTags?: number;
  className?: string;
  onTagClick?: (tag: string) => void;
  emptyMessage?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  variant = "default",
  showTags = true,
  maxTags = 2,
  className = "",
  onTagClick,
  emptyMessage = "포스트가 없습니다",
  emptyDescription = "아직 작성된 포스트가 없습니다.",
  emptyIcon,
}) => {
  const getGridClasses = () => {
    switch (variant) {
      case "featured":
        return "grid grid-cols-1 lg:grid-cols-2 gap-8";
      case "compact":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center py-12"
      >
        {emptyIcon && (
          <div className="mb-4 flex justify-center">{emptyIcon}</div>
        )}
        <h3 className="text-xl font-semibold mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground">{emptyDescription}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${getGridClasses()} ${className}`}
    >
      {posts.map((post, index) => (
        <BlogCard
          key={post.slug}
          post={post}
          index={index}
          variant={variant}
          showTags={showTags}
          maxTags={maxTags}
          onTagClick={onTagClick}
        />
      ))}
    </motion.div>
  );
};

export default PostList;
