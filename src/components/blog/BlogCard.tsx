import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "@/utils/mdx";
import { ArrowRight, Calendar, Clock, Eye, Folder } from "lucide-react";

interface BlogCardProps {
  post: Post;
  index?: number;
  showTags?: boolean;
  maxTags?: number;
  variant?: "default" | "featured" | "compact";
  className?: string;
  onTagClick?: (tag: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  index = 0,
  showTags = true,
  maxTags = 2,
  variant = "default",
  className = "",
  onTagClick,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blog/${post.slug}`);
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  // 태그 중복 제거 및 정리
  const getCleanTags = () => {
    if (!post.metadata.tags) return [];

    const uniqueTags = Array.from(new Set(post.metadata.tags))
      .filter((tag) => tag && tag.trim() !== "")
      .map((tag) => tag.trim())
      .slice(0, maxTags);

    return uniqueTags;
  };

  const getCardClasses = () => {
    const baseClasses =
      "h-full hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer";

    switch (variant) {
      case "featured":
        return `${baseClasses} border-2 border-primary/20`;
      case "compact":
        return `${baseClasses} hover:scale-[1.02]`;
      default:
        return baseClasses;
    }
  };

  const getTitleClasses = () => {
    switch (variant) {
      case "featured":
        return "text-3xl group-hover:text-primary transition-colors";
      case "compact":
        return "text-lg group-hover:text-primary transition-colors line-clamp-2";
      default:
        return "text-xl group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]";
    }
  };

  const getExcerptClasses = () => {
    switch (variant) {
      case "featured":
        return "text-muted-foreground mb-4 line-clamp-4 flex-grow min-h-[6rem]";
      case "compact":
        return "text-muted-foreground mb-4 line-clamp-2 flex-grow min-h-[3rem]";
      default:
        return "text-muted-foreground mb-4 line-clamp-3 flex-grow min-h-[4.5rem]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: variant === "compact" ? 1.02 : 1.02 }}
      className={`group ${className}`}
    >
      <Card className={getCardClasses()} onClick={handleCardClick}>
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Folder className="h-3 w-3" />
              {post.metadata.category}
            </Badge>
            {showTags &&
              getCleanTags().map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors relative z-20"
                  onClick={(e) => handleTagClick(e, tag)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onTagClick) {
                      onTagClick(tag);
                    }
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onTagClick) {
                      onTagClick(tag);
                    }
                  }}
                >
                  {tag}
                </Badge>
              ))}
          </div>
          <CardTitle className={getTitleClasses()}>
            {post.metadata.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <p className={getExcerptClasses()}>{post.metadata.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.metadata.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.metadata.readingTime}분</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.metadata.viewCount}</span>
            </div>
          </div>
          <Button
            className="w-full group-hover:bg-primary/90 transition-colors flex-shrink-0"
            onClick={handleCardClick}
          >
            읽어보기
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
