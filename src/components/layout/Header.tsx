import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/common/ThemeToggle";
import ReadingProgressBar from "@/components/common/ReadingProgressBar";
import { shouldShowReadingProgress } from "@/utils/routeUtils";
import {
  Menu,
  X,
  Home,
  BookOpen,
  User,
  Mail,
  Github,
  Twitter,
} from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "홈", href: "/", icon: Home },
    { name: "블로그", href: "/blog", icon: BookOpen },
    { name: "소개", href: "/about", icon: User },
    { name: "방명록", href: "/guestbook", icon: Mail },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/moomookcow", icon: Github },
    { name: "Twitter", href: "https://twitter.com/moomookcow", icon: Twitter },
  ];

  // Reading Progress Bar 표시 여부 확인
  const showReadingProgress = shouldShowReadingProgress(location.pathname);

  return (
    <>
      {/* Reading Progress Bar - 블로그 포스트에서만 표시 */}
      {showReadingProgress && (
        <ReadingProgressBar height={4} showPercentage={false} position="top" />
      )}

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center space-x-3 group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl brand-gradient-bg text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:animate-glow">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">
                  Tech Blog
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <motion.div key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      location.pathname === item.href
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden w-10 h-10 p-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{
              height: isMobileMenuOpen ? "auto" : 0,
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-2 border-t">
              {navigation.map((item) => (
                <motion.div key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === item.href
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}

              {/* Social Links */}
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-4 px-3">
                  <span className="text-sm text-muted-foreground">Follow:</span>
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <link.icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
