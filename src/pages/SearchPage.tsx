import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/common/SearchBar";
import { SearchResults } from "@/components/common/SearchResults";
import SEOHead from "@/components/seo/SEOHead";
import { useSearch } from "@/hooks/useSearch";
import { getAllPosts } from "@/utils/posts";
import type { Post } from "@/utils/mdx";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const {
    query,
    setQuery,
    results,
    isLoading,
    filters,
    setFilters,
    // clearSearch,
    searchPosts,
  } = useSearch();

  // URL 파라미터에서 초기 검색어 설정
  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [searchParams, setQuery]);

  // 포스트 로드
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };

    loadPosts();
  }, []);

  // 검색 실행
  useEffect(() => {
    if (query.trim() && posts.length > 0) {
      searchPosts(posts);
    }
  }, [query, posts, searchPosts]);

  // URL 업데이트
  useEffect(() => {
    if (query.trim()) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  // 검색 실행
  const handleSearch = () => {
    if (query.trim()) {
      searchPosts(posts);
    }
  };

  // 포스트 클릭
  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  // 필터 변경
  const handleFiltersChange = (newFilters: {
    category?: string;
    tags?: string[];
  }) => {
    setFilters(newFilters);
  };

  // 사용 가능한 카테고리와 태그 추출
  const availableCategories = Array.from(
    new Set(posts.map((post) => post.categoryPath.split("/")[0]))
  ).sort();

  const availableTags = Array.from(
    new Set(
      posts
        .flatMap((post) => post.metadata.tags || [])
        .filter((tag) => tag && tag.trim() !== "")
        .map((tag) => tag.trim())
    )
  ).sort();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="포스트 검색 - Tech Blog"
        description="원하는 포스트를 빠르게 찾아보세요. 카테고리, 태그, 키워드로 필터링하여 원하는 기술 포스트를 검색할 수 있습니다."
        keywords={[
          "검색",
          "포스트",
          "기술",
          "개발",
          "JavaScript",
          "TypeScript",
          "React",
        ]}
        url="/search"
        type="website"
      />
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">포스트 검색</h1>
          <p className="text-muted-foreground">
            원하는 포스트를 빠르게 찾아보세요
          </p>
        </motion.div>

        {/* 검색바 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
            placeholder="포스트 제목, 내용, 태그, 카테고리로 검색..."
            showFilters={showFilters}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            availableCategories={availableCategories}
            availableTags={availableTags}
          />
        </motion.div>

        {/* 필터 토글 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "필터 숨기기" : "고급 필터"}
          </button>
        </motion.div>

        {/* 검색 결과 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SearchResults
            results={results}
            isLoading={isLoading}
            query={query}
            onPostClick={handlePostClick}
          />
        </motion.div>

        {/* 검색 히스토리 (향후 구현) */}
        {!query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="text-muted-foreground">
              <p className="mb-4">인기 검색어</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "React",
                  "TypeScript",
                  "JavaScript",
                  "Next.js",
                  "Firebase",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
