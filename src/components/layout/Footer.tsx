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
      color:
        "hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/moomookcow",
      icon: Twitter,
      color:
        "hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      name: "Email",
      href: "mailto:moomookcow@example.com",
      icon: Mail,
      color:
        "hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-pattern dark:bg-pattern-dark border-t relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-blue-400/5 to-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-emerald-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient-bg text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:animate-glow">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
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
                  className={`p-2 rounded-lg bg-background/50 backdrop-blur-sm text-muted-foreground transition-all duration-300 ${link.color}`}
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
            <h3 className="text-lg font-semibold text-gradient">빠른 링크</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 hover:font-medium"
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
            <h3 className="text-lg font-semibold text-gradient">카테고리</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <motion.a
                    href={category.href}
                    whileHover={{ x: 5 }}
                    className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 hover:font-medium"
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
            <h3 className="text-lg font-semibold text-gradient">
              뉴스레터 구독
            </h3>
            <p className="text-sm text-muted-foreground">
              새로운 포스트가 올라오면 이메일로 알려드립니다.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <Button size="sm" className="w-full btn-unique">
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
            <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">
              <Code className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              <span>Built with React + TypeScript</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
              <Zap className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span>Powered by Vite</span>
            </div>
          </div>

          {/* Scroll to Top */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="btn-unique p-2 rounded-lg"
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
