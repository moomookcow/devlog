import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
  placeholder?: string;
  showFilters?: boolean;
  filters?: {
    category?: string;
    tags?: string[];
  };
  onFiltersChange?: (filters: { category?: string; tags?: string[] }) => void;
  availableCategories?: string[];
  availableTags?: string[];
}

export function SearchBar({
  query,
  onQueryChange,
  onSearch,
  isLoading = false,
  placeholder = "포스트 검색...",
  showFilters = false,
  filters = {},
  onFiltersChange,
  availableCategories = [],
  availableTags = [],
}: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);

  // 쿼리 변경 시 부모 컴포넌트에 전달
  useEffect(() => {
    onQueryChange(localQuery);
  }, [localQuery, onQueryChange]);

  // 엔터키로 검색
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  // 검색어 지우기
  const clearQuery = () => {
    setLocalQuery("");
    onQueryChange("");
  };

  // 필터 지우기
  const clearFilters = () => {
    if (onFiltersChange) {
      onFiltersChange({});
    }
  };

  // 카테고리 필터 변경
  const handleCategoryChange = (category: string) => {
    if (onFiltersChange) {
      onFiltersChange({
        ...filters,
        category: category === "all" ? undefined : category,
      });
    }
  };

  // 태그 필터 토글
  const toggleTag = (tag: string) => {
    if (onFiltersChange) {
      const currentTags = filters.tags || [];
      const newTags = currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag];

      onFiltersChange({
        ...filters,
        tags: newTags.length > 0 ? newTags : undefined,
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 메인 검색바 */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder={placeholder}
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsExpanded(true)}
            className="pl-10 pr-20 h-12 text-base"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {localQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearQuery}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              onClick={onSearch}
              disabled={isLoading || !localQuery.trim()}
              size="sm"
              className="h-8"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                "검색"
              )}
            </Button>
          </div>
        </div>

        {/* 확장된 검색 옵션 */}
        <AnimatePresence>
          {isExpanded && showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 border rounded-lg bg-background"
            >
              <div className="space-y-4">
                {/* 카테고리 필터 */}
                {availableCategories.length > 0 && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      카테고리
                    </label>
                    <Select
                      value={filters.category || "all"}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 카테고리</SelectItem>
                        {availableCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* 태그 필터 */}
                {availableTags.length > 0 && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      태그
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={
                            filters.tags?.includes(tag) ? "default" : "outline"
                          }
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* 필터 지우기 */}
                {(filters.category || filters.tags?.length) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    <X className="h-4 w-4 mr-2" />
                    필터 지우기
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 활성 필터 표시 */}
      {(filters.category || filters.tags?.length) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              카테고리: {filters.category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleCategoryChange("all")}
              />
            </Badge>
          )}
          {filters.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
