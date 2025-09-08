import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react";

const BlogListPage = () => {
  const navigate = useNavigate();

  // 임시 데이터
  const posts = [
    {
      id: "1",
      title: "React Hooks 완전 정리: useState부터 커스텀 훅까지",
      excerpt:
        "React Hooks의 모든 것을 실무 예제와 함께 알아보는 완벽한 가이드입니다.",
      category: "JavaScript",
      tags: ["React", "Hooks", "JavaScript"],
      publishedAt: "2024-01-15",
      readingTime: 5,
      viewCount: 1234,
      slug: "react-hooks-complete-guide",
    },
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
    {
      id: "5",
      title: "CSS Grid 완전 정복",
      excerpt: "CSS Grid를 활용한 레이아웃 디자인 기법",
      category: "CSS",
      tags: ["CSS", "Grid", "Layout"],
      publishedAt: "2024-01-11",
      readingTime: 4,
      viewCount: 378,
      slug: "css-grid-complete-guide",
    },
    {
      id: "6",
      title: "JavaScript 비동기 처리 마스터",
      excerpt: "Promise, async/await, 그리고 비동기 프로그래밍의 모든 것",
      category: "JavaScript",
      tags: ["JavaScript", "Async", "Promise"],
      publishedAt: "2024-01-10",
      readingTime: 7,
      viewCount: 892,
      slug: "javascript-async-master",
    },
  ];

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
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="text-sm">
                총 {posts.length}개 포스트
              </Badge>
              <Badge variant="outline" className="text-sm">
                {new Set(posts.map((post) => post.category)).size}개 카테고리
              </Badge>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col">
                  <CardHeader className="flex-shrink-0">
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
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow min-h-[4.5rem]">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4 flex-shrink-0">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.publishedAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readingTime}분</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.viewCount}</span>
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
        </div>
      </section>
    </div>
  );
};

export default BlogListPage;
