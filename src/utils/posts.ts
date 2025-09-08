import type { Post, PostMetadata, PostStats } from "./mdx";

// 카테고리별 폴더 구조를 지원하는 포스트 관리 시스템
export interface PostWithStats extends Post {
  stats?: PostStats;
}

// 카테고리별 폴더 구조
export const CATEGORY_FOLDERS = {
  react: "React",
  typescript: "TypeScript",
  javascript: "JavaScript",
  css: "CSS",
  performance: "Performance",
  tools: "Tools",
  tutorial: "Tutorial",
} as const;

export type CategoryKey = keyof typeof CATEGORY_FOLDERS;

// 포스트 경로 생성 (카테고리/슬러그 형태)
export function getPostPath(category: string, slug: string): string {
  const categoryKey = Object.keys(CATEGORY_FOLDERS).find(
    (key) => CATEGORY_FOLDERS[key as CategoryKey] === category
  ) as CategoryKey;

  if (categoryKey) {
    return `${categoryKey}/${slug}`;
  }

  // 카테고리가 없으면 루트에 배치
  return slug;
}

// 포스트 경로에서 카테고리와 슬러그 추출
export function parsePostPath(path: string): {
  category: string;
  slug: string;
} {
  const parts = path.split("/");

  if (parts.length === 2) {
    const categoryKey = parts[0] as CategoryKey;
    const category = CATEGORY_FOLDERS[categoryKey] || parts[0];
    return { category, slug: parts[1] };
  }

  return { category: "General", slug: parts[0] };
}

// MDX 파일에서 메타데이터와 콘텐츠 추출
export function parseMDXContent(mdxContent: string): {
  metadata: PostMetadata;
  content: string;
} {
  // 타입 체크
  if (typeof mdxContent !== "string") {
    console.error(
      "parseMDXContent received non-string input:",
      typeof mdxContent,
      mdxContent
    );
    throw new Error(`Expected string but received ${typeof mdxContent}`);
  }

  // 수동으로 frontmatter 파싱
  const frontmatterMatch = mdxContent.match(
    /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  );

  if (!frontmatterMatch) {
    throw new Error("Invalid MDX format: missing frontmatter");
  }

  const frontmatter = frontmatterMatch[1];
  const content = frontmatterMatch[2];

  // frontmatter 파싱
  const metadata: any = {};
  frontmatter.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim();

      if (value.startsWith("[") && value.endsWith("]")) {
        // 배열 파싱
        metadata[key.trim()] = value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/"/g, ""));
      } else if (value === "true") {
        metadata[key.trim()] = true;
      } else if (value === "false") {
        metadata[key.trim()] = false;
      } else if (!isNaN(Number(value))) {
        metadata[key.trim()] = Number(value);
      } else {
        metadata[key.trim()] = value.replace(/"/g, "");
      }
    }
  });

  return { metadata, content };
}

// 포스트 목록 생성 (카테고리별 폴더 스캔)
export async function getAllPosts(): Promise<Post[]> {
  console.log("🚀 getAllPosts 함수가 호출되었습니다!");

  try {
    // public 폴더의 MDX 파일들을 직접 fetch로 로드
    const mdxFiles = [
      "/content/posts/javascript/react-hooks-complete-guide.mdx",
      "/content/posts/react/nextjs-14-new-features.mdx",
      "/content/posts/react/react-typescript-best-practices.mdx",
      "/content/posts/typescript/typescript-generics-guide.mdx",
    ];

    console.log("🔍 public 폴더의 MDX 파일들을 fetch로 로드합니다");

    const posts: Post[] = [];

    // 각 MDX 파일을 fetch로 로드
    for (const filePath of mdxFiles) {
      try {
        console.log(`📁 로딩 중: ${filePath}`);
        const response = await fetch(filePath);
        if (!response.ok) {
          console.log(`❌ ${filePath} 로드 실패: ${response.status}`);
          continue;
        }

        const mdxContent = await response.text();
        console.log(`✅ ${filePath} 로드 성공:`, {
          contentLength: mdxContent.length,
          firstChars: mdxContent.substring(0, 100),
          hasFrontmatter: mdxContent.startsWith("---"),
        });

        // 경로에서 카테고리와 슬러그 추출
        const relativePath = filePath
          .replace("/content/posts/", "")
          .replace(".mdx", "");
        const { category, slug } = parsePostPath(relativePath);

        const { metadata, content } = parseMDXContent(mdxContent);

        // Firebase ID 생성 (슬러그 기반)
        const firebaseId = `${category.toLowerCase()}-${slug}`;

        posts.push({
          slug,
          metadata: {
            ...metadata,
            firebaseId,
          },
          content,
          categoryPath: relativePath,
        });
      } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
      }
    }

    console.log("📊 로드된 포스트 수:", posts.length);

    // 발행일 기준으로 정렬
    return posts.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );
  } catch (error) {
    console.error("Error loading posts:", error);

    // 에러 발생 시 빈 배열 반환
    return [];
  }
}

// 특정 포스트 로드
export async function getPostBySlug(
  slug: string,
  category?: string
): Promise<Post | null> {
  const posts = await getAllPosts();

  if (category) {
    return (
      posts.find(
        (post) => post.slug === slug && post.metadata.category === category
      ) || null
    );
  }

  return posts.find((post) => post.slug === slug) || null;
}

// 카테고리별 포스트 목록
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.metadata.category === category);
}

// 태그별 포스트 목록
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) =>
    post.metadata.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// 검색 기능
export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await getAllPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.metadata.title.toLowerCase().includes(lowercaseQuery) ||
      post.metadata.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.metadata.tags.some((tag) =>
        tag.toLowerCase().includes(lowercaseQuery)
      ) ||
      post.content.toLowerCase().includes(lowercaseQuery)
  );
}

// 관련 포스트 찾기
export async function getRelatedPosts(
  currentPost: Post,
  limit: number = 3
): Promise<Post[]> {
  const posts = await getAllPosts();

  // 현재 포스트 제외
  const otherPosts = posts.filter((post) => post.slug !== currentPost.slug);

  // 카테고리와 태그 기반으로 관련도 계산
  const scoredPosts = otherPosts.map((post) => {
    let score = 0;

    // 같은 카테고리면 +2점
    if (post.metadata.category === currentPost.metadata.category) {
      score += 2;
    }

    // 공통 태그 개수만큼 +1점
    const commonTags = post.metadata.tags.filter((tag) =>
      currentPost.metadata.tags.includes(tag)
    );
    score += commonTags.length;

    return { post, score };
  });

  // 점수 순으로 정렬하고 상위 N개 반환
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

// 카테고리 목록
export async function getCategories(): Promise<
  { name: string; count: number }[]
> {
  const posts = await getAllPosts();
  const categoryCount: Record<string, number> = {};

  posts.forEach((post) => {
    const category = post.metadata.category;
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  return Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// 태그 목록
export async function getTags(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts();
  const tagCount: Record<string, number> = {};

  posts.forEach((post) => {
    post.metadata.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
