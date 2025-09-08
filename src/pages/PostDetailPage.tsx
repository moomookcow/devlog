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

  // 실제 MDX 데이터 로드 (동적 import)
  const [post, setPost] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPost = async () => {
      try {
        // 사용 가능한 포스트 목록
        const availablePosts = [
          "react-typescript-best-practices",
          "react-hooks-complete-guide",
          "typescript-generics-guide",
          "nextjs-14-new-features",
          "web-performance-optimization",
          "css-grid-complete-guide",
          "javascript-async-master",
        ];

        if (slug && availablePosts.includes(slug)) {
          // 하드코딩된 포스트 데이터 (개발 중)
          const postsData: Record<string, any> = {
            "react-typescript-best-practices": {
              title: "React + TypeScript 베스트 프랙티스 가이드",
              excerpt:
                "React와 TypeScript를 함께 사용할 때 알아야 할 핵심 패턴과 베스트 프랙티스를 정리했습니다.",
              content: `# React + TypeScript 베스트 프랙티스

React와 TypeScript를 함께 사용하면 더 안전하고 유지보수하기 쉬운 코드를 작성할 수 있습니다.

## 1. 컴포넌트 Props 타입 정의

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
\`\`\`

## 결론

TypeScript와 React를 함께 사용하면 컴파일 타임에 오류를 잡을 수 있어 더 안전한 코드를 작성할 수 있습니다.`,
              author: "moomookcow",
              publishedAt: "2024-01-15",
              readingTime: 8,
              viewCount: 1247,
              likes: 89,
              comments: 12,
              category: "React",
              tags: [
                "React",
                "TypeScript",
                "Frontend",
                "JavaScript",
                "Best Practices",
              ],
              isPublished: true,
            },
            "react-hooks-complete-guide": {
              title: "React Hooks 완전 정리: useState부터 커스텀 훅까지",
              excerpt:
                "React Hooks의 모든 것을 실무 예제와 함께 알아보는 완벽한 가이드입니다.",
              content: `# React Hooks 완전 정리

React Hooks는 함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해주는 강력한 기능입니다.

## 1. useState - 상태 관리의 기본

\`useState\`는 함수형 컴포넌트에서 상태를 관리하는 가장 기본적인 Hook입니다.

\`\`\`typescript
import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
};
\`\`\`

## 결론

React Hooks는 함수형 컴포넌트에서 상태와 생명주기를 관리하는 강력한 도구입니다.`,
              author: "moomookcow",
              publishedAt: "2024-01-15",
              readingTime: 5,
              viewCount: 1234,
              likes: 67,
              comments: 8,
              category: "JavaScript",
              tags: ["React", "Hooks", "JavaScript"],
              isPublished: true,
            },
            "typescript-generics-guide": {
              title: "TypeScript 제네릭 활용법",
              excerpt:
                "재사용 가능한 타입을 만드는 TypeScript 제네릭의 모든 것",
              content: `# TypeScript 제네릭 활용법

TypeScript의 제네릭(Generics)은 재사용 가능한 컴포넌트를 만들 때 유용한 강력한 도구입니다.

## 1. 제네릭의 기본 개념

제네릭은 타입을 매개변수로 받아서 다양한 타입에 대해 동작하는 코드를 작성할 수 있게 해줍니다.

\`\`\`typescript
// 기본 제네릭 함수
function identity<T>(arg: T): T {
  return arg;
}

// 사용 예시
const stringResult = identity<string>("Hello"); // string
const numberResult = identity<number>(42); // number
\`\`\`

## 결론

TypeScript의 제네릭은 타입 안전성을 유지하면서 재사용 가능한 코드를 작성할 수 있게 해주는 강력한 도구입니다.`,
              author: "moomookcow",
              publishedAt: "2024-01-14",
              readingTime: 3,
              viewCount: 856,
              likes: 42,
              comments: 5,
              category: "TypeScript",
              tags: ["TypeScript", "Generic"],
              isPublished: true,
            },
            "nextjs-14-new-features": {
              title: "Next.js 14 새 기능들",
              excerpt: "Next.js 14의 새로운 기능들과 개선사항을 살펴보세요",
              content: `# Next.js 14 새 기능들

Next.js 14는 React 18의 최신 기능들을 활용하고, 개발자 경험을 크게 개선한 주요 업데이트입니다.

## 1. App Router의 안정화

Next.js 13에서 도입된 App Router가 이제 안정화되어 프로덕션에서 안전하게 사용할 수 있습니다.

\`\`\`typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'Generated by create next app',
}
\`\`\`

## 결론

Next.js 14는 개발자 경험과 성능을 크게 개선한 주요 업데이트입니다.`,
              author: "moomookcow",
              publishedAt: "2024-01-13",
              readingTime: 4,
              viewCount: 692,
              likes: 38,
              comments: 7,
              category: "React",
              tags: ["Next.js", "React", "SSR"],
              isPublished: true,
            },
            "web-performance-optimization": {
              title: "웹 성능 최적화 가이드",
              excerpt: "웹사이트의 성능을 향상시키는 실무 노하우",
              content: `# 웹 성능 최적화 가이드

웹 성능은 사용자 경험과 비즈니스 성과에 직접적인 영향을 미칩니다.

## 1. Core Web Vitals 이해하기

Google이 정의한 핵심 웹 성능 지표들을 이해하고 개선해보겠습니다.

### LCP (Largest Contentful Paint)

페이지에서 가장 큰 콘텐츠 요소가 렌더링되는 시간

\`\`\`typescript
// LCP 측정
function measureLCP() {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    
    console.log('LCP:', lastEntry.startTime)
  })
  
  observer.observe({ entryTypes: ['largest-contentful-paint'] })
}
\`\`\`

## 결론

웹 성능 최적화는 지속적인 과정입니다.`,
              author: "moomookcow",
              publishedAt: "2024-01-12",
              readingTime: 6,
              viewCount: 445,
              likes: 28,
              comments: 4,
              category: "Performance",
              tags: ["Performance", "Web", "Optimization"],
              isPublished: true,
            },
            "css-grid-complete-guide": {
              title: "CSS Grid 완전 정복",
              excerpt: "CSS Grid를 활용한 레이아웃 디자인 기법",
              content: `# CSS Grid 완전 정복

CSS Grid는 2차원 레이아웃을 위한 강력한 도구입니다.

## 1. CSS Grid 기본 개념

### Grid Container와 Grid Items

\`\`\`css
/* Grid Container */
.grid-container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
  gap: 20px;
}

/* Grid Items */
.grid-item {
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
}
\`\`\`

## 결론

CSS Grid는 현대 웹 개발에서 필수적인 레이아웃 도구입니다.`,
              author: "moomookcow",
              publishedAt: "2024-01-11",
              readingTime: 4,
              viewCount: 378,
              likes: 22,
              comments: 3,
              category: "CSS",
              tags: ["CSS", "Grid", "Layout"],
              isPublished: true,
            },
            "javascript-async-master": {
              title: "JavaScript 비동기 처리 마스터",
              excerpt:
                "Promise, async/await, 그리고 비동기 프로그래밍의 모든 것",
              content: `# JavaScript 비동기 처리 마스터

JavaScript의 비동기 프로그래밍은 현대 웹 개발의 핵심입니다.

## 1. 비동기 프로그래밍의 기본

### async/await 사용

\`\`\`javascript
// async/await 사용
async function loadUserData() {
  try {
    const user = await getUser(1);
    console.log('User:', user);
    
    const posts = await getPosts(user.id);
    console.log('Posts:', posts);
    
    return { user, posts };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
\`\`\`

## 결론

JavaScript의 비동기 프로그래밍은 현대 웹 개발의 핵심입니다.`,
              author: "moomookcow",
              publishedAt: "2024-01-10",
              readingTime: 7,
              viewCount: 892,
              likes: 56,
              comments: 9,
              category: "JavaScript",
              tags: ["JavaScript", "Async", "Promise"],
              isPublished: true,
            },
          };

          const postData = postsData[slug];
          if (postData) {
            setPost({
              slug: slug,
              title: postData.title,
              excerpt: postData.excerpt,
              content: postData.content,
              author: postData.author,
              publishedAt: postData.publishedAt,
              readingTime: postData.readingTime,
              viewCount: postData.viewCount,
              likes: postData.likes,
              comments: postData.comments,
              category: postData.category,
              tags: postData.tags,
              isPublished: postData.isPublished,
            });
          } else {
            setPost(null);
          }
        } else {
          // 존재하지 않는 포스트
          setPost(null);
        }
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
              <div className="text-6xl mb-4">📝</div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
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

  const relatedPosts = [
    {
      id: 2,
      title: "React Hooks 완벽 가이드",
      excerpt:
        "useState, useEffect, useContext 등 React Hooks의 모든 것을 알아보세요.",
      slug: "react-hooks-complete-guide",
      category: "React",
      publishedAt: "2024-01-10",
      readingTime: 6,
    },
    {
      id: 3,
      title: "TypeScript 고급 타입 활용법",
      excerpt:
        "Union, Intersection, Conditional Types 등 TypeScript의 고급 기능들을 살펴보세요.",
      slug: "typescript-advanced-types",
      category: "TypeScript",
      publishedAt: "2024-01-08",
      readingTime: 10,
    },
    {
      id: 4,
      title: "Next.js 14 App Router 완전 정복",
      excerpt:
        "Next.js 14의 새로운 App Router와 Server Components를 마스터하세요.",
      slug: "nextjs-14-app-router",
      category: "Next.js",
      publishedAt: "2024-01-05",
      readingTime: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 px-4"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              뒤로 가기
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="outline" className="text-sm">
                {post.category}
              </Badge>
              {post.tags.slice(0, 3).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime}분</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.viewCount}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <Card>
                <CardContent className="pt-8">
                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <ReactMarkdown
                      components={{
                        code({ node, className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || "");
                          const inline = !className?.includes("language-");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={oneDark as any}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
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
                              className="text-4xl font-bold text-foreground mb-6 mt-8 first:mt-0 scroll-mt-20"
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
                              className="text-3xl font-bold text-foreground mb-4 mt-8 first:mt-0 scroll-mt-20"
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
                              className="text-2xl font-semibold text-foreground mb-3 mt-6 first:mt-0 scroll-mt-20"
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
                              className="text-xl font-semibold text-foreground mb-2 mt-4 first:mt-0 scroll-mt-20"
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
                            className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
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

                  {/* Article Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      공유하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar - Table of Contents Only */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="lg:col-span-2"
            >
              <TableOfContents />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Posts and Tags Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Related Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    관련 포스트
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <motion.div
                      key={relatedPost.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {relatedPost.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {relatedPost.readingTime}분
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {relatedPost.publishedAt}
                        </span>
                      </div>
                      <h4 className="font-semibold text-base mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    태그
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-sm px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Tag className="h-3 w-3 mr-2" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
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
