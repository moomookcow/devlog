import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CategoryModal from "@/components/common/CategoryModal";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PostList from "@/components/blog/PostList";
import SEOHead from "@/components/seo/SEOHead";
import { usePosts } from "@/hooks/usePosts";
import {
  Search,
  BookOpen,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
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
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={() => navigate("/search")}
              >
                <Search className="mr-2 h-5 w-5" />
                포스트 검색
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8"
                onClick={() => setIsCategoryModalOpen(true)}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                카테고리 보기
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Post */}
      {featuredPost && (
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
                    {featuredPost && (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="default" className="text-sm">
                            Featured
                          </Badge>
                          <Badge variant="secondary">
                            {featuredPost.metadata.category}
                          </Badge>
                          {featuredPost.metadata.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-3xl group-hover:text-primary transition-colors">
                          {featuredPost.metadata.title}
                        </CardTitle>
                      </>
                    )}
                  </CardHeader>
                  <CardContent>
                    {featuredPost && (
                      <>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                          {featuredPost.metadata.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{featuredPost.metadata.publishedAt}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {featuredPost.metadata.readingTime}분 읽기
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>
                                {featuredPost.metadata.viewCount.toLocaleString()}{" "}
                                조회
                              </span>
                            </div>
                          </div>
                          <Button
                            className="group-hover:bg-primary/90 transition-colors"
                            onClick={() =>
                              navigate(`/blog/${featuredPost.slug}`)
                            }
                          >
                            읽어보기
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
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
                <Button variant="outline" onClick={() => navigate("/blog")}>
                  모든 포스트 보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <PostList
                posts={recentPosts}
                variant="default"
                showTags={true}
                maxTags={2}
                onTagClick={(tag) =>
                  navigate(`/tag/${encodeURIComponent(tag)}`)
                }
              />
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
