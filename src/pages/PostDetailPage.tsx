import React from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import TableOfContents from "@/components/TableOfContents";
import SEOHead from "@/components/seo/SEOHead";
import { getPostBySlug, getRelatedPosts } from "@/utils/posts";
// Firebase 관련 import (기능 미구현으로 비활성화)
// import {
//   getPostStats,
//   incrementViewCount,
//   getFirebaseConnectionStatus,
// } from "@/utils/firebase-posts";
import type { Post, PostStats } from "@/utils/mdx";
import {
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  Tag,
  User,
  BookOpen,
} from "lucide-react";

const PostDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // 하이브리드 시스템: 파일 기반 콘텐츠 + Firebase 상호작용
  const [post, setPost] = React.useState<Post | null>(null);
  const [postStats, setPostStats] = React.useState<PostStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [relatedPosts, setRelatedPosts] = React.useState<Post[]>([]);
  // Firebase 기능 미구현으로 상태 변수 제거
  // const [firebaseConnected, setFirebaseConnected] = React.useState(false);

  React.useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setPost(null);
        setLoading(false);
        return;
      }

      try {
        // 1. 파일 기반 포스트 로드
        const postData = await getPostBySlug(slug);

        if (!postData) {
          setPost(null);
          setLoading(false);
          return;
        }

        setPost(postData);

        // 2. Firebase 통계 로드 (기능 미구현으로 비활성화)
        // if (postData.metadata.firebaseId) {
        //   const stats = await getPostStats(postData.metadata.firebaseId);
        //   setPostStats(stats);
        //   incrementViewCount(postData.metadata.firebaseId);
        // }

        // 기본 통계 설정 (MDX 메타데이터 사용)
        setPostStats({
          firebaseId: postData.metadata.firebaseId || postData.slug,
          viewCount: postData.metadata.viewCount || 0,
          likes: postData.metadata.likes || 0,
          comments: [],
        });

        // 3. 관련 포스트 로드
        const related = await getRelatedPosts(postData, 3);
        setRelatedPosts(related);

        // 4. Firebase 연결 상태 (기능 미구현으로 비활성화)
        // setFirebaseConnected(false);
      } catch (error) {
        console.error("Error loading post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">포스트를 로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="text-6xl mb-4 animate-float">📝</div>
              <h1 className="text-4xl font-bold text-gradient mb-4">
                포스트를 찾을 수 없습니다
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                요청하신 포스트 "
                <code className="bg-muted px-2 py-1 rounded">{slug}</code>"가
                존재하지 않습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    사용 가능한 포스트
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() =>
                        navigate("/blog/react-typescript-best-practices")
                      }
                    >
                      React + TypeScript 베스트 프랙티스
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() =>
                        navigate("/blog/react-hooks-complete-guide")
                      }
                    >
                      React Hooks 완전 정리
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() =>
                        navigate("/blog/typescript-generics-guide")
                      }
                    >
                      TypeScript 제네릭 활용법
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/blog/nextjs-14-new-features")}
                    >
                      Next.js 14 새 기능들
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() =>
                        navigate("/blog/web-performance-optimization")
                      }
                    >
                      웹 성능 최적화 가이드
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/blog/css-grid-complete-guide")}
                    >
                      CSS Grid 완전 정복
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/blog/javascript-async-master")}
                    >
                      JavaScript 비동기 처리 마스터
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5" />
                    다른 옵션
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/blog")}
                    >
                      모든 포스트 보기
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/")}
                    >
                      홈으로 돌아가기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>포스트가 삭제되었거나 URL이 변경되었을 수 있습니다.</p>
              <p>블로그 목록에서 원하는 포스트를 찾아보세요.</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.metadata.title} - Tech Blog`}
        description={post.metadata.excerpt}
        keywords={post.metadata.tags}
        author={post.metadata.author}
        publishedAt={post.metadata.publishedAt}
        category={post.metadata.category}
        tags={post.metadata.tags}
        readingTime={post.metadata.readingTime}
        viewCount={postStats?.viewCount || post.metadata.viewCount}
        likes={postStats?.likes || post.metadata.likes}
        comments={postStats?.comments?.length || post.metadata.comments}
        url={`/blog/${post.slug}`}
        type="article"
        image="/og-image.jpg"
      />

      {/* 브레드크럼 스키마 */}
      <script type="application/ld+json">
        {JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "홈",
                item: "https://tech-blog.moomookcow.dev/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "블로그",
                item: "https://tech-blog.moomookcow.dev/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.metadata.category,
                item: `https://tech-blog.moomookcow.dev/category/${post.metadata.category.toLowerCase()}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: post.metadata.title,
                item: `https://tech-blog.moomookcow.dev/blog/${post.slug}`,
              },
            ],
          },
          null,
          2
        )}
      </script>

      {/* Firebase 기능 미구현으로 인디케이터 비활성화 */}
      {/* {import.meta.env.DEV && (
        <div className="fixed top-4 right-4 z-50">
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            📝 정적 블로그 모드
          </div>
        </div>
      )} */}

      {/* Hero Section */}
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
            >
              <ArrowLeft className="h-4 w-4" />
              뒤로 가기
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge
                variant="outline"
                className="text-sm border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
              >
                {post.metadata.category}
              </Badge>
              {post.metadata.tags.slice(0, 3).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 leading-tight">
              {post.metadata.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {post.metadata.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  {post.metadata.author}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                  {post.metadata.publishedAt}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {post.metadata.readingTime}분
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {(
                    postStats?.viewCount || post.metadata.viewCount
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="py-20 px-4 bg-pattern dark:bg-pattern-dark relative">
        {/* 배경 장식 요소 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-60 h-60 bg-gradient-to-br from-blue-400/10 to-emerald-400/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex-1 max-w-4xl"
            >
              <div className="bg-background/95 backdrop-blur-md border rounded-xl shadow-lg p-8">
                {/* Article Content */}
                <div className="prose prose-lg max-w-none dark:prose-invert cursor-default">
                  <ReactMarkdown
                    components={{
                      code(props: {
                        className?: string;
                        children?: React.ReactNode;
                      }) {
                        const { className, children } = props;
                        const match = /language-(\w+)/.exec(className || "");
                        const inline = !className?.includes("language-");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              overflow: "auto",
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className={`${className} cursor-default`}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      h1: ({ children }) => {
                        const id = String(children)
                          .toLowerCase()
                          .replace(/[^a-z0-9가-힣]/g, "-")
                          .replace(/-+/g, "-")
                          .replace(/^-|-$/g, "");
                        return (
                          <h1
                            id={id}
                            className="text-4xl font-bold text-foreground mb-6 mt-8 first:mt-0"
                          >
                            {children}
                          </h1>
                        );
                      },
                      h2: ({ children }) => {
                        const id = String(children)
                          .toLowerCase()
                          .replace(/[^a-z0-9가-힣]/g, "-")
                          .replace(/-+/g, "-")
                          .replace(/^-|-$/g, "");
                        return (
                          <h2
                            id={id}
                            className="text-3xl font-bold text-foreground mb-4 mt-8 first:mt-0"
                          >
                            {children}
                          </h2>
                        );
                      },
                      h3: ({ children }) => {
                        const id = String(children)
                          .toLowerCase()
                          .replace(/[^a-z0-9가-힣]/g, "-")
                          .replace(/-+/g, "-")
                          .replace(/^-|-$/g, "");
                        return (
                          <h3
                            id={id}
                            className="text-2xl font-semibold text-foreground mb-3 mt-6 first:mt-0"
                          >
                            {children}
                          </h3>
                        );
                      },
                      h4: ({ children }) => {
                        const id = String(children)
                          .toLowerCase()
                          .replace(/[^a-z0-9가-힣]/g, "-")
                          .replace(/-+/g, "-")
                          .replace(/^-|-$/g, "");
                        return (
                          <h4
                            id={id}
                            className="text-xl font-semibold text-foreground mb-2 mt-4 first:mt-0"
                          >
                            {children}
                          </h4>
                        );
                      },
                      p: ({ children }) => (
                        <p className="text-foreground mb-4 leading-relaxed">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="leading-relaxed">{children}</li>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors cursor-pointer"
                          target={
                            href?.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href?.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {children}
                        </a>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary/20 pl-4 py-2 mb-4 italic text-muted-foreground bg-muted/30 rounded-r">
                          {children}
                        </blockquote>
                      ),
                      hr: () => <hr className="my-8 border-border" />,
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                <Separator className="my-8" />

                {/* Article Actions - 정적 정보만 표시 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <Heart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-blue-700 dark:text-blue-300 font-medium">
                        {postStats?.likes || post.metadata.likes} 좋아요
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 text-sm bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                      <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                        {postStats?.comments?.length || post.metadata.comments}{" "}
                        댓글
                      </span>
                    </div>
                  </div>
                  <Button className="btn-outline-unique flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    공유하기
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Sidebar - Table of Contents Only */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-20">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <TableOfContents />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts and Tags Section */}
      <section className="py-20 px-4 bg-pattern dark:bg-pattern-dark relative overflow-hidden">
        {/* 배경 장식 요소 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-60 h-60 bg-gradient-to-br from-blue-400/10 to-emerald-400/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Related Posts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <Card className="card-unique">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-gradient">
                    <BookOpen className="h-5 w-5" />
                    관련 포스트
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <motion.div
                      key={relatedPost.slug}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all duration-300 cursor-pointer group"
                      onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          variant="outline"
                          className="text-xs border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                        >
                          {relatedPost.metadata.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {relatedPost.metadata.readingTime}분
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {relatedPost.metadata.publishedAt}
                        </span>
                      </div>
                      <h4 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-gradient transition-all duration-300">
                        {relatedPost.metadata.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.metadata.excerpt}
                      </p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <Card className="card-unique">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-gradient">
                    <Tag className="h-5 w-5" />
                    태그
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {post.metadata.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-sm px-3 py-1 cursor-pointer bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 hover:scale-105 transition-all duration-300"
                        onClick={() =>
                          navigate(`/tag/${encodeURIComponent(tag)}`)
                        }
                      >
                        <Tag className="h-3 w-3 mr-2" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-muted-foreground">
                      이 포스트가 도움이 되었다면 관련 태그를 클릭하여 더 많은
                      콘텐츠를 확인해보세요.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostDetailPage;
