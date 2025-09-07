import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Twitter,
  Mail,
  Heart,
  ArrowUp,
  BookOpen,
  Code,
  Zap,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "홈", href: "/" },
    { name: "블로그", href: "/blog" },
    { name: "소개", href: "/about" },
    { name: "연락처", href: "/contact" },
  ];

  const categories = [
    { name: "JavaScript", href: "/category/javascript" },
    { name: "TypeScript", href: "/category/typescript" },
    { name: "React", href: "/category/react" },
    { name: "Performance", href: "/category/performance" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/moomookcow",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/moomookcow",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "Email",
      href: "mailto:moomookcow@example.com",
      icon: Mail,
      color: "hover:text-red-400",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Tech Blog
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              JavaScript, TypeScript, React를 중심으로 한 기술 블로그입니다.
              실무 경험과 학습 내용을 공유합니다.
            </p>
            <div className="flex items-center space-x-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-md bg-background text-muted-foreground transition-colors ${link.color}`}
                  aria-label={link.name}
                >
                  <link.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">빠른 링크</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">카테고리</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <motion.a
                    href={category.href}
                    whileHover={{ x: 5 }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">
              뉴스레터 구독
            </h3>
            <p className="text-sm text-muted-foreground">
              새로운 포스트가 올라오면 이메일로 알려드립니다.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <Button size="sm" className="w-full">
                구독하기
              </Button>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} Tech Blog. Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500"
            >
              <Heart className="h-4 w-4" />
            </motion.span>
            <span>by moomookcow</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Code className="h-3 w-3" />
              <span>Built with React + TypeScript</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Zap className="h-3 w-3" />
              <span>Powered by Vite</span>
            </div>
          </div>

          {/* Scroll to Top */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            aria-label="맨 위로"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
