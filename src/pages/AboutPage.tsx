import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/seo/SEOHead";
import {
  Github,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  Code,
  BookOpen,
  Heart,
  Star,
  Zap,
  Target,
  TrendingUp,
  Gamepad2,
  Music,
  Camera,
  Palette,
} from "lucide-react";

const AboutPage = () => {
  const skills = [
    {
      name: "JavaScript",
      icon: "⚡",
      level: "주력",
      description: "ES6+, 모던 JS 마스터",
    },
    {
      name: "TypeScript",
      icon: "🔷",
      level: "주력",
      description: "타입 안전성의 달인",
    },
    {
      name: "React",
      icon: "⚛️",
      level: "주력",
      description: "컴포넌트 아키텍처 전문가",
    },
    {
      name: "Node.js",
      icon: "🟢",
      level: "보조",
      description: "백엔드 개발 경험",
    },
    {
      name: "CSS",
      icon: "🎨",
      level: "주력",
      description: "크리에이티브 스타일링",
    },
    {
      name: "Firebase",
      icon: "🔥",
      level: "보조",
      description: "클라우드 서비스 활용",
    },
  ];

  const experience = [
    {
      year: "2024",
      title: "프론트엔드 개발자",
      company: "Tech Company",
      description: "React와 TypeScript를 활용한 웹 애플리케이션 개발",
      milestone: "🚀 성장의 정점",
    },
    {
      year: "2023",
      title: "풀스택 개발자",
      company: "Startup Inc",
      description: "JavaScript 기반의 풀스택 웹 애플리케이션 개발",
      milestone: "🌱 새로운 도전",
    },
    {
      year: "2022",
      title: "웹 개발자",
      company: "Digital Agency",
      description: "클라이언트 웹사이트 및 웹 애플리케이션 개발",
      milestone: "🌱 첫 발걸음",
    },
  ];

  const interests = [
    {
      name: "웹 개발",
      icon: Code,
      description: "창의적인 웹 솔루션",
    },
    {
      name: "사용자 경험",
      icon: Target,
      description: "직관적인 인터페이스",
    },
    {
      name: "성능 최적화",
      icon: Zap,
      description: "빠르고 효율적인 코드",
    },
    {
      name: "오픈소스",
      icon: Github,
      description: "커뮤니티 기여",
    },
    {
      name: "기술 블로깅",
      icon: BookOpen,
      description: "지식 공유",
    },
    {
      name: "커뮤니티",
      icon: Heart,
      description: "개발자 네트워킹",
    },
    {
      name: "게임",
      icon: Gamepad2,
      description: "게임 개발 관심",
    },
    {
      name: "음악",
      icon: Music,
      description: "코딩할 때 듣는 음악",
    },
    {
      name: "사진",
      icon: Camera,
      description: "기록하는 순간들",
    },
    {
      name: "디자인",
      icon: Palette,
      description: "아름다운 UI/UX",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="소개 - moomookcow | Tech Blog"
        description="JavaScript, TypeScript, React를 중심으로 한 프론트엔드 개발자 moomookcow의 소개 페이지입니다. 기술 스택, 경력, 관심사 등을 확인해보세요."
        keywords={[
          "개발자",
          "프론트엔드",
          "JavaScript",
          "TypeScript",
          "React",
          "소개",
          "경력",
          "기술스택",
        ]}
        url="/about"
        type="website"
      />
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
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <Code className="h-16 w-16 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              안녕하세요, moomookcow입니다
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              JavaScript, TypeScript, React를 중심으로 한 프론트엔드
              개발자입니다. 사용자 경험을 중시하며, 지속적인 학습과 성장을
              추구합니다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
              <Button variant="outline" size="lg">
                <Twitter className="mr-2 h-5 w-5" />
                Twitter
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Contact
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    소개
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>서울, 대한민국</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2022년부터 개발 시작</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    사용자 중심의 웹 애플리케이션을 만드는 것을 좋아합니다.
                    새로운 기술을 배우고 공유하는 것을 즐기며, 개발자
                    커뮤니티에서 활발히 활동하고 있습니다.
                  </p>
                  <div className="pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>지속적인 학습과 성장을 추구합니다</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    기술 스택
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="group"
                      >
                        <div className="p-4 rounded-lg bg-card border hover:shadow-md transition-all duration-200 h-full">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{skill.icon}</span>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-foreground">
                                {skill.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {skill.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant={
                                skill.level === "주력" ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Experience - Journey Path */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  개발 여정
                </CardTitle>
                <p className="text-muted-foreground">
                  오솔길을 따라 걸어온 성장의 발자취
                </p>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Path Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                  <div className="space-y-6">
                    {experience.map((exp, index) => (
                      <motion.div
                        key={exp.year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="relative flex gap-6"
                      >
                        {/* Milestone Circle */}
                        <div className="flex-shrink-0 relative z-10">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-sm">
                            <span className="text-sm font-bold text-primary-foreground">
                              {exp.year.slice(-2)}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-4">
                          <div className="bg-card rounded-lg p-4 border hover:shadow-sm transition-shadow">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground text-lg">
                                {exp.title}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {exp.milestone}
                              </Badge>
                            </div>
                            <p className="text-primary font-medium mb-2">
                              {exp.company}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  관심사 & 취미
                </CardTitle>
                <p className="text-muted-foreground">
                  개발 외에도 다양한 것들에 관심이 많아요
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {interests.map((interest, index) => {
                    const IconComponent = interest.icon;
                    return (
                      <motion.div
                        key={interest.name}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.7 + index * 0.05,
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="group cursor-pointer"
                      >
                        <div className="p-4 rounded-lg bg-card border hover:shadow-md transition-all duration-200 text-center">
                          <div className="mb-2">
                            <IconComponent className="h-6 w-6 mx-auto text-primary" />
                          </div>
                          <h3 className="font-semibold text-sm mb-1 text-foreground">
                            {interest.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {interest.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
