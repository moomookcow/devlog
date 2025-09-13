import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPosts } from "@/utils/posts";
import type { Post } from "@/utils/mdx";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SEOHead from "@/components/seo/SEOHead";
import {
  BookOpen,
  Filter,
  X,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  Folder,
} from "lucide-react";
import { motion } from "framer-motion";

const BlogListPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // 카테고리 필터링
  useEffect(() => {
    if (selectedCategory) {
      const filtered = posts.filter(
        (post) =>
          post.categoryPath.split("/")[0].toLowerCase() ===
          selectedCategory.toLowerCase()
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedCategory, posts]);

  // 사용 가능한 카테고리 목록
  const categories = Array.from(
    new Set(posts.map((post) => post.categoryPath.split("/")[0]))
  ).sort();

  // 카테고리 필터 클리어
  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" text="포스트를 불러오는 중..." />
      </div>
    );
  }

  // 포스트가 없는 경우
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6">
            <BookOpen className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              아직 포스트가 없습니다
            </h1>
            <p className="text-muted-foreground mb-6">
              첫 번째 포스트를 작성해보세요!
            </p>
          </div>
          <div className="space-y-4">
            <Button size="lg" className="w-full" onClick={() => navigate("/")}>
              홈으로 돌아가기
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => navigate("/about")}
            >
              소개 페이지 보기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="블로그 - Tech Blog"
        description="JavaScript, TypeScript, React를 중심으로 한 기술 포스트들을 확인해보세요. 실무 경험과 학습 내용을 체계적으로 정리한 개발 블로그입니다."
        keywords={[
          "블로그",
          "개발",
          "프로그래밍",
          "JavaScript",
          "TypeScript",
          "React",
          "웹개발",
        ]}
        url="/blog"
        type="website"
      />
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="py-20 px-4 bg-pattern dark:bg-pattern-dark relative overflow-hidden"
      >
        {/* 배경 장식 요소 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-gradient mb-6"
            >
              블로그
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              JavaScript, TypeScript, React를 중심으로 한 기술 포스트들을
              확인해보세요.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <Badge className="text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                📝 총 {posts.length}개 포스트
              </Badge>
              <Badge className="text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                📁 {categories.length}개 카테고리
              </Badge>
              {selectedCategory && (
                <Badge
                  className="text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                  onClick={clearCategoryFilter}
                >
                  {selectedCategory} ({filteredPosts.length}개)
                  <X className="h-3 w-3" />
                </Badge>
              )}
            </motion.div>

            {/* 카테고리 필터 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                className={
                  selectedCategory === null
                    ? "btn-unique"
                    : "btn-outline-unique"
                }
                onClick={clearCategoryFilter}
              >
                <Filter className="h-4 w-4 mr-2" />
                전체
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  className={
                    selectedCategory === category
                      ? "btn-unique"
                      : "btn-outline-unique"
                  }
                  onClick={() =>
                    navigate(`/category/${encodeURIComponent(category)}`)
                  }
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Posts Grid */}
      <section className="py-20 px-4 bg-pattern dark:bg-pattern-dark relative overflow-hidden">
        {/* 배경 장식 요소 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-60 h-60 bg-gradient-to-br from-blue-400/10 to-emerald-400/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-center py-16"
            >
              <div className="mb-8">
                <BookOpen className="h-24 w-24 text-blue-500/50 mx-auto mb-6 animate-float" />
                <h3 className="text-2xl font-bold text-gradient mb-4">
                  {selectedCategory
                    ? `${selectedCategory} 카테고리에 포스트가 없습니다`
                    : "포스트가 없습니다"}
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  {selectedCategory
                    ? "다른 카테고리를 선택해보세요."
                    : "첫 번째 포스트를 작성해보세요!"}
                </p>
              </div>
              {selectedCategory && (
                <Button className="btn-unique" onClick={clearCategoryFilter}>
                  전체 포스트 보기
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + index * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <Card className="h-full card-unique hover-lift-unique flex flex-col cursor-pointer">
                    <CardHeader className="flex-shrink-0">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                        >
                          <Folder className="h-3 w-3" />
                          {post.metadata.category}
                        </Badge>
                        {post.metadata.tags
                          .filter((tag) => tag && tag.trim() !== "")
                          .map((tag) => tag.trim())
                          .slice(0, 2)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 cursor-pointer hover:scale-105 transition-transform"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/tag/${encodeURIComponent(tag)}`);
                              }}
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                      <CardTitle className="text-xl group-hover:text-gradient transition-all duration-500 line-clamp-2 min-h-[3.5rem] font-semibold">
                        {post.metadata.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                      <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow min-h-[4.5rem] leading-relaxed">
                        {post.metadata.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm mb-6 flex-shrink-0">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-blue-700 dark:text-blue-300 font-medium">
                              {post.metadata.publishedAt}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                            <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                              {post.metadata.readingTime}분
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {post.metadata.viewCount}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full btn-unique flex-shrink-0 group-hover:scale-105 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/blog/${post.slug}`);
                        }}
                      >
                        읽어보기
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogListPage;
