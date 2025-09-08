import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // localStorage에서 테마 설정 가져오기
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme;
      return stored || "system";
    }
    return "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // 시스템 테마 감지
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const updateSystemTheme = () => {
        setResolvedTheme(mediaQuery.matches ? "dark" : "light");
      };

      // 초기 설정
      updateSystemTheme();

      // 시스템 테마 변경 감지
      mediaQuery.addEventListener("change", updateSystemTheme);
      return () => mediaQuery.removeEventListener("change", updateSystemTheme);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // DOM에 테마 클래스 적용
  useEffect(() => {
    const root = document.documentElement;

    // 기존 테마 클래스 제거
    root.classList.remove("light", "dark");

    // 새 테마 클래스 추가
    root.classList.add(resolvedTheme);

    // data-theme 속성 설정 (CSS 변수용)
    root.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme]);

  // 테마 변경 함수
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 테마 토글 함수
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
};
