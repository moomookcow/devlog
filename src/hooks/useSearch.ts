import { useState, useCallback, useMemo } from "react";
import type { Post } from "@/utils/mdx";

export interface SearchResult {
  post: Post;
  score: number;
  matchedFields: string[];
}

export interface SearchFilters {
  category?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isLoading: boolean;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  clearSearch: () => void;
  searchPosts: (posts: Post[]) => void;
}

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});

  // 검색 로직
  const searchPosts = useCallback(
    async (posts: Post[]) => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      try {
        // 검색어를 소문자로 변환하고 공백으로 분리
        const searchTerms = query
          .toLowerCase()
          .split(/\s+/)
          .filter((term) => term.length > 0);

        const searchResults: SearchResult[] = [];

        for (const post of posts) {
          let score = 0;
          const matchedFields: string[] = [];

          // 제목 검색 (가장 높은 가중치)
          const titleMatches = searchTerms.filter((term) =>
            post.metadata.title.toLowerCase().includes(term)
          );
          if (titleMatches.length > 0) {
            score += titleMatches.length * 10;
            matchedFields.push("title");
          }

          // 설명 검색
          if (post.metadata.excerpt) {
            const descMatches = searchTerms.filter((term) =>
              post.metadata.excerpt.toLowerCase().includes(term)
            );
            if (descMatches.length > 0) {
              score += descMatches.length * 5;
              matchedFields.push("description");
            }
          }

          // 태그 검색
          if (post.metadata.tags) {
            const tagMatches = searchTerms.filter((term) =>
              post.metadata.tags.some((tag) => tag.toLowerCase().includes(term))
            );
            if (tagMatches.length > 0) {
              score += tagMatches.length * 8;
              matchedFields.push("tags");
            }
          }

          // 카테고리 검색
          const categoryMatches = searchTerms.filter((term) =>
            post.categoryPath.toLowerCase().includes(term)
          );
          if (categoryMatches.length > 0) {
            score += categoryMatches.length * 6;
            matchedFields.push("category");
          }

          // 내용 검색 (가장 낮은 가중치)
          const contentMatches = searchTerms.filter((term) =>
            post.content.toLowerCase().includes(term)
          );
          if (contentMatches.length > 0) {
            score += contentMatches.length * 2;
            matchedFields.push("content");
          }

          // 점수가 0보다 크면 결과에 포함
          if (score > 0) {
            searchResults.push({
              post,
              score,
              matchedFields,
            });
          }
        }

        // 점수순으로 정렬
        searchResults.sort((a, b) => b.score - a.score);

        // 필터 적용
        let filteredResults = searchResults;

        if (filters.category) {
          filteredResults = filteredResults.filter((result) =>
            result.post.categoryPath.includes(filters.category!)
          );
        }

        if (filters.tags && filters.tags.length > 0) {
          filteredResults = filteredResults.filter((result) =>
            filters.tags!.some((tag) =>
              result.post.metadata.tags?.includes(tag)
            )
          );
        }

        if (filters.dateRange) {
          filteredResults = filteredResults.filter((result) => {
            const postDate = new Date(result.post.metadata.publishedAt);
            return (
              postDate >= filters.dateRange!.start &&
              postDate <= filters.dateRange!.end
            );
          });
        }

        setResults(filteredResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [query, filters]
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setFilters({});
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    filters,
    setFilters,
    clearSearch,
    searchPosts,
  };
}
