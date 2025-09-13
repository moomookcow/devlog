import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Tag,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  Folder,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SEOHead from "@/components/seo/SEOHead";
import { usePosts } from "@/hooks/usePosts";
import type { Post } from "@/utils/mdx";

const TagPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const navigate = useNavigate();
  const { posts, loading, getPostsByTag } = usePosts();
  const [tagPosts, setTagPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    if (tag) {
      const decodedTag = decodeURIComponent(tag);
      const posts = getPostsByTag(decodedTag);
      setTagPosts(posts);
    }
  }, [tag, getPostsByTag]);

  useEffect(() => {
    // 모든 태그 수집 (중복 제거, 빈 문자열 필터링, 개수 계산)
    const tagCountMap = new Map<string, number>();
    posts.forEach((post) => {
      if (post.metadata.tags) {
        post.metadata.tags.forEach((tag: string) => {
          if (tag && tag.trim() !== "") {
            const trimmedTag = tag.trim();
            tagCountMap.set(trimmedTag, (tagCountMap.get(trimmedTag) || 0) + 1);
          }
        });
      }
    });

    const tagsWithCount = Array.from(tagCountMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); // 개수 순으로 정렬

    setAllTags(tagsWithCount);
  }, [posts]);

  const handleTagClick = (clickedTag: string) => {
    navigate(`/tag/${encodeURIComponent(clickedTag)}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="lg" text="태그 페이지 로딩 중..." />
      </div>
    );
  }

  if (!tag) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              태그를 찾을 수 없습니다
            </h1>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              블로그로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const decodedTag = decodeURIComponent(tag);
  const tagCount = tagPosts.length;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${decodedTag} 태그 - Tech Blog`}
        description={`${decodedTag} 태그와 관련된 ${tagCount}개의 포스트를 확인해보세요.`}
        keywords={[decodedTag, "태그", "블로그", "기술"]}
        url={`/tag/${tag}`}
        type="website"
      />

      {/* Tag Header */}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl brand-gradient-bg text-white shadow-xl">
                <Tag className="h-8 w-8" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-gradient mb-6"
            >
              #{decodedTag}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              {decodedTag} 태그와 관련된 {tagCount}개의 포스트를 확인해보세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <Badge className="text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                📝 총 {tagCount}개 포스트
              </Badge>
              <Badge className="text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                🏷️ {allTags.length}개 태그
              </Badge>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tag Cloud */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="py-16 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gradient mb-4">모든 태그</h2>
            <p className="text-muted-foreground">
              관심 있는 태그를 클릭해보세요
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {allTags.map((tag) => (
              <Badge
                key={tag.name}
                className={`text-sm cursor-pointer transition-all hover:scale-105 ${
                  tag.name === decodedTag
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700"
                    : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                }`}
                onClick={() => handleTagClick(tag.name)}
              >
                {tag.name} ({tag.count})
              </Badge>
            ))}
          </motion.div>
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
          {tagPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-center py-16"
            >
              <div className="mb-8">
                <Tag className="h-24 w-24 text-blue-500/50 mx-auto mb-6 animate-float" />
                <h3 className="text-2xl font-bold text-gradient mb-4">
                  해당 태그의 포스트가 없습니다
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  다른 태그를 선택하거나 블로그 목록을 확인해보세요.
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  className="btn-unique"
                  onClick={() => navigate("/blog")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  블로그 목록
                </Button>
                <Button
                  className="btn-outline-unique"
                  onClick={() => navigate("/")}
                >
                  홈으로
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {tagPosts.map((post, index) => (
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

export default TagPage;
