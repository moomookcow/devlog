import { useState, useEffect, useCallback, useMemo } from "react";
import { getAllPosts } from "@/utils/posts";
import type { Post } from "@/utils/mdx";

interface UsePostsOptions {
  autoLoad?: boolean;
  cacheKey?: string;
}

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getPostBySlug: (slug: string) => Post | undefined;
  getPostsByCategory: (category: string) => Post[];
  getPostsByTag: (tag: string) => Post[];
  getFeaturedPost: () => Post | null;
  getRecentPosts: (limit?: number) => Post[];
  getPopularPosts: (limit?: number) => Post[];
  categories: string[];
  tags: string[];
  searchPosts: (query: string) => Post[];
}

// 메모리 캐시
const postCache = new Map<string, { posts: Post[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5분

export const usePosts = (options: UsePostsOptions = {}): UsePostsReturn => {
  const { autoLoad = true, cacheKey = "default" } = options;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 캐시된 데이터 확인
  const getCachedPosts = useCallback(() => {
    const cached = postCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.posts;
    }
    return null;
  }, [cacheKey]);

  // 포스트 로드 함수
  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 캐시 확인
      const cachedPosts = getCachedPosts();
      if (cachedPosts) {
        setPosts(cachedPosts);
        setLoading(false);
        return;
      }

      // API 호출
      const allPosts = await getAllPosts();

      // 캐시에 저장
      postCache.set(cacheKey, {
        posts: allPosts,
        timestamp: Date.now(),
      });

      setPosts(allPosts);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "포스트를 불러오는데 실패했습니다.";
      setError(errorMessage);
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  }, [cacheKey, getCachedPosts]);

  // 초기 로드
  useEffect(() => {
    if (autoLoad) {
      loadPosts();
    }
  }, [autoLoad, loadPosts]);

  // 유틸리티 함수들
  const getPostBySlug = useCallback(
    (slug: string): Post | undefined => {
      return posts.find((post) => post.slug === slug);
    },
    [posts]
  );

  const getPostsByCategory = useCallback(
    (category: string): Post[] => {
      return posts.filter(
        (post) =>
          post.metadata.category.toLowerCase() === category.toLowerCase()
      );
    },
    [posts]
  );

  const getPostsByTag = useCallback(
    (tag: string): Post[] => {
      return posts.filter((post) =>
        post.metadata.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    },
    [posts]
  );

  const getFeaturedPost = useCallback((): Post | null => {
    // 첫 번째 포스트를 추천 포스트로 설정
    return posts.length > 0 ? posts[0] : null;
  }, [posts]);

  const getRecentPosts = useCallback(
    (limit: number = 5): Post[] => {
      return posts
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime()
        )
        .slice(0, limit);
    },
    [posts]
  );

  const getPopularPosts = useCallback(
    (limit: number = 5): Post[] => {
      return posts
        .sort(
          (a, b) => (b.metadata.viewCount || 0) - (a.metadata.viewCount || 0)
        )
        .slice(0, limit);
    },
    [posts]
  );

  const searchPosts = useCallback(
    (query: string): Post[] => {
      if (!query.trim()) return posts;

      const searchTerms = query
        .toLowerCase()
        .split(" ")
        .filter((term) => term.length > 0);

      return posts.filter((post) => {
        const title = post.metadata.title.toLowerCase();
        const excerpt = post.metadata.excerpt.toLowerCase();
        const tags = post.metadata.tags.join(" ").toLowerCase();
        const category = post.metadata.category.toLowerCase();

        return searchTerms.some(
          (term) =>
            title.includes(term) ||
            excerpt.includes(term) ||
            tags.includes(term) ||
            category.includes(term)
        );
      });
    },
    [posts]
  );

  // 메모이제이션된 값들
  const categories = useMemo(() => {
    return Array.from(
      new Set(posts.map((post) => post.metadata.category))
    ).sort();
  }, [posts]);

  const tags = useMemo(() => {
    const allTags = posts.flatMap((post) => post.metadata.tags);
    // 중복 제거 및 빈 문자열 필터링
    const uniqueTags = Array.from(new Set(allTags))
      .filter((tag) => tag && tag.trim() !== "")
      .sort();
    return uniqueTags;
  }, [posts]);

  return {
    posts,
    loading,
    error,
    refetch: loadPosts,
    getPostBySlug,
    getPostsByCategory,
    getPostsByTag,
    getFeaturedPost,
    getRecentPosts,
    getPopularPosts,
    categories,
    tags,
    searchPosts,
  };
};
