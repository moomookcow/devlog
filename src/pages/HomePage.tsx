import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/utils/posts";
import type { Post } from "@/utils/mdx";
import {
  Search,
  BookOpen,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
} from "lucide-react";

// 동적 포스트 로딩을 위한 상태
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredPost, setFeaturedPost] = React.useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();

        // 첫 번째 포스트를 추천 포스트로 설정
        if (allPosts.length > 0) {
          setFeaturedPost(allPosts[0]);
        }

        // 최근 포스트 5개 설정
        setRecentPosts(allPosts.slice(0, 5));
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">포스트를 불러오는 중...</p>
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
                onClick={() => navigate("/blog")}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Card
                      className="h-full hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    >
                      <CardHeader className="flex-shrink-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">
                            {post.metadata.category}
                          </Badge>
                          {post.metadata.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                          {post.metadata.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow">
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow min-h-[4.5rem]">
                          {post.metadata.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground flex-shrink-0">
                          <div className="flex items-center gap-4">
                            <span>{post.metadata.publishedAt}</span>
                            <span>•</span>
                            <span>{post.metadata.readingTime}분</span>
                          </div>
                          <span>{post.metadata.viewCount} 조회</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
