import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Code, Zap } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b bg-card"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.h1
              className="text-3xl font-bold text-foreground"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Tech Blog
            </motion.h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                검색
              </Button>
              <Button size="sm">글쓰기</Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Featured Post */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="md:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">Featured</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                </div>
                <CardTitle className="text-2xl">
                  React Hooks 완전 정리: useState부터 커스텀 훅까지
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  React Hooks의 모든 것을 실무 예제와 함께 알아보는 완벽한
                  가이드입니다. 기본 훅부터 고급 패턴까지 차근차근 설명합니다.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>2024.01.15</span>
                  <span>•</span>
                  <span>5분 읽기</span>
                  <span>•</span>
                  <span>1,234 조회</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Regular Posts */}
          {[
            {
              title: "TypeScript 제네릭 활용법",
              category: "TypeScript",
              icon: Code,
            },
            { title: "Next.js 14 새 기능들", category: "React", icon: Zap },
            {
              title: "웹 성능 최적화 가이드",
              category: "Performance",
              icon: BookOpen,
            },
          ].map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full"
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <post.icon className="h-4 w-4 text-primary" />
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    실무에서 바로 사용할 수 있는 실용적인 내용들을 정리했습니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

export default App;
