import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ className }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // 마크다운 콘텐츠에서 헤딩을 추출하여 목차 생성
  useEffect(() => {
    const extractHeadings = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const items: TocItem[] = [];

      headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        const level = parseInt(heading.tagName.charAt(1));
        const title = heading.textContent || "";

        // "결론" 이후의 헤딩들은 제외
        if (title.toLowerCase().includes("결론")) {
          // "결론" 헤딩은 포함하되, 이후 헤딩들은 제외
          items.push({ id, title, level });
          return;
        }

        // "결론"이 이미 추가되었다면 이후 헤딩들은 무시
        if (items.some((item) => item.title.toLowerCase().includes("결론"))) {
          return;
        }

        // ID가 없으면 생성
        if (!heading.id) {
          heading.id = id;
        }

        items.push({ id, title, level });
      });

      setTocItems(items);
    };

    // DOM이 로드된 후 실행
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, []);

  // 스크롤 시 활성 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      // 헤더 높이를 동적으로 계산
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 64;

      const scrollPosition = window.scrollY + headerHeight + 20; // 헤더 높이 + 여백 고려

      for (let i = tocItems.length - 1; i >= 0; i--) {
        const element = document.getElementById(tocItems[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(tocItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  // 목차 항목 클릭 시 해당 섹션으로 스크롤
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 헤더 높이를 동적으로 계산
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 64;

      // getBoundingClientRect를 사용해서 더 정확한 위치 계산
      const rect = element.getBoundingClientRect();
      const elementPosition = window.scrollY + rect.top - headerHeight - 20;

      console.log("Scroll Debug:", {
        elementId: id,
        elementOffsetTop: element.offsetTop,
        rectTop: rect.top,
        windowScrollY: window.scrollY,
        headerHeight: headerHeight,
        calculatedPosition: elementPosition,
        currentScrollY: window.scrollY,
      });

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-background/95 backdrop-blur-md border rounded-lg p-4",
        "shadow-lg w-full min-w-0", // 가로 스크롤 방지
        className
      )}
    >
      <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">
        목차
      </h3>
      <nav className="space-y-1">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "block w-full text-left text-sm transition-colors duration-200",
              "hover:text-primary focus:outline-none focus:text-primary",
              "py-1 px-2 rounded-md overflow-hidden", // 오버플로우 처리
              {
                "text-primary font-medium bg-primary/10": activeId === item.id,
                "text-muted-foreground hover:bg-muted/50": activeId !== item.id,
              }
            )}
            style={{
              paddingLeft: `${(item.level - 1) * 12 + 8}px`,
            }}
          >
            <span className="block truncate">{item.title}</span>
          </button>
        ))}
      </nav>
    </motion.div>
  );
};

export default TableOfContents;
