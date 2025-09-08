import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/utils/posts";
import type { Post } from "@/utils/mdx";
import { ArrowRight, Calendar, Clock, Eye, FolderOpen } from "lucide-react";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      if (!category) return;

      try {
        setLoading(true);
        const allPosts = await getAllPosts();
        const filtered = allPosts.filter(
          (post) =>
            post.metadata.category.toLowerCase() === category.toLowerCase()
        );
        setPosts(filtered);
      } catch (error) {
        console.error("Error loading posts for category:", category, error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [category]);

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

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            카테고리를 찾을 수 없습니다
          </h1>
          <Button onClick={() => navigate("/blog")}>모든 포스트 보기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <FolderOpen className="h-8 w-8 text-primary" />
              {category}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              "{category}" 카테고리의 모든 포스트를 확인해보세요.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="text-sm">
                총 {posts.length}개 포스트
              </Badge>
              <Badge variant="outline" className="text-sm">
                {new Set(posts.map((post) => post.metadata.category)).size}개
                카테고리
              </Badge>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center py-12"
            >
              <FolderOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                "{category}" 카테고리에 해당하는 포스트가 없습니다
              </h3>
              <p className="text-muted-foreground mb-6">
                다른 카테고리를 선택하거나 모든 포스트를 확인해보세요.
              </p>
              <Button onClick={() => navigate("/blog")}>
                모든 포스트 보기
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
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

export default CategoryPage;
