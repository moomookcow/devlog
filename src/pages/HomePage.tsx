import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  BookOpen,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
} from "lucide-react";

// 임시 데이터 (나중에 Firebase에서 가져올 예정)
const featuredPost = {
  id: "1",
  title: "React Hooks 완전 정리: useState부터 커스텀 훅까지",
  excerpt:
    "React Hooks의 모든 것을 실무 예제와 함께 알아보는 완벽한 가이드입니다. 기본 훅부터 고급 패턴까지 차근차근 설명합니다.",
  category: "JavaScript",
  tags: ["React", "Hooks", "JavaScript"],
  publishedAt: "2024-01-15",
  readingTime: 5,
  viewCount: 1234,
  featured: true,
  slug: "react-hooks-complete-guide",
};

const recentPosts = [
  {
    id: "2",
    title: "TypeScript 제네릭 활용법",
    excerpt: "재사용 가능한 타입을 만드는 TypeScript 제네릭의 모든 것",
    category: "TypeScript",
    tags: ["TypeScript", "Generic"],
    publishedAt: "2024-01-14",
    readingTime: 3,
    viewCount: 856,
    slug: "typescript-generics-guide",
  },
  {
    id: "3",
    title: "Next.js 14 새 기능들",
    excerpt: "Next.js 14의 새로운 기능들과 개선사항을 살펴보세요",
    category: "React",
    tags: ["Next.js", "React", "SSR"],
    publishedAt: "2024-01-13",
    readingTime: 4,
    viewCount: 692,
    slug: "nextjs-14-new-features",
  },
  {
    id: "4",
    title: "웹 성능 최적화 가이드",
    excerpt: "웹사이트의 성능을 향상시키는 실무 노하우",
    category: "Performance",
    tags: ["Performance", "Web", "Optimization"],
    publishedAt: "2024-01-12",
    readingTime: 6,
    viewCount: 445,
    slug: "web-performance-optimization",
  },
];

const categories = [
  { name: "JavaScript", count: 12, color: "bg-yellow-500" },
  { name: "TypeScript", count: 8, color: "bg-blue-500" },
  { name: "React", count: 15, color: "bg-cyan-500" },
  { name: "Performance", count: 5, color: "bg-green-500" },
  { name: "CSS", count: 7, color: "bg-pink-500" },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-foreground mb-6"
            >
              Tech Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              JavaScript, TypeScript, React를 중심으로 한 기술 블로그입니다.
              실무 경험과 학습 내용을 공유합니다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="text-lg px-8">
                <Search className="mr-2 h-5 w-5" />
                포스트 검색
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <BookOpen className="mr-2 h-5 w-5" />
                카테고리 보기
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Post */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Featured Post
            </h2>
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group"
            >
              <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="default" className="text-sm">
                      Featured
                    </Badge>
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    {featuredPost.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-3xl group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredPost.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readingTime}분 읽기</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>
                          {featuredPost.viewCount.toLocaleString()} 조회
                        </span>
                      </div>
                    </div>
                    <Button className="group-hover:bg-primary/90 transition-colors">
                      읽어보기
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Recent Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Recent Posts
              </h2>
              <Button variant="outline">
                모든 포스트 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>{post.publishedAt}</span>
                          <span>•</span>
                          <span>{post.readingTime}분</span>
                        </div>
                        <span>{post.viewCount} 조회</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer"
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform`}
                    />
                    <h3 className="font-semibold text-foreground mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} posts
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
