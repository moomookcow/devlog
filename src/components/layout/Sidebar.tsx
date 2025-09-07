import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Filter,
  Calendar,
  Eye,
  Tag,
  TrendingUp,
  Clock,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // 임시 데이터 (나중에 Firebase에서 가져올 예정)
  const categories = [
    { name: "JavaScript", count: 12, color: "bg-yellow-500" },
    { name: "TypeScript", count: 8, color: "bg-blue-500" },
    { name: "React", count: 15, color: "bg-cyan-500" },
    { name: "Performance", count: 5, color: "bg-green-500" },
    { name: "CSS", count: 7, color: "bg-pink-500" },
  ];

  const popularTags = [
    "React Hooks",
    "TypeScript",
    "JavaScript",
    "Performance",
    "CSS",
    "Next.js",
    "Webpack",
    "Vite",
    "Tailwind",
    "Firebase",
  ];

  const recentPosts = [
    {
      title: "React Hooks 완전 정리",
      date: "2024-01-15",
      views: 1234,
      category: "JavaScript",
    },
    {
      title: "TypeScript 제네릭 활용법",
      date: "2024-01-14",
      views: 856,
      category: "TypeScript",
    },
    {
      title: "Next.js 14 새 기능들",
      date: "2024-01-13",
      views: 692,
      category: "React",
    },
    {
      title: "웹 성능 최적화 가이드",
      date: "2024-01-12",
      views: 445,
      category: "Performance",
    },
  ];

  const sortOptions = [
    { label: "최신순", value: "latest" },
    { label: "인기순", value: "popular" },
    { label: "조회수순", value: "views" },
    { label: "제목순", value: "title" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-full w-80 bg-background border-r z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  필터 & 검색
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="md:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  검색
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="포스트 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  정렬
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-2 text-sm text-left rounded-md border border-input bg-background hover:bg-muted transition-colors"
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    카테고리
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.name}
                      whileHover={{ x: 5 }}
                      className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${category.color}`}
                        />
                        <span className="text-sm text-foreground">
                          {category.name}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </motion.button>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    인기 태그
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <motion.button
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    최근 포스트
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentPosts.map((post, index) => (
                    <motion.div
                      key={post.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="p-3 rounded-md hover:bg-muted transition-colors">
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {post.category}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
