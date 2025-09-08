import React from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const getIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-4 w-4" />;
    }
    return resolvedTheme === "light" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    );
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="w-10 h-10 p-0 flex items-center justify-center"
      aria-label={`테마 전환 (현재: ${theme})`}
      title={`현재 테마: ${
        theme === "system" ? "시스템" : theme === "light" ? "라이트" : "다크"
      }`}
    >
      {getIcon()}
    </Button>
  );
};

export default ThemeToggle;
