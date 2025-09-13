import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CategoryModal from "@/components/common/CategoryModal";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SEOHead from "@/components/seo/SEOHead";
import { usePosts } from "@/hooks/usePosts";
import {
  Search,
  BookOpen,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  Folder,
} from "lucide-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = React.useState(false);

  // usePosts 훅 사용
  const {
    posts: allPosts,
    loading,
    error,
    getFeaturedPost,
    getRecentPosts,
    categories,
  } = usePosts();

  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(5);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" text="포스트를 불러오는 중..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">오류가 발생했습니다</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>다시 시도</Button>
        </div>
      </div>
    );
  }

  // 포스트가 없는 경우
  if (!featuredPost && recentPosts.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6">
            <BookOpen className="h-24 w-24 text-muted-foreground/50 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              아직 포스트가 없습니다
            </h1>
          </div>
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate("/blog")}
            >
              블로그 목록 보기
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
        title="Tech Blog - 개발 지식과 경험을 공유하는 블로그"
        description="JavaScript, TypeScript, React를 중심으로 한 실무 경험과 학습 내용을 체계적으로 정리하여 개발자 커뮤니티와 지식을 나누는 기술 블로그입니다."
        keywords={[
          "개발",
          "프로그래밍",
          "JavaScript",
          "TypeScript",
          "React",
          "웹개발",
          "기술블로그",
        ]}
        url="/"
        type="website"
      />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative py-24 px-4 bg-pattern dark:bg-pattern-dark overflow-hidden"
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-6xl md:text-7xl font-bold text-gradient mb-6 animate-slide-up"
            >
              Tech Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up"
            >
              JavaScript, TypeScript, React를 중심으로 한 기술 블로그입니다.
              <br />
              실무 경험과 학습 내용을 공유합니다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up"
            >
              <Button
                size="lg"
                className="text-lg px-10 py-6 btn-unique hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/search")}
              >
                <Search className="mr-3 h-5 w-5" />
                포스트 검색
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 btn-outline-unique hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setIsCategoryModalOpen(true)}
              >
                <BookOpen className="mr-3 h-5 w-5" />
                카테고리 보기
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Post */}
      {featuredPost && (
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-gradient mb-4"
                >
                  Featured Post
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg text-muted-foreground"
                >
                  가장 인기 있는 포스트를 확인해보세요
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
                onClick={() => navigate(`/blog/${featuredPost.slug}`)}
              >
                <Card className="overflow-hidden card-unique hover-lift-unique border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 dark:from-blue-950/50 dark:to-emerald-950/50 cursor-pointer group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-all duration-300">
                  <CardHeader className="pb-4">
                    {featuredPost && (
                      <>
                        <div className="flex items-center gap-2 mb-6">
                          <Badge className="text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                            ⭐ Featured
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                          >
                            <Folder className="h-3 w-3" />
                            {featuredPost.metadata.category}
                          </Badge>
                          {featuredPost.metadata.tags
                            .filter((tag) => tag && tag.trim() !== "")
                            .map((tag) => tag.trim())
                            .slice(0, 3)
                            .map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700"
                              >
                                {tag}
                              </Badge>
                            ))}
                        </div>
                        <CardTitle className="text-4xl md:text-5xl group-hover:text-gradient transition-all duration-500 font-bold leading-tight mb-4 flex items-center gap-3">
                          {featuredPost.metadata.title}
                          <ArrowRight className="h-8 w-8 text-blue-500 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 opacity-70 group-hover:opacity-100" />
                        </CardTitle>
                      </>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0">
                    {featuredPost && (
                      <>
                        <p className="text-muted-foreground text-xl mb-8 leading-relaxed">
                          {featuredPost.metadata.excerpt}
                        </p>
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                          <div className="flex flex-wrap items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <span className="text-blue-700 dark:text-blue-300 font-medium">
                                {featuredPost.metadata.publishedAt}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                              <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                              <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                                {featuredPost.metadata.readingTime}분 읽기
                              </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300 font-medium">
                                {featuredPost.metadata.viewCount.toLocaleString()}{" "}
                                조회
                              </span>
                            </div>
                          </div>
                          <Button
                            size="lg"
                            className="btn-unique text-lg px-8 py-4 group-hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/blog/${featuredPost.slug}`);
                            }}
                          >
                            읽어보기
                            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-gradient mb-4"
                >
                  Recent Posts
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg text-muted-foreground"
                >
                  최신 포스트들을 확인해보세요
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="mb-8"
              >
                <div className="flex items-center justify-center">
                  <Button
                    className="btn-outline-unique"
                    onClick={() => navigate("/blog")}
                  >
                    모든 포스트 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.9 + index * 0.1,
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
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        posts={allPosts}
        onCategorySelect={(category) =>
          navigate(`/category/${encodeURIComponent(category)}`)
        }
      />
    </div>
  );
};

export default HomePage;
