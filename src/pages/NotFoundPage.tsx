import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  ArrowLeft,
  Search,
  BookOpen,
  Bug,
  Code,
  Terminal,
  AlertTriangle,
  Coffee,
  Zap,
  Github,
} from "lucide-react";

const NotFoundPage = () => {
  const errorMessages = [
    "undefined is not a function",
    "Cannot read property 'page' of undefined",
    "ReferenceError: page is not defined",
    "TypeError: Cannot read properties of null",
    "SyntaxError: Unexpected token '<'",
    "Error: Maximum call stack exceeded",
  ];

  const randomError =
    errorMessages[Math.floor(Math.random() * errorMessages.length)];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-muted/50 rounded-t-lg p-3 flex items-center gap-2 border-b"
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Terminal className="h-4 w-4" />
            <span>moomookcow@tech-blog:~$</span>
          </div>
        </motion.div>

        <Card className="rounded-t-none">
          <CardContent className="pt-8 pb-8">
            {/* Error Code Display */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <Bug className="h-12 w-12 text-red-500" />
                <div className="text-6xl font-mono font-bold text-primary">
                  404
                </div>
                <AlertTriangle className="h-12 w-12 text-orange-500" />
              </div>

              <Badge variant="destructive" className="mb-4">
                <Code className="h-3 w-3 mr-1" />
                HTTP Status Code
              </Badge>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Page Not Found
              </h1>

              <div className="bg-muted/30 rounded-lg p-4 mb-4 font-mono text-sm">
                <div className="text-red-500 mb-2">Error:</div>
                <div className="text-foreground">{randomError}</div>
              </div>

              <p className="text-muted-foreground">
                The page you're looking for seems to have been moved, deleted,
                or never existed.
                <br />
                <span className="text-sm">
                  (It's not you, it's us... probably)
                </span>
              </p>
            </motion.div>

            {/* Developer Humor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 mb-8"
            >
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Developer Tip:</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This error is like a bug in production - it happens to the best
                of us! Take a coffee break ☕ and try one of the links below.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Or explore these pages:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => (window.location.href = "/blog")}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="text-xs">Blog</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => (window.location.href = "/about")}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <Search className="h-4 w-4" />
                    <span className="text-xs">About</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => (window.location.href = "/guestbook")}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <Zap className="h-4 w-4" />
                    <span className="text-xs">Guestbook</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      window.open("https://github.com/moomookcow", "_blank")
                    }
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-xs">GitHub</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Floating Code Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.1, 0],
                scale: [0, 1, 0],
                y: [0, -150, -300],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="absolute text-primary/20 font-mono text-xs"
              style={{
                left: `${10 + i * 12}%`,
                top: "90%",
              }}
            >
              {i % 2 === 0 ? "<div>" : "</div>"}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
