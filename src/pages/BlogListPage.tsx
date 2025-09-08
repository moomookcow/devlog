import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/utils/posts";
import type { Post } from "@/utils/mdx";
import {
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  BookOpen,
  Filter,
  X,
} from "lucide-react";

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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">포스트를 불러오는 중...</p>
        </div>
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
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              블로그
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              JavaScript, TypeScript, React를 중심으로 한 기술 포스트들을
              확인해보세요.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="outline" className="text-sm">
                총 {posts.length}개 포스트
              </Badge>
              <Badge variant="outline" className="text-sm">
                {categories.length}개 카테고리
              </Badge>
              {selectedCategory && (
                <Badge
                  variant="default"
                  className="text-sm flex items-center gap-1"
                >
                  {selectedCategory} ({filteredPosts.length}개)
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={clearCategoryFilter}
                  />
                </Badge>
              )}
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
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
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center py-12"
            >
              <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {selectedCategory
                  ? `${selectedCategory} 카테고리에 포스트가 없습니다`
                  : "포스트가 없습니다"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {selectedCategory
                  ? "다른 카테고리를 선택해보세요."
                  : "첫 번째 포스트를 작성해보세요!"}
              </p>
              {selectedCategory && (
                <Button onClick={clearCategoryFilter}>전체 포스트 보기</Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col">
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
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        읽어보기
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
