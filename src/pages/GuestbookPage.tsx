import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Github,
  Twitter,
  Send,
  MessageCircle,
  User,
  Lock,
  Globe,
  ThumbsUp,
  Reply,
} from "lucide-react";

const GuestbookPage = () => {
  // 임시 코멘트 데이터 (나중에 Firebase에서 가져올 예정)
  const comments = [
    {
      id: 1,
      author: "익명",
      content:
        "정말 유용한 블로그네요! React 관련 포스트가 특히 도움이 됐습니다.",
      isPublic: true,
      createdAt: "2024-01-15",
      likes: 5,
      replies: 2,
      comments: [
        {
          id: 1,
          author: "moomookcow",
          content:
            "감사합니다! React 관련해서 더 많은 포스트를 올릴 예정입니다.",
          createdAt: "2024-01-15",
          isOwner: true,
          likes: 8,
        },
        {
          id: 2,
          author: "개발자B",
          content: "저도 React 포스트 정말 도움이 됐어요!",
          createdAt: "2024-01-15",
          isOwner: false,
          likes: 3,
        },
      ],
    },
    {
      id: 2,
      author: "개발자A",
      content:
        "TypeScript 관련해서 질문이 있는데, 개인적으로 연락드려도 될까요?",
      isPublic: false,
      createdAt: "2024-01-14",
      likes: 3,
      replies: 1,
      comments: [
        {
          id: 3,
          author: "moomookcow",
          content: "네, 언제든지 연락주세요! 이메일로 연락드리겠습니다.",
          createdAt: "2024-01-14",
          isOwner: true,
          likes: 5,
        },
      ],
    },
    {
      id: 3,
      author: "익명",
      content:
        "Firebase 설정 관련해서 더 자세한 튜토리얼을 올려주시면 좋겠어요!",
      isPublic: true,
      createdAt: "2024-01-13",
      likes: 8,
      replies: 0,
    },
    {
      id: 4,
      author: "프론트엔드 개발자",
      content:
        "Tailwind CSS와 Shadcn/ui 조합이 정말 깔끔하네요. 디자인 시스템 구축에 많은 도움이 됐습니다!",
      isPublic: true,
      createdAt: "2024-01-12",
      likes: 12,
      replies: 3,
      comments: [
        {
          id: 4,
          author: "moomookcow",
          content:
            "감사합니다! Shadcn/ui는 정말 개발 생산성을 높여주는 라이브러리죠.",
          createdAt: "2024-01-12",
          isOwner: true,
          likes: 12,
        },
        {
          id: 5,
          author: "디자이너",
          content: "저도 이 조합으로 프로젝트를 시작해보고 싶어요!",
          createdAt: "2024-01-12",
          isOwner: false,
          likes: 7,
        },
        {
          id: 6,
          author: "개발자C",
          content:
            "Tailwind CSS 학습 곡선이 궁금한데, 어느 정도 시간이 걸렸나요?",
          createdAt: "2024-01-12",
          isOwner: false,
          likes: 4,
        },
      ],
    },
    {
      id: 5,
      author: "익명",
      content:
        "블로그 포스트 업데이트가 자주 되면 좋겠어요. 정말 기다리고 있습니다!",
      isPublic: true,
      createdAt: "2024-01-11",
      likes: 7,
      replies: 1,
    },
    {
      id: 6,
      author: "백엔드 개발자",
      content:
        "Firebase Functions 관련해서 질문이 있습니다. 혹시 1:1 멘토링 가능한가요?",
      isPublic: false,
      createdAt: "2024-01-10",
      likes: 4,
      replies: 0,
    },
    {
      id: 7,
      author: "학생",
      content:
        "처음 개발을 시작하는데 어떤 언어부터 배워야 할까요? 추천해주세요!",
      isPublic: true,
      createdAt: "2024-01-09",
      likes: 15,
      replies: 8,
      comments: [
        {
          id: 7,
          author: "moomookcow",
          content:
            "JavaScript부터 시작하시는 것을 추천드립니다! 웹 개발의 기초가 되고, React도 JavaScript 기반이에요.",
          createdAt: "2024-01-09",
          isOwner: true,
          likes: 15,
        },
        {
          id: 8,
          author: "시니어 개발자",
          content:
            "저는 Python을 추천합니다. 문법이 간단하고 다양한 분야에 활용할 수 있어요.",
          createdAt: "2024-01-09",
          isOwner: false,
          likes: 9,
        },
        {
          id: 9,
          author: "프론트엔드 개발자",
          content:
            "웹 개발을 원한다면 HTML → CSS → JavaScript 순서로 배우시면 좋을 것 같아요!",
          createdAt: "2024-01-09",
          isOwner: false,
          likes: 6,
        },
      ],
    },
    {
      id: 8,
      author: "익명",
      content: "코드 품질 관리에 대한 포스트를 올려주시면 정말 감사하겠습니다.",
      isPublic: true,
      createdAt: "2024-01-08",
      likes: 9,
      replies: 2,
    },
    {
      id: 9,
      author: "시니어 개발자",
      content:
        "팀 리딩 경험에 대한 글도 올려주시면 좋겠어요. 많은 도움이 될 것 같습니다.",
      isPublic: true,
      createdAt: "2024-01-07",
      likes: 11,
      replies: 4,
    },
    {
      id: 10,
      author: "익명",
      content:
        "블로그 디자인이 정말 깔끔하고 보기 좋네요. 어떤 기술 스택을 사용하셨나요?",
      isPublic: true,
      createdAt: "2024-01-06",
      likes: 6,
      replies: 1,
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "이메일",
      value: "moomookcow@example.com",
      href: "mailto:moomookcow@example.com",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/moomookcow",
      href: "https://github.com/moomookcow",
    },
    {
      icon: Twitter,
      title: "Twitter",
      value: "@moomookcow",
      href: "https://twitter.com/moomookcow",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <MessageCircle className="h-12 w-12 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              방명록
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              블로그에 대한 피드백, 질문, 또는 단순한 인사까지 자유롭게
              남겨주세요!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-2"
            >
              <Badge variant="outline" className="text-sm">
                <User className="mr-1 h-3 w-3" />
                익명 가능
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Globe className="mr-1 h-3 w-3" />
                공개/비공개 선택
              </Badge>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Guestbook Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Comment Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>방명록 남기기</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        이름 (선택사항)
                      </label>
                      <Input placeholder="익명 또는 닉네임" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        이메일 (선택사항)
                      </label>
                      <Input type="email" placeholder="답변 받을 이메일" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      메시지
                    </label>
                    <Textarea
                      placeholder="블로그에 대한 피드백이나 질문을 남겨주세요..."
                      rows={6}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="public-comment" />
                    <Label htmlFor="public-comment" className="text-sm">
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        공개 댓글로 남기기
                      </div>
                    </Label>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 mb-1">
                      <Globe className="h-3 w-3" />
                      공개: 모든 방문자가 볼 수 있습니다
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      비공개: 블로그 주인만 볼 수 있습니다
                    </div>
                  </div>
                  <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    방명록 남기기
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Comments List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Comments */}
              <Card>
                <CardHeader>
                  <CardTitle>방명록</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {comments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="p-4 rounded-lg bg-muted/30 border"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground text-sm">
                              {comment.author}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {comment.createdAt}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {comment.isPublic ? (
                            <Globe className="h-3 w-3 text-green-500" />
                          ) : (
                            <Lock className="h-3 w-3 text-orange-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-foreground mb-3">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                          <ThumbsUp className="h-3 w-3" />
                          {comment.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                          <Reply className="h-3 w-3" />
                          {comment.replies}
                        </button>
                      </div>

                      {/* 댓글 표시 */}
                      {comment.comments && comment.comments.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-muted">
                          <div className="space-y-3">
                            {comment.comments.map((reply) => (
                              <div
                                key={reply.id}
                                className="flex items-start gap-3"
                              >
                                <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                                  <User className="h-3 w-3 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium text-foreground">
                                      {reply.author}
                                    </span>
                                    {reply.isOwner && (
                                      <Badge
                                        variant="secondary"
                                        className="text-xs px-1 py-0"
                                      >
                                        작성자
                                      </Badge>
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                      {reply.createdAt}
                                    </span>
                                  </div>
                                  <p className="text-xs text-foreground mb-2">
                                    {reply.content}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                      <ThumbsUp className="h-3 w-3" />
                                      {reply.likes}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle>연락처 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {contactInfo.map((info, index) => (
                      <motion.a
                        key={info.title}
                        href={info.href}
                        target={
                          info.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          info.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <info.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {info.title}
                        </span>
                      </motion.a>
                    ))}
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

export default GuestbookPage;
